package com.primenumber.stackoverflow.dto;

import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Positive;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

// TODO : @Pattern 에 message 가 출력되지 않음 -> GlobalExceptionAdvice 가 해당 예외를 ConstraintViolationException 로 받게 해야함
public class MemberDto {
    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Post {
        @Email @Size(max = 50)
        private String email;
        @Setter
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=\\S+$).{8,20}$",
                message = "비밀번호는 숫자, 알파벳, 특수문자(!@#$%^&*)를 최소 하나 씩 포함해야하며 길이는 8-20 사이여야만 합니다.")
        private String password;

        @Pattern(regexp = "^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$",
                message = "닉네임은 알파벳, 한글, 숫자를 사용할 수 있으며 길이는 3-20 사이여야만 합니다.")
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
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])(?=\\S+$).{8,20}$",
                message = "비밀번호는 숫자, 알파벳, 특수문자(!@#$%^&*)를 최소 하나 씩 포함해야하며 길이는 8-20 사이여야만 합니다.")
        private String password;

        @Pattern(regexp = "^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$",
                message = "닉네임은 알파벳, 한글, 숫자를 사용할 수 있으며 길이는 3-20 사이여야만 합니다.")
        private String displayName;

        public static MemberDto.Patch of(String password, String displayName) {
            return new Patch(password, displayName);
        }
    }

    @Getter
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Response {
        @Positive
        private Long id;
        @Email @Size(max = 50)
        private String email;
        @Pattern(regexp = "^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$",
                message = "닉네임은 알파벳, 한글, 숫자를 사용할 수 있으며 길이는 3-20 사이여야만 합니다.")
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
