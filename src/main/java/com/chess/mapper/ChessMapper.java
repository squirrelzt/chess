package com.chess.mapper;

import com.chess.domain.ChessDomain;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
@Repository
public interface ChessMapper {

    List<ChessDomain> query();

    List<ChessDomain> queryById(@Param("id") String id);

    int reverseChess(String id);

    int initChessData(@Param("id") String id, @Param("name") String name, @Param("code") String code,
                      @Param("color") String color, @Param("x") String x, @Param("y") String y,
                      @Param("state") String state, @Param("location") String location);

    int shufflecard(@Param("id") String id, @Param("x") String x, @Param("y") String y,
                    @Param("location") String location);

    int deleteChess(@RequestParam("id") String id);
}
