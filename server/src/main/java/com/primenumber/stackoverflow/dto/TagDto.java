package com.primenumber.stackoverflow.dto;

import lombok.Builder;
import lombok.Getter;

public class TagDto {
    @Getter
    @Builder
    public static class response {
        private Long id;
        private String tagName;
    }
}
