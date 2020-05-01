package com.chess.mapper;

import com.chess.domain.Person;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PersonMapper {
    @Select("select id, username, color, state, role, opponent_id from person where username = #{username}")
    @Results({
            @Result(column = "opponent_id", property = "opponentId")
    })
    List<Person> queryByUsername(@Param("username") String username);

    @Insert("INSERT INTO `person`(id,username,password,color,role,state,opponent_id) VALUES (1, 'zhangsan', '123456', '', '', '', '2')")
    int insertPerson();

    @Insert("INSERT INTO `person`(id,username,password,color,role,state,opponent_id) VALUES (2, 'lisi', '123456', '', '', '', '1')")
    int insertOpponent();

    @Select("select id, username, color, state, role, opponent_id from person where username = #{username} and password = #{password}")
    @Results({
            @Result(column = "opponent_id", property = "opponentId")
    })
    List<Person> login(@Param("username") String username, @Param("password") String password);

    @Select("select id, username, color, state, role, opponent_id as opponentId from person where id = #{id}")
    List<Person> queryPersonById(@Param("id") String id);

    @Update("update person set role = 'CONSUMER', state = 'LOCK', color = #{color} where id = #{id}")
    int firstReverseChess(@Param("id") String id, @Param("color") String color);

    @Update("update person set role = 'PRODUCER', state = 'ACTIVE', color = #{color} where id = #{id}")
    int firstReverseChessUpdateOpponent(@Param("id") String id, @Param("color") String color);

    @Update("update person set state = #{state} where id = #{id}")
    int updateState(@Param("id") String id, @Param("state") String state);

    @Update("update person set color = '', role = '', state = ''")
    int resetPerson();
}
