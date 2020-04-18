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
    public List<ChesserDomain> login(String username, String password) {
        List<ChesserDomain> list = chesserMapper.login(username, password);
        log.info("------------------");
        log.info(list.toString());
        return list;
    }
}
