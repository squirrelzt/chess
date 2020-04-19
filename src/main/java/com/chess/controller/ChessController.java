package com.chess.controller;

import com.chess.domain.ChessDomain;
import com.chess.service.ChessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
public class ChessController {

    @Autowired
    ChessService chessService;

    @GetMapping("query")
    public List<ChessDomain> listDatas() {
        return chessService.query();
    }
}
