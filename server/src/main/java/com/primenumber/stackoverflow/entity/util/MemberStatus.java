package com.primenumber.stackoverflow.entity.util;

import lombok.Getter;

public enum MemberStatus {
    ACTIVE("활동 상태"), QUIT("탈퇴 상태");

    @Getter
    private String status;

    MemberStatus(String status) {
        this.status = status;
    }
}
