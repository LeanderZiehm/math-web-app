package com.leanderziehm.math_web_app.model;

public enum Operator{
    TIMES("*"),
    DIVISION("/"),
    PLUS("+"),
    MINUS("-");

    private String description;

    Operator(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }

}