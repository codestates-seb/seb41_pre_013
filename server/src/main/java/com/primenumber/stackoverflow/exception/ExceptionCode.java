package com.primenumber.stackoverflow.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    ;

    private int status;
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
