package com.chess.domain;

import lombok.Data;

@Data
public class PersonDomain {
    private String id;
    private String username;
    private String color;
    private String role;
    private String state;
    private String opponentId;
}
