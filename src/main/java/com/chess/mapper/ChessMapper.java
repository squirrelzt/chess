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

    int move(@RequestParam("id") String id, @RequestParam("name") String name, @RequestParam("code") String code, @RequestParam("color") String color);

    List<ChessDomain> listPaoX(@RequestParam("fromX") String fromX, @RequestParam("toX") String toX, @RequestParam("y") String y);

    List<ChessDomain> listPaoY(@RequestParam("fromY") String fromY, @RequestParam("toY") String toY, @RequestParam("x") String x);
}
