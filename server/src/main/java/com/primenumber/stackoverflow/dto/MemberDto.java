package com.primenumber.stackoverflow.dto;

import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Post {
        @NotBlank
        private String email;
        @Setter
        @NotBlank
        private String password;

        private String displayName;

        public static MemberDto.Post of(String email, String password, String displayName) {
            return new Post(email, password, displayName);
        }

        public static Member toEntity(MemberDto.Post dto) {
            return Member.of(dto.email, dto.password, dto.displayName);
        }
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Patch {
        @Setter
        private String password;

        private String displayName;

        public static MemberDto.Patch of(String password, String displayName) {
            return new Patch(password, displayName);
        }
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Response {
        private Long id;
        private String email;   // 표시할 필요가 없다면 삭제 할 수 있음
        private String displayName;
        private MemberStatus status;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

        public static MemberDto.Response of(Long id, String email, String displayName, MemberStatus status, LocalDateTime createdAt, LocalDateTime modifiedAt) {
            return new Response(id, email, displayName, status, createdAt, modifiedAt);
        }

        public static MemberDto.Response from(Member entity) {
            return new Response(
                    entity.getId(),
                    entity.getEmail(),
                    entity.getDisplayName(),
                    entity.getStatus(),
                    entity.getCreatedAt(),
                    entity.getModifiedAt()
            );
        }
    }
}
