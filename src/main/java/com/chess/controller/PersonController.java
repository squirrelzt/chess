package com.chess.controller;

import com.alibaba.fastjson.JSON;
import com.chess.domain.ChessDomain;
import com.chess.domain.Person;
import com.chess.service.ChessService;
import com.chess.service.PersonService;
import com.chess.utils.WebSocketUtils;
import com.chess.vo.request.LoginRequestVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Slf4j
@RestController
public class PersonController {
    @Autowired
    PersonService personService;
    @Autowired
    ChessService chessService;

    @GetMapping("logins")
    public Map login(@RequestParam String username, @RequestParam String password) {
        Person person = personService.login(username, password);
        Map<String, Object> map = new HashMap<>(2);
        if (Objects.isNull(person)) {
            map.put("result", 1);
        } else {
            map.put("result", 0);
        }
        map.put("data", person);
        return map;
    }

    @PostMapping("logins")
    public Map login(@RequestBody @Valid LoginRequestVO vo, BindingResult result) {
        Map<String, Object> map = new HashMap<>(2);
        if (result.hasErrors()) {
            map.put("result", 1);
            map.put("message", result.getAllErrors().get(0).getDefaultMessage());
            return map;
        }
        Person person = personService.login(vo.getUsername(), vo.getPassword());

        if (Objects.isNull(person)) {
            map.put("result", 1);
        } else {
            map.put("result", 0);
        }
        map.put("data", person);
        return map;
    }

    @GetMapping("queryPersonById")
    public Person queryChesserById(@RequestParam(value = "id") String id) {
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
        List<ChessDomain> list = chessService.query();
        Person person = personService.queryPersonById(personId);
        Map<String, Object> wsMap = new HashMap<>(2);
        wsMap.put("chess", list);
        wsMap.put("person", person);
        WebSocketUtils.sendMessageAll(JSON.toJSONString(wsMap));
//        WebSocketUtils.sendMessageAll(JSONArray.toJSONString(chessService.query()));
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
        List<ChessDomain> list = chessService.query();
        Person person = personService.queryPersonById(personId);
        Map<String, Object> wsMap = new HashMap<>(2);
        wsMap.put("chess", list);
        wsMap.put("person", person);
        WebSocketUtils.sendMessageAll(JSON.toJSONString(wsMap));
//        WebSocketUtils.sendMessageAll(JSONArray.toJSONString(chessService.query()));
        return map;
    }
}
