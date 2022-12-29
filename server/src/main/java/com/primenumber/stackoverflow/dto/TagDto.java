package com.primenumber.stackoverflow.dto;

import com.primenumber.stackoverflow.entity.Tag;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

public class TagDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Response {
        private Long id;
        private String tagName;

        public static Response of(Long id, String tagName) {
            return new Response(id, tagName);
        }

        public static Response from(Tag entity) {
            return new Response(
                    entity.getId(),
                    entity.getName()
            );
        }
    }
}
