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

import java.util.List;
import java.util.Random;

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
    public boolean operate(String chessId, String opponentChessId, String personId, String opponentId, String personState) {
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
        return allOver(chess, opponentChess);
    }

    private boolean allOver(ChessDomain chess, ChessDomain opponentChess) {
        String id = chess.getId();
        String opponentId = opponentChess.getId();
        String chessCode = chess.getCode();
        String opponentChessCode = opponentChess.getCode();
        boolean allOverFlag = false;
        if (chessCode.equals(opponentChessCode)) {
            int chessCount = chessMapper.deleteChess(id);
            int chessOpponentCount = chessMapper.deleteChess(opponentId);
            if (chessCount == 1 && chessOpponentCount == 1) {
                allOverFlag = true;
            }
        }
        return allOverFlag;
    }
}
