package com.chess.service;

import com.chess.domain.ChessDomain;

import java.util.List;

public interface ChessService {

    boolean initData();

    boolean order();

    List<ChessDomain> query();

    boolean reverseChess(String id);

    boolean operate(String chessId, String opponentChessId, String personId, String opponentId, String personState);
}
