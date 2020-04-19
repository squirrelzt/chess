package com.chess.service.impl;

import com.chess.constants.InitDataConstants;
import com.chess.domain.ChessDomain;
import com.chess.mapper.ChessMapper;
import com.chess.mapper.PersonMapper;
import com.chess.service.ChessService;
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
            String color = chessArray[i][2];
            String x = chessArray[i][3];
            String y = chessArray[i][4];
            String state = chessArray[i][5];
            String location = chessArray[i][6];

            count += chessMapper.initChessData(id, name, color, x, y, state, location);
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
}
