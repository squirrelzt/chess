package com.chess.controller;

import com.chess.domain.ChessDomain;
import com.chess.service.ChessService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class ChessController {

    @Autowired
    ChessService chessService;

    @GetMapping("initData")
    public Map initData() {
        Map map = new HashMap(2);
        boolean flag = chessService.initData();
        if (flag) {
            map.put("result", "0");
        } else {
            map.put("result", "1");
        }
        return map;
    }

    @GetMapping("order")
    public Map order() {
        Map map = new HashMap(2);
        chessService.order();
        return map;
    }

    @GetMapping("query")
    public List<ChessDomain> listDatas() {
        return chessService.query();
    }
}
