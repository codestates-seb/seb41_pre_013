package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.dto.AnswerDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Answer;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import com.primenumber.stackoverflow.exception.BusinessLogicException;
import com.primenumber.stackoverflow.exception.ExceptionCode;
import com.primenumber.stackoverflow.repository.AnswerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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

    public Page<Answer> getAnswers(long questionId, int page, int size) {
        return answerRepository.findAllByQuestionIdAndStatus(PageRequest.of(page, size, Sort.by("createdAt"))
                , questionId, BasicStatus.ACTIVE);
    }

    @Transactional
    public Answer updateAnswer(long answerId, AnswerDto.Patch requestBody, MemberPrincipal memberPrincipal) {
        Answer findAnswer = findAnswerOfAuthorizedMember(answerId, memberPrincipal.getId());
        findAnswer.setContent(requestBody.getContent());

        return answerRepository.save(findAnswer);

    }

    @Transactional
    public Answer modifyDeletedAnswerStatus(long answerId, long memberId) {
        Answer findAnswer = findAnswerOfAuthorizedMember(answerId, memberId);
        findAnswer.setStatus(BasicStatus.DELETED);

        return answerRepository.save(findAnswer);
    }

    private Answer findAnswerOfAuthorizedMember(long answerId, long memberId) {
        return answerRepository.findByIdAndMemberId(answerId, memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER));
    }
}
