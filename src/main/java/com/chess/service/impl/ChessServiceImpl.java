package com.chess.service.impl;

import com.chess.constants.InitDataConstants;
import com.chess.domain.ChessDomain;
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
        personService.updateState(personId, opponentId, personState);
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
                map.put("result", "0");
                map.put("msg", "棋子移动成功");
            } else {
                map.put("result", "1");
            }
        }
        if (chessCode.equals(opponentChessCode)) {
            if (flip(chessId, opponentChessId)) {
                map.put("result", "0");
                map.put("msg", "翻子成功");
            } else {
                map.put("result", "1");
                map.put("msg", "翻子失败");
            }
        }
        if ("pao".equals(chessCode)) {
            return eat(chess, opponentChess);
        }
        return map;
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


}
