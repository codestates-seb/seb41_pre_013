package com.primenumber.stackoverflow.exception;

import lombok.Getter;

@Getter
public enum ExceptionCode {
    UNAUTHORIZED_MEMBER(403, "해당 요청을 수행할 권한이 없습니다."),
    GONE(410, "이미 삭제된 엔티티입니다.");

    private int status;
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
