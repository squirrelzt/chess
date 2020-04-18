package com.chess.controller;

import com.chess.domain.ChesserDomain;
import com.chess.service.ChesserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
public class ChesserController {
    @Autowired
    ChesserService chesserService;

    @GetMapping("login")
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

    @GetMapping("queryChesserById")
    public ChesserDomain queryChesserById(@RequestParam String id) {
        return chesserService.queryChesserById(id);
    }
}
