package com.primenumber.stackoverflow.util;

import com.primenumber.stackoverflow.auth.JwtTokenizer;
import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.dto.QuestionDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

// TODO : Stub 기능 별로 분리하기
public class Stub {
    // Member

    public static Member createMember() {
        Member member = Member.of(
                "hong@email.com",
                "pw1",
                "홍길동"
        );
        ReflectionTestUtils.setField(member, "id", 1L);
        ReflectionTestUtils.setField(member, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member, "modifiedAt", LocalDateTime.now());

        return member;
    }

    public static Member createMember(Long id, String email, String password, String displayName) {
        Member member = Member.of(
                email,
                password,
                displayName
        );
        ReflectionTestUtils.setField(member, "id", id);
        ReflectionTestUtils.setField(member, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member, "modifiedAt", LocalDateTime.now());

        return member;
    }

    public static MemberDto.Post createMemberPostDto() {
        return MemberDto.Post.of(
                "hong@email.com",
                "pw1@12345",
                "홍길동"
        );
    }

    public static MemberDto.Patch createMemberPatchDto() {
        return MemberDto.Patch.of(
                "pwModified@123",
                "홍홍홍"
        );
    }

    public static Page<Member> createMemberPage(Pageable pageable) {
        Member member1 = Member.of("hong@email.com", "pw1@12345", "홍길동");
        ReflectionTestUtils.setField(member1, "id", 1L);
        ReflectionTestUtils.setField(member1, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member1, "modifiedAt", LocalDateTime.now());

        Member member2 = Member.of("jeon@email.com", "pw2@12345", "전우치");
        ReflectionTestUtils.setField(member2, "id", 2L);
        ReflectionTestUtils.setField(member2, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member2, "modifiedAt", LocalDateTime.now());

        List<Member> members = List.of(member1, member2);

        return new PageImpl<>(members, pageable, members.size());
    }

    public static List<Member> createMembers() {
        Member member1 = Member.of("hong@email.com", "pw1@12345", "홍길동");
        ReflectionTestUtils.setField(member1, "id", 1L);
        ReflectionTestUtils.setField(member1, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member1, "modifiedAt", LocalDateTime.now());

        Member member2 = Member.of("jeon@email.com", "pw2@12345", "전우치");
        ReflectionTestUtils.setField(member2, "id", 2L);
        ReflectionTestUtils.setField(member2, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member2, "modifiedAt", LocalDateTime.now());

        return List.of(member1, member2);
    }

    public static MemberPrincipal createMemberPrincipal() {
        return MemberPrincipal.from(createMember());
    }

    // JWT

    public static String createJwt(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());

        String subject = member.getEmail();

        JwtTokenizer jwtTokenizer = new JwtTokenizer();

        return jwtTokenizer.generateAccessToken(claims, subject, jwtTokenizer.getAccessExpirationTime());
    }

    public static String getJwtHeader() { return (new JwtTokenizer()).getHeaderString(); }

    public static String getJwtPrefix() { return (new JwtTokenizer()).getTokenPrefix(); }

    // Question

    public static Question createQuestion() {
        Question question = Question.of(
                "Stub 질문",
                "Stub 내용",
                createMember()
        );

        ReflectionTestUtils.setField(question, "id", 1L);
        ReflectionTestUtils.setField(question, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(question, "modifiedAt", LocalDateTime.now());

        List<Tag> tags = convertToTags(List.of("Stub tag1", "Stub tag2"));
        ReflectionTestUtils.setField(tags.get(0), "id", 1L);
        ReflectionTestUtils.setField(tags.get(1), "id", 2L);
        question.getQuestionTags().addAll(createQuestionTags(question, tags));

        Member member = createMember(2L, "jeon@mail.com", "pw2!@#$%", "전우치");

        question.getAnswers().add(createAnswer(1L, "Stub 답변1-1", member, question));
        question.getAnswers().add(createAnswer(2L, "Stub 답변1-2", member, question));

        return question;
    }

    public static QuestionDto.Post createQuestionPostDto() {
        return QuestionDto.Post.of(
                "Stub 질문",
                "Stub 내용",
                List.of("Stub tag1", "Stub tag2")
        );
    }

    public static QuestionDto.Patch createQuestionPatchDto() {
        return QuestionDto.Patch.of(
                "Stub 질문 패치 후",
                "Stub 내용 패치 후",
                List.of("Stub tag1", "Stub tag3")
        );
    }

    public static Page<Question> createQuestionPage(Pageable pageable) {
        List<Member> members = createMembers();

        Question question1 = Question.of(
                "Stub 질문1",
                "Stub 내용1",
                createMember()
        );

        ReflectionTestUtils.setField(question1, "id", 1L);
        ReflectionTestUtils.setField(question1, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(question1, "modifiedAt", LocalDateTime.now());
        ReflectionTestUtils.setField(question1, "member", members.get(0));

        List<Tag> tags;
        tags = convertToTags(List.of("Stub tag1", "Stub tag2"));
        ReflectionTestUtils.setField(tags.get(0), "id", 1L);
        ReflectionTestUtils.setField(tags.get(1), "id", 2L);
        question1.getQuestionTags().addAll(createQuestionTags(question1, tags));

        question1.getAnswers().add(createAnswer(1L, "Stub 답변1-1", members.get(1), question1));
        question1.getAnswers().add(createAnswer(2L, "Stub 답변1-2", members.get(1), question1));

        Question question2 = Question.of(
                "Stub 질문22",
                "Stub 내용22",
                createMember()
        );

        ReflectionTestUtils.setField(question2, "id", 2L);
        ReflectionTestUtils.setField(question2, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(question2, "modifiedAt", LocalDateTime.now());
        ReflectionTestUtils.setField(question2, "member", members.get(1));

        tags = convertToTags(List.of("Stub tag2", "Stub tag4"));
        ReflectionTestUtils.setField(tags.get(0), "id", 2L);
        ReflectionTestUtils.setField(tags.get(1), "id", 4L);
        question2.getQuestionTags().addAll(createQuestionTags(question1, tags));

        question2.getAnswers().add(createAnswer(3L, "Stub 답변2-1", members.get(0), question2));
        question2.getAnswers().add(createAnswer(4L, "Stub 답변2-2", members.get(0), question2));

        List<Question> pages = List.of(question1, question2);

        return new PageImpl<>(pages, pageable, pages.size());
    }

    public static List<Tag> convertToTags(List<String> stringTags) {
        return stringTags.stream().map(Tag::of).collect(Collectors.toList());
    }

    public static List<QuestionTag> createQuestionTags(Question question, List<Tag> tags) {
        return tags.stream().map(tag ->  QuestionTag.of(question, tag)).collect(Collectors.toList());
    }

    // Answer
    public static Answer createAnswer(Long id, String content, Member member, Question question) {
        Answer answer = Answer.of(content, member, question);
        ReflectionTestUtils.setField(answer, "id", id);
        ReflectionTestUtils.setField(answer, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(answer, "modifiedAt", LocalDateTime.now());

        return answer;
    }
}
