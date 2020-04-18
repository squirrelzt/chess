package com.chess.mapper;

import com.chess.domain.ChesserDomain;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ChesserMapper {

    List<ChesserDomain> login(String username, String password);

    List<ChesserDomain> queryChesserById(String id);

    int firstReverseChess(String side, String id);
}
