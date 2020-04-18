package com.chess.service.impl;

import com.chess.domain.ChessDomain;
import com.chess.mapper.ChessMapper;
import com.chess.service.ChessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChessServiceImpl implements ChessService {

    @Autowired
    ChessMapper chessMapper;

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
