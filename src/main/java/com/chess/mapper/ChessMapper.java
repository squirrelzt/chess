package com.chess.mapper;

import com.chess.domain.ChessDomain;
import org.apache.ibatis.annotations.*;
import org.apache.ibatis.cursor.Cursor;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Mapper
@Repository
public interface ChessMapper {

    @Select("select * from chess")
    List<ChessDomain> query();

    @Select("select id, name, code, color, x, y, state, location from chess where id = #{id}")
    List<ChessDomain> queryById(@Param("id") String id);

    @Update("update chess set state = 'DISPLAY' where id = #{id}")
    int reverseChess(@Param("id") String id);

    @Update("update chess set name = #{name}, code = #{code}, color = #{color}, x = #{x}, y = #{y}, state = #{state},\n" +
            "    location = #{location} where id = #{id}")
    int initChessData(@Param("id") String id, @Param("name") String name, @Param("code") String code,
                      @Param("color") String color, @Param("x") String x, @Param("y") String y,
                      @Param("state") String state, @Param("location") String location);

    @Insert("insert INTO `chess`(id,name,code,color,x,y,state,location) VALUES (#{id}, #{name}, #{code}, #{color}, #{x}, #{y}, #{state}, #{location}) ")
    int insertChess(@Param("id") String id, @Param("name") String name, @Param("code") String code,
                    @Param("color") String color, @Param("x") String x, @Param("y") String y,
                    @Param("state") String state, @Param("location") String location);

    @Update("update chess set x = #{x}, y = #{y}, location = #{location} where id = #{id}")
    int shufflecard(@Param("id") String id, @Param("x") String x, @Param("y") String y,
                    @Param("location") String location);

    @Update("update chess set name = '', code = '', color = '', state = 'DEAD' where id = #{id}")
    int deleteChess(@RequestParam("id") String id);

    @Update("update chess set name = #{name}, code = #{code}, color = #{color}, state = 'DISPLAY' where id = #{id}")
    int move(@RequestParam("id") String id, @RequestParam("name") String name, @RequestParam("code") String code, @RequestParam("color") String color);

    @Select("select id, name, code, color, x, y, state, location from chess\n" +
            "    where x > #{fromX} and x < #{toX} and y = #{y}\n" +
            "    and name != '' and code != '' and color != ''")
    List<ChessDomain> listPaoX(@RequestParam("fromX") String fromX, @RequestParam("toX") String toX, @RequestParam("y") String y);

    @Select("select id, name, code, color, x, y, state, location from chess\n" +
            "    where y > #{fromY} and y < #{toY} and x = #{x}\n" +
            "    and name != '' and code != '' and color != ''")
    List<ChessDomain> listPaoY(@RequestParam("fromY") String fromY, @RequestParam("toY") String toY, @RequestParam("x") String x);

    @Select("SELECT id, name, code, color, x, y, state, location FROM chess WHERE color = #{color}")
    List<ChessDomain> listRetain(@RequestParam("color") String color);

    @Select("SELECT id, name, code, color, x, y, state, location FROM chess")
    Cursor<ChessDomain> cursorChess();
}
