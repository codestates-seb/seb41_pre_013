package com.primenumber.stackoverflow.dto;

import com.primenumber.stackoverflow.entity.Answer;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class AnswerDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post {
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch {
        @NotBlank
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private long answerId;
        private String content;
        private LocalDateTime modifiedAt;

        private long memberId;
        private String displayName;

        private long questionId;

        public static AnswerDto.Response of(long answerId, String content, LocalDateTime modifiedAt,
                                            long memberId, String nickname, long questionId) {
            return new Response(answerId, content, modifiedAt, memberId, nickname, questionId);
        }

        public static Response from(Answer answer) {
            return new AnswerDto.Response(answer.getId(),
                    answer.getContent(), answer.getModifiedAt(), answer.getMember().getId(),
                    answer.getMember().getDisplayName(), answer.getQuestion().getId());
        }

    }
}
