package com.primenumber.stackoverflow.dto;

import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.QuestionTag;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class QuestionDto {

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Post {
        private String title;
        private String content;
        private List<String> tags;

        public static QuestionDto.Post of(String title, String content, List<String> tags) {
            return new QuestionDto.Post(title, content, tags);
        }

        public Question toEntity(Member member) {
            return Question.of(
                    title,
                    content,
                    member
            );
        }
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Patch {
        private String title;
        private String content;
        private List<String> tags;

        public static QuestionDto.Patch of(String title, String content, List<String> tags) {
            return new QuestionDto.Patch(title, content, tags);
        }
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Response {
        private Long id;
        private String title;
        private String content;
        private BasicStatus status;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        private MemberDto.Response member;

        private List<TagDto.Response> tags;
        private List<AnswerDto.Response> answers;

        public static QuestionDto.Response of(
                Long id, String title, String content, BasicStatus status, LocalDateTime createdAt, LocalDateTime modifiedAt,
                MemberDto.Response member,
                List<TagDto.Response> tags, List<AnswerDto.Response> answers
        ) {
            return new QuestionDto.Response(id, title, content, status, createdAt, modifiedAt, member, tags, answers);
        }

        public static QuestionDto.Response from(Question entity) {
            return new QuestionDto.Response(
                    entity.getId(), entity.getTitle(), entity.getContent(), entity.getStatus(), entity.getCreatedAt(), entity.getModifiedAt(),
                    MemberDto.Response.from(entity.getMember()),
                    entity.getQuestionTags().stream()
                            .map(QuestionTag::getTag)
                            .map(TagDto.Response::from)
                            .collect(Collectors.toList()),
                    entity.getAnswers().stream()
                            .map(AnswerDto.Response::from)
                            .collect(Collectors.toList())
            );
        }
    }
}