package com.chess.startup;

import com.chess.service.ChessService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(value = 1)
public class ChessStartUpRunner implements CommandLineRunner {

    private ChessService chessService;

    public ChessStartUpRunner(ChessService chessService) {
        this.chessService = chessService;
    }

    @Override
    public void run(String... args) throws Exception {
        chessService.order();
    }
}
