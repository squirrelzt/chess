package com.chess.service;

import com.chess.domain.PersonDomain;

public interface PersonService {
    PersonDomain login(String username, String password);

    PersonDomain queryPersonById(String id);

    boolean firstReverseChess(String personId, String opponentId, String color);
}
