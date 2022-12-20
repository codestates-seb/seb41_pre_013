package com.primenumber.stackoverflow.entity.util;

import lombok.Getter;

public enum BasicStatus {
    ACTIVE("등록"), DELETED("삭제");

    @Getter
    private String status;

    BasicStatus(String status) {
        this.status = status;
    }
}
