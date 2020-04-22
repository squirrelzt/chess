package com.chess.enums;

public enum OperationTypeEnum {

    /**
     * 翻子
     */
    FLIP("1", ""),

    /**
     * 移动
     */
    MOVE("2", ""),

    /**
     * 兑子
     */
    EXCHANGE("3", ""),

    /**
     * 吃子
     */
    EAT("4", "");

    private String operationCode;

    private Object operation;

    OperationTypeEnum(String operationCode, Object operation) {
        this.operationCode = operationCode;
        this.operation = operation;
    }
}
