package com.primenumber.stackoverflow.util;

import com.primenumber.stackoverflow.dto.AnswerDto;
import com.primenumber.stackoverflow.entity.Answer;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.List;

public class AnswerStub {
    public static Answer createAnswer(String content, Member member, Question question) {
        Answer answer = Answer.of(content, member, question);

        ReflectionTestUtils.setField(answer, "id", 1L);
        ReflectionTestUtils.setField(answer, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(answer, "modifiedAt", LocalDateTime.now());

        return answer;
    }

    public static AnswerDto.Response createAnswerResponse(Answer answer) {
        return AnswerDto.Response.from(answer);
    }

    public static Page<Answer> createAnswerPage(Pageable pageable) {
        Member member1 = Member.of("hong@email.com", "pw1", "홍길동");
        ReflectionTestUtils.setField(member1, "id", 1L);
        ReflectionTestUtils.setField(member1, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member1, "modifiedAt", LocalDateTime.now());

        Member member2 = Member.of("jeon@email.com", "pw2", "전우치");
        ReflectionTestUtils.setField(member2, "id", 2L);
        ReflectionTestUtils.setField(member2, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member2, "modifiedAt", LocalDateTime.now());

        Question question = QuestionStub.createQuestion(1L, "스프링부트에 대해 궁금합니다.",
                "스프링부트의 특징은 무엇인가요?", member1);

        Answer answer1 = createAnswer("답변입니다", member2, question);
        Answer answer2 = createAnswer("답변2입니다", member2, question);


        List<Answer> answers = List.of(answer1, answer2);

        return new PageImpl<>(answers, pageable, answers.size());
    }
}
