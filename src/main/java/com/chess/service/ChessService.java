package com.chess.service;

import com.chess.domain.ChessDomain;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ChessService {

    boolean initData();

    boolean insertChess();

    boolean order();

    List<ChessDomain> query();

    boolean reverseChess(String id);

    Map operate(String chessId, String opponentChessId, String personId, String opponentId, String personState);

    void cursorChess() throws IOException;
}
