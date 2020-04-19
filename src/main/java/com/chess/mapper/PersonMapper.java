package com.chess.mapper;

import com.chess.domain.PersonDomain;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface PersonMapper {
    List<PersonDomain> login(String username, String password);

    List<PersonDomain> queryPersonById(String id);

    int firstReverseChess(@Param("id") String id, @Param("color") String color);

    int firstReverseChessUpdateOpponent(@Param("id") String id, @Param("color") String color);

    int updateState(@Param("id") String id, @Param("state") String state);
}
