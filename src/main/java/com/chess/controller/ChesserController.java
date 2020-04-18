package com.chess.controller;

import com.chess.domain.ChesserDomain;
import com.chess.service.ChesserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ChesserController {
    @Autowired
    ChesserService chesserService;

    @GetMapping("login")
    public List<ChesserDomain> login(@RequestParam String username, @RequestParam String password) {
        return chesserService.login(username, password);
    }
}
