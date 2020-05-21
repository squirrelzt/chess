package com.chess.service.impl;

import com.chess.domain.Person;
import com.chess.mapper.PersonMapper;
import com.chess.service.ChessService;
import com.chess.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
public class PersonServiceImpl implements PersonService {

    @Autowired
    PersonMapper personMapper;
    @Autowired
    ChessService chessService;

    @Override
    public Person login(String username, String password) {
        List<Person> list = personMapper.login(username, password);
        if (list.isEmpty()) {
//            return null;
            chessService.insertChess();
            // 初始化person表数据
            return initPerson(username, password);
        } else {
            log.info(list.toString());
            return list.get(0);
        }
    }

    @Override
    public List<Person> queryTwoSideById(String id) {
        return personMapper.queryTwoSideById(id);
    }

    private Person initPerson(String username, String password) {
        List<Person> list = personMapper.queryByUsername(username);
        if (list.isEmpty()) {
            personMapper.insertPerson();
            personMapper.insertOpponent();
            List<Person> queryList = personMapper.login(username, password);
            return queryList.get(0);
        } else {
            return null;
        }
    }
    @Override
    public Person queryPersonById(String id) {
        List<Person> list = personMapper.queryPersonById(id);
        if (list.isEmpty()) {
            return null;
        } else {
//            log.info(list.toString());
            return list.get(0);
        }
    }

    @Override
    @Transactional
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

    @Override
    @Transactional
    public boolean updateState(String personId, String opponentId, String personState) {
        List<Person> list = personMapper.queryPersonById(personId);
        if (list.isEmpty()) {
            return false;
        }
        Person personDomain = list.get(0);
        String state = personDomain.getState();
        if (!state.equals(personState)) {
            int count = personMapper.updateState(personId, personState);
            int opponentCount = 0;
            if ("LOCK".equals(personState)) {
                opponentCount = personMapper.updateState(opponentId, "ACTIVE");
            } else if ("ACTIVE".equals(personState)) {
                opponentCount = personMapper.updateState(opponentId, "LOCK");
            }
            if (1 == count && 1== opponentCount) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }
}
