package com.primenumber.stackoverflow.util;

import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.Question;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;

public class QuestionStub {
    public static Question createQuestion(long id, String title, String content, Member member) {
        Question question = Question.of(title, content, member);

        ReflectionTestUtils.setField(question, "id", id);
        ReflectionTestUtils.setField(question, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(question, "modifiedAt", LocalDateTime.now());

        return question;
    }
}
