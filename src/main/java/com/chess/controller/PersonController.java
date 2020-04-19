package com.chess.controller;

import com.chess.domain.PersonDomain;
import com.chess.service.ChessService;
import com.chess.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
public class PersonController {
    @Autowired
    PersonService personService;
    @Autowired
    ChessService chessService;

    @GetMapping("login")
    public Map login(@RequestParam String username, @RequestParam String password) {
        PersonDomain personDomain = personService.login(username, password);
        Map<String, Object> map = new HashMap<>(2);
        if (Objects.isNull(personDomain)) {
            map.put("result", 1);
        } else {
            map.put("result", 0);
        }
        map.put("data", personDomain);
        return map;
    }

    @GetMapping("queryPersonById")
    public PersonDomain queryChesserById(@RequestParam String id) {
        return personService.queryPersonById(id);
    }

    @RequestMapping("firstReverseChess")
    public Map firstReverseChess(@RequestParam String chessId, @RequestParam String personId, @RequestParam String opponentId, @RequestParam String color) {
        Map<String, Object> map = new HashMap<>(2);
        boolean count = chessService.reverseChess(chessId);
        boolean chesserCount = personService.firstReverseChess(personId, opponentId, color);
        if (count && chesserCount) {
            map.put("result", 0);
        } else {
            map.put("result", 1);
        }
        return map;
    }

    @GetMapping("reverseChess")
    public Map reverseChess(@RequestParam String personId, @RequestParam String opponentId, @RequestParam String personState, @RequestParam String chessId) {
        Map<String, Object> map = new HashMap<>(2);
        boolean count = chessService.reverseChess(chessId);
        boolean chesserCount = personService.updateState(personId, opponentId, personState);
        if (count && chesserCount) {
            map.put("result", 0);
        } else {
            map.put("result", 1);
        }
        return map;
    }
}
