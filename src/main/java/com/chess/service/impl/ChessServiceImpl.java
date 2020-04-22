package com.chess.service.impl;

import com.chess.constants.InitDataConstants;
import com.chess.domain.ChessDomain;
import com.chess.enums.PowerEnum;
import com.chess.mapper.ChessMapper;
import com.chess.mapper.PersonMapper;
import com.chess.service.ChessService;
import com.chess.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
public class ChessServiceImpl implements ChessService {

    @Autowired
    ChessMapper chessMapper;
    @Autowired
    PersonMapper personMapper;
    @Autowired
    PersonService personService;

    @Override
    @Transactional
    public boolean initData() {
        String chessArray[][] = InitDataConstants.chessArray;
        int count = 0;
        for (int i = 0; i < chessArray.length; i++) {
//            for (int j = 0; j < chessArray[i].length; j++) {
//                System.out.print(chessArray[i][j]+"\t");
//            }
            String id = chessArray[i][0];
            String name = chessArray[i][1];
            String code = chessArray[i][2];
            String color = chessArray[i][3];
            String x = chessArray[i][4];
            String y = chessArray[i][5];
            String state = chessArray[i][6];
            String location = chessArray[i][7];

            count += chessMapper.initChessData(id, name, code, color, x, y, state, location);
//            System.out.println();
        }
        int resetCount = personMapper.resetPerson();
        boolean resetFlag = count == chessArray.length && resetCount == 2;
        boolean orderFlag = order();
        if (resetFlag && orderFlag) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean order() {
        String[] xArray = InitDataConstants.xArray;
        String[] yArray = InitDataConstants.yArray;
        String[] locationArray = InitDataConstants.locationArray;
        shufflecard(locationArray);
//        shufflecard(xArray);
//        shufflecard(yArray);

//        for (int i = 0; i < xArray.length; i++) {
//            if ((i+1)%8 ==0) {
//                System.out.println();
//            }
//            System.out.print(xArray[i]+"\t");
//        }
//        System.out.println("======================");
//        for (int i = 0; i < yArray.length; i++) {
//            if ((i+1)%8 ==0) {
//                System.out.println();
//            }
//            System.out.print(yArray[i]+"\t");
//        }
        int count = 0;
        for (int i = 0; i < 32; i++) {
            int id = i+1;
//            String x = xArray[i];
//            String y = yArray[i];
            String location = locationArray[i];
            String x = location.substring(0, 1);
            String y = location.substring(1, 2);
            count += chessMapper.shufflecard(""+id, x, y, location);
        }
        if (count == 32) {
            return true;
        } else {
            return false;
        }
    }

    private void shufflecard(String[] array) {
        for (int i = 0; i < array.length; i++) {
            int num = new Random().nextInt(32);
            String temp = array[i];
            array[i] = array[num];
            array[num] = temp;
        }
    }

    @Override
    public List<ChessDomain> query() {
        return chessMapper.query();
    }

    @Override
    public boolean reverseChess(String id) {
        int count = chessMapper.reverseChess(id);
        if (1 == count) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Map operate(String chessId, String opponentChessId, String personId, String opponentId, String personState) {
        Map map = new HashMap();
//        personService.updateState(personId, opponentId, personState);
        List<ChessDomain> chessList = chessMapper.queryById(chessId);
        List<ChessDomain> opponentList = chessMapper.queryById(opponentChessId);
        ChessDomain chess = null;
        ChessDomain opponentChess = null;
        if (!chessList.isEmpty()) {
            chess = chessList.get(0);
        }
        if (!chessList.isEmpty()) {
            opponentChess = opponentList.get(0);
        }
        String chessCode = chess.getCode();
        String opponentChessCode = opponentChess.getCode();
        if ("".equals(opponentChessCode)) {
            if (move(chess, opponentChess)) {
                personService.updateState(personId, opponentId, personState);
                map.put("result", "0");
                map.put("msg", "棋子移动成功");
            } else {
                map.put("result", "1");
            }
            return map;
        }
        if (chessCode.equals(opponentChessCode)) {
            if (flip(chessId, opponentChessId)) {
                personService.updateState(personId, opponentId, personState);
                map.put("result", "0");
                map.put("msg", "翻子成功");
            } else {
                map.put("result", "1");
                map.put("msg", "翻子失败");
            }
            return map;
        }
        if ("pao".equals(chessCode)) {
            map = eat(chess, opponentChess);
            if ("0".equals(map.get("result"))) {
                personService.updateState(personId, opponentId, personState);
            }
            return map;
        }

        boolean isAdjacent = checkIsAdjacent(chess, opponentChess);
        if (isAdjacent) {
            if ("bing".equals(chessCode) && "jiang".equals(opponentChessCode)) {
                map = soldier(chess, opponentChess);
                if ("0".equals(map.get("result"))) {
                    personService.updateState(personId, opponentId, personState);
                }
                return map;
            }

            if (!"jiang".equals(chessCode) && "bing".equals(opponentChessCode)) {
                map = soldier(chess, opponentChess);
                if ("0".equals(map.get("result"))) {
                    personService.updateState(personId, opponentId, personState);
                }
                return map;
            }
            map = power(chess, opponentChess);
            if ("0".equals(map.get("result"))) {
                personService.updateState(personId, opponentId, personState);
            }
            return map;
        } else {
            map.put("result", "1");
            map.put("msg", "非相邻不能操作");
            return map;
        }
    }

    /**
     * 兑子
     * @param chessId
     * @param opponentChessId
     * @return
     */
    private boolean flip(String chessId, String opponentChessId) {
        boolean flipFlag = false;
        int chessCount = chessMapper.deleteChess(chessId);
        int chessOpponentCount = chessMapper.deleteChess(opponentChessId);
        if (chessCount == 1 && chessOpponentCount == 1) {
            flipFlag = true;
        }
        return flipFlag;
    }

    /**
     * 移动
     * @param chess
     * @param opponentChess
     * @return
     */
    private boolean move(ChessDomain chess, ChessDomain opponentChess) {
        String id = chess.getId();
        int chessCount = chessMapper.deleteChess(id);
        String opponentId = opponentChess.getId();
        String name = chess.getName();
        String code = chess.getCode();
        String color = chess.getColor();
        int opponentCount = chessMapper.move(opponentId, name, code, color);
        boolean moveFlag = false;
        if (chessCount == 1 && opponentCount == 1) {
            moveFlag = true;
        }
        return moveFlag;
    }

    private Map eat(ChessDomain chess, ChessDomain opponentChess) {
        Map map = new HashMap();
        String chessX = chess.getX();
        String color = chess.getColor();
        String chessY = chess.getY();
        String opponentX = opponentChess.getX();
        String opponentY = opponentChess.getY();
        List<ChessDomain> listX = null;
        List<ChessDomain> listY = null;
        if ((chessY.equals(opponentY)) && Integer.parseInt(chessX) < Integer.parseInt(opponentX)) {
            listX = chessMapper.listPaoX(chessX, opponentX, chessY);
        } else if ((chessY.equals(opponentY)) && Integer.parseInt(chessX) > Integer.parseInt(opponentX)) {
            listX = chessMapper.listPaoX(opponentX, chessX, chessY);
        }
        // 炮与指定棋子间隔着一个棋子
        if (!Objects.isNull(listX) && !listX.isEmpty() && listX.size() == 1) {
            chessMapper.deleteChess(chess.getId());
            chessMapper.deleteChess(opponentChess.getId());
            chessMapper.move(opponentChess.getId(), chess.getName(), chess.getCode(), color);
            map.put("result", "0");
            map.put("msg", "炮吃子成功");
            return map;
        }
        if ((chessX.equals(opponentX) && Integer.parseInt(chessY) < Integer.parseInt(opponentY))) {
            listY = chessMapper.listPaoY(chessY, opponentY, chessX);
        } else if ((chessX.equals(opponentX) && Integer.parseInt(chessY) > Integer.parseInt(opponentY))) {
            listY = chessMapper.listPaoY(opponentY, chessY, chessX);
        }
        // 炮与指定棋子间隔着一个棋子
        if (!Objects.isNull(listY) && !listY.isEmpty() && listY.size() == 1) {
            chessMapper.deleteChess(chess.getId());
            chessMapper.deleteChess(opponentChess.getId());
            chessMapper.move(opponentChess.getId(), chess.getName(), chess.getCode(), color);
            map.put("result", "0");
            map.put("msg", "炮吃子成功");
            return map;
        }
        map.put("result", "1");
        map.put("msg", "炮吃子失败");
        return map;
    }

    /**
     * 兵卒吃将帅
     * @param chess
     * @param opponentChess
     * @return
     */
    public Map soldier(ChessDomain chess, ChessDomain opponentChess) {
        Map map = new HashMap();
        int delCount1 = chessMapper.deleteChess(chess.getId());
        int delCount2 = chessMapper.deleteChess(opponentChess.getId());
        int moveCount = chessMapper.move(opponentChess.getId(), chess.getName(), chess.getCode(), chess.getColor());
        if (1 != delCount1 && 1 != delCount2 && 1 != moveCount) {
            map.put("result", "0");
            map.put("msg", "兵卒吃将帅成功");
        } else {
            map.put("result", "1");
            map.put("msg", "兵卒吃将帅失败");
        }
        return map;
    }

    /**
     * 对方棋子是兵卒
     * @param chess
     * @param opponentChess
     * @return
     */
    public Map opponentChessIsSoldier(ChessDomain chess, ChessDomain opponentChess) {
        Map map = new HashMap();
        int delCount1 = chessMapper.deleteChess(chess.getId());
        int delCount2 = chessMapper.deleteChess(opponentChess.getId());
        int moveCount = chessMapper.move(opponentChess.getId(), chess.getName(), chess.getCode(), chess.getColor());
        if (1 != delCount1 && 1 != delCount2 && 1 != moveCount) {
            map.put("result", "0");
            map.put("msg", "吃兵卒成功");
        } else {
            map.put("result", "1");
            map.put("msg", "吃兵卒失败");
        }
        return map;
    }

    public Map power(ChessDomain chess, ChessDomain opponentChess) {
        Map map = new HashMap();
        String code = chess.getCode();
        String opponentCode = opponentChess.getCode();
        int chessPower = 0;
        int opponentPower = 0;
        for (PowerEnum powerEnum : PowerEnum.values()) {
            if (code.equals(powerEnum.getCode())) {
                chessPower = powerEnum.getNumber();
            }
            if (opponentCode.equals(powerEnum.getCode())) {
                opponentPower = powerEnum.getNumber();
            }
        }
        if (chessPower > opponentPower) {
            int delCount1 = chessMapper.deleteChess(chess.getId());
            int delCount2 = chessMapper.deleteChess(opponentChess.getId());
            int moveCount = chessMapper.move(opponentChess.getId(), chess.getName(), chess.getCode(), chess.getColor());
            if (1 != delCount1 && 1 != delCount2 && 1 != moveCount) {
                map.put("result", "0");
                map.put("msg", "大子吃小子成功");
            } else {
                map.put("result", "1");
                map.put("msg", "大子吃小子失败");
            }
        } else {
            map.put("result", "1");
            map.put("msg", "小子不能吃大子");
        }
        return map;
    }

    private boolean checkIsAdjacent(ChessDomain chess, ChessDomain opponentChess) {
        Map map = new HashMap();
        String chessX = chess.getX();
        String chessY = chess.getY();
        String opponentX = opponentChess.getX();
        String opponentY = opponentChess.getY();
        int chessIntX = Integer.parseInt(chessX);
        int chessIntY = Integer.parseInt(chessY);
        int opponentIntX = Integer.parseInt(opponentX);
        int opponentIntY = Integer.parseInt(opponentY);
        if (!chessX.equals(opponentX) && !chessY.equals(opponentY)) {
            return false;
        } else {
            if (chessX.equals(opponentX)) {
                if ((chessIntY-opponentIntY == 1) || (chessIntY-opponentIntY == -1)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if ((chessIntX-opponentIntX == 1) || (chessIntX-opponentIntX == -1)) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
}
