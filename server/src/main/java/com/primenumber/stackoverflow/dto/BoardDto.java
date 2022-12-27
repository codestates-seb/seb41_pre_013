package com.primenumber.stackoverflow.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

public class BoardDto {

    @Getter
    @Builder
    public static class response {
        private Long questionId;
        private String title;
        private String content;
        private LocalDateTime createdAt;

        private Long memberId;
        private String displayName;

        private int answerCount;
        private List<TagDto.response> tagList;
    }
}
