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
        if (count == chessArray.length && resetCount == 2) {
            return true;
        } else {
            return false;
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
