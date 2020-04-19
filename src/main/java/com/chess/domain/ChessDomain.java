package com.chess.domain;

import lombok.Data;

@Data
public class ChessDomain {
    private String id;
    private String name;
    private String code;
    private String color;
    private String x;
    private String y;
    private String state;
    private String location;
}
