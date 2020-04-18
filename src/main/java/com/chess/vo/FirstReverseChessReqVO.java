package com.chess.vo;

import lombok.Data;

import java.io.Serializable;

@Data
public class FirstReverseChessReqVO implements Serializable {
    // 棋子ID
    private String chessId;
    // 棋手ID
    private String chesserId;
    // 执棋方(RED,BALCK)
    private String cheeserSide;
}
