package com.chess.service;

import com.chess.domain.Person;

import java.util.List;

public interface PersonService {

    Person login(String username, String password);

    List<Person> queryTwoSideById(String id);

    Person queryPersonById(String id);

    boolean firstReverseChess(String personId, String opponentId, String color);

    boolean updateState(String personId, String opponentId, String personState);
}
