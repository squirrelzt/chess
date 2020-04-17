package com.chess.mapper;

import com.chess.domain.ChessDomain;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ChessMapper {

    List<ChessDomain> query();
}
