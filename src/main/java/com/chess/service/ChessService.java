package com.chess.service;

import com.chess.domain.ChessDomain;

import java.util.List;

public interface ChessService {

    boolean initData();

    List<ChessDomain> query();

    boolean reverseChess(String id);
}
