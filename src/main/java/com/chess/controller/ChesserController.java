package com.chess.controller;

import com.chess.domain.ChesserDomain;
import com.chess.service.ChessService;
import com.chess.service.ChesserService;
import com.chess.vo.FirstReverseChessReqVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class ChesserController {
    @Autowired
    ChesserService chesserService;
    @Autowired
    ChessService chessService;

//    @GetMapping("login")
    public Map login(@RequestParam String username, @RequestParam String password) {
        ChesserDomain chesserDomain = chesserService.login(username, password);
        Map<String, Object> map = new HashMap<>(2);
        if (Objects.isNull(chesserDomain)) {
            map.put("result", 1);
        } else {
            map.put("result", 0);
        }
        map.put("data", chesserDomain);
        return map;
    }

//    @GetMapping("queryChesserById")
    public ChesserDomain queryChesserById(@RequestParam String id) {
        return chesserService.queryChesserById(id);
    }

//    @RequestMapping("firstReverseChess")
    public Map firstReverseChess(@RequestParam String id, @RequestParam String chesserId,@RequestParam String side) {
        Map<String, Object> map = new HashMap<>(2);
        boolean count = chessService.reverseChess(id);
        boolean chesserCount = chesserService.firstReverseChess(chesserId, side);
        if (count && chesserCount) {
            map.put("result", 0);
        } else {
            map.put("result", 1);
        }
        return map;
    }
}
