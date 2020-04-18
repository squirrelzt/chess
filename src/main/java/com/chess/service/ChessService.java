package com.chess.service;

import com.chess.domain.ChessDomain;

import java.util.List;

public interface ChessService {

    List<ChessDomain> query();

    boolean reverseChess(String id);
}
