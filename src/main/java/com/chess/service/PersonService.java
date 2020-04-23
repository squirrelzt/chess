package com.chess.service;

import com.chess.domain.Person;

public interface PersonService {
    Person login(String username, String password);

    Person queryPersonById(String id);

    boolean firstReverseChess(String personId, String opponentId, String color);

    boolean updateState(String personId, String opponentId, String personState);
}
