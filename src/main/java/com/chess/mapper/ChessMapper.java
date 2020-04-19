package com.chess.mapper;

import com.chess.domain.ChessDomain;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface ChessMapper {

    List<ChessDomain> query();

    int reverseChess(String id);

    int initChessData(@Param("id") String id, @Param("name") String name, @Param("color") String color,
                      @Param("x") String x, @Param("y") String y, @Param("state") String state,
                      @Param("location") String location);

    int shufflecard(@Param("id") String id, @Param("x") String x, @Param("y") String y,
                    @Param("location") String location);
}
