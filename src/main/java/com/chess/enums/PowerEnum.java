package com.chess.enums;

import lombok.Getter;

@Getter
public enum PowerEnum {
    /**
     * 将帅
     */
    JIANG("jiang", 6),

    /**
     * 士
     */
    SHI("shi", 5),

    /**
     * 象
     */
    XIANG("xiang", 4),

    /**
     * 马
     */
    MA("ma", 3),

    /**
     * 车
     */
    CHE("che", 2),

    /**
     * 炮
     */
    PAO("pao", 1),

    /**
     * 兵
     */
    BING("bing", 0);

    private String code;
    private int number;

    PowerEnum(String code, int number) {
        this.code = code;
        this.number = number;
    }
}
