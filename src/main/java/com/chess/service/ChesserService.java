package com.chess.service;

import com.chess.domain.ChesserDomain;

public interface ChesserService {

    ChesserDomain login(String username, String password);

    ChesserDomain queryChesserById(String id);
}
