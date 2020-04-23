package com.chess.domain;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChessDomain implements Serializable {
    private String id;

    private String name;

    private String code;

    private String color;

    private String x;

    private String y;

    private String state;

    private String location;
}
