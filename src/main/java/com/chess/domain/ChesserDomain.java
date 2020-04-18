package com.chess.domain;

import lombok.Data;

@Data
public class ChesserDomain {
    private long id;
    private String username;
//    private String password;
    private String side;
    private String state;
    private String role;
}
