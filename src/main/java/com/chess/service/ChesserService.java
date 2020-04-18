package com.chess.service;

import com.chess.domain.ChesserDomain;

import java.util.List;

public interface ChesserService {

    ChesserDomain login(String username, String password);
}
