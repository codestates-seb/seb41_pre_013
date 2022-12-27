package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.dto.AnswerDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Answer;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional(readOnly = true)
@Slf4j
@Service
@RequiredArgsConstructor
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final MemberService memberService;
    private final QuestionService questionService;

    @Transactional
    public Answer createAnswer(long questionId, AnswerDto.Post requestBody, MemberPrincipal memberPrincipal) {
        Member findmember = memberService.searchMember(memberPrincipal.getId());
        Question findQuestion = questionService.findQuestion(questionId);
        Answer answer = Answer.of(requestBody.getContent(), findmember, findQuestion);

        return answerRepository.save(answer);
    }
}
