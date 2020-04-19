package com.chess.service;

import com.chess.domain.ChessDomain;

import java.util.List;

public interface ChessService {

    boolean initData();

    boolean order();

    List<ChessDomain> query();

    boolean reverseChess(String id);
}
