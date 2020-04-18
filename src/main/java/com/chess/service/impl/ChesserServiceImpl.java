package com.chess.service.impl;

import com.chess.domain.ChesserDomain;
import com.chess.mapper.ChesserMapper;
import com.chess.service.ChesserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ChesserServiceImpl implements ChesserService {

    @Autowired
    ChesserMapper chesserMapper;

    @Override
    public ChesserDomain login(String username, String password) {
        List<ChesserDomain> list = chesserMapper.login(username, password);
        if (list.isEmpty()) {
            return null;
        } else {
            log.info(list.toString());
            return list.get(0);
        }
    }

    @Override
    public ChesserDomain queryChesserById(String id) {
        List<ChesserDomain> list = chesserMapper.queryChesserById(id);
        if (list.isEmpty()) {
            return null;
        } else {
            log.info(list.toString());
            return list.get(0);
        }
    }

    @Override
    public boolean firstReverseChess(String id, String side) {
        int count = chesserMapper.firstReverseChess(side, id);
        if (1 == count) {
            return true;
        } else {
            return false;
        }
    }
}
