package com.chess.vo.request;

import lombok.Data;

import java.io.Serializable;

@Data
public class LoginRequestVO implements Serializable {
    private String username;
    private String password;
}
