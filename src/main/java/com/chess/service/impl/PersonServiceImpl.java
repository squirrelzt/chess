package com.chess.service.impl;

import com.chess.domain.ChesserDomain;
import com.chess.domain.PersonDomain;
import com.chess.mapper.PersonMapper;
import com.chess.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    PersonMapper personMapper;

    @Override
    public PersonDomain login(String username, String password) {
        List<PersonDomain> list = personMapper.login(username, password);
        if (list.isEmpty()) {
            return null;
        } else {
            log.info(list.toString());
            return list.get(0);
        }
    }

    @Override
    public PersonDomain queryPersonById(String id) {
        List<PersonDomain> list = personMapper.queryPersonById(id);
        if (list.isEmpty()) {
            return null;
        } else {
            log.info(list.toString());
            return list.get(0);
        }
    }

    @Override
    public boolean firstReverseChess(String personId, String opponentId, String color) {
        int count = personMapper.firstReverseChess(personId, color);
        String opponentColor = "RED";
        if ("RED".equals(color)) {
            opponentColor = "BLACK";
        }
        int opponentCount = personMapper.firstReverseChessUpdateOpponent(opponentId, opponentColor);
        if (1 == count && 1== opponentCount) {
            return true;
        } else {
            return false;
        }
    }
}
