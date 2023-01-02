package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.dto.QuestionDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.QuestionTag;
import com.primenumber.stackoverflow.entity.Tag;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import com.primenumber.stackoverflow.exception.BusinessLogicException;
import com.primenumber.stackoverflow.exception.ExceptionCode;
import com.primenumber.stackoverflow.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final QuestionTagService questionTagService;
    private final TagService tagService;

    @Transactional(readOnly = true)
    public Page<Question> searchQuestions(Pageable pageable) { return questionRepository.findAllByStatus(pageable, BasicStatus.ACTIVE); }

    @Transactional(readOnly = true)
    public Question searchQuestion(Long questionId) {
        return questionRepository.findByIdAndStatus(questionId, BasicStatus.ACTIVE)
                .orElseThrow(EntityNotFoundException::new);
    }

    public void saveQuestion(MemberPrincipal memberPrincipal, QuestionDto.Post dto) {
        Question question = questionRepository.save(dto.toEntity(memberPrincipal.toEntity()));
        List<Tag> tags = tagService.convertToTags(dto.getTags());

        List<QuestionTag> questionTags =
                tags.stream()
                        .map(tag -> questionTagService.createQuestionTags(question, tag))
                        .collect(Collectors.toList());

        question.getQuestionTags().addAll(questionTags);
    }

    public void updateQuestion(Long questionId, MemberPrincipal memberPrincipal, QuestionDto.Patch dto) {
        Question question = questionRepository.getReferenceById(questionId);

        if (!Objects.equals(question.getMember().getId(), memberPrincipal.getId())) { throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER); }
        if (question.getStatus() == BasicStatus.DELETED) { throw new BusinessLogicException(ExceptionCode.GONE); }

        Optional.ofNullable(dto.getTitle())
                .ifPresent(question::setTitle);
        Optional.ofNullable(dto.getContent())
                .ifPresent(question::setContent);

        if (dto.getTags() != null) {
            // 추가할 Tag 목록
            Set<Tag> addTags = new HashSet<>(tagService.convertToTags(dto.getTags()));

            // 제거할 QuestionTag 목록
            List<QuestionTag> removeQuestionTags = new ArrayList<>();

            // 제거할 목록과 추가할 목록 갱신
            question.getQuestionTags()
                    .forEach(questionTag -> { // 기존에 연결된 tag 들을 확인
                        Tag oldTag = questionTag.getTag();
                        // 이미 존재하는 Tag 의 경우 추가할 목록에서 제외
                        if (addTags.contains(oldTag)) {
                            addTags.remove(oldTag);
                        } else {
                            // 그렇지 않다면 제거할 목록에 추가
                            removeQuestionTags.add(questionTag);
                        }
                    });

            // update 하며 사라진 tag 들과의 연관관계 제거
            // DB 에서 삭제
            question.getQuestionTags().removeAll(removeQuestionTags);
            questionTagService.deleteQuestionTags(removeQuestionTags);

            // 추가할 Tag 목록으로부터 추가할 QuestionTag 목록 생성
            List<QuestionTag> addQuestionTags =
                    addTags.stream()
                            .map(tag -> QuestionTag.of(question, tag))
                            .collect(Collectors.toList());

            // 추가할 QuestionTag 목록을 Question 에 추가
            // DB 에 저장
            addQuestionTags = questionTagService.createQuestionTags(addQuestionTags);
            question.getQuestionTags().addAll(addQuestionTags);
        }
    }

    public void deleteQuestion(Long questionId, MemberPrincipal memberPrincipal) {
        Question question = questionRepository.getReferenceById(questionId);

        if (!Objects.equals(question.getMember().getId(), memberPrincipal.getId())) { throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER); }
        if (question.getStatus() == BasicStatus.DELETED) { throw new BusinessLogicException(ExceptionCode.GONE); }

        question.setStatus(BasicStatus.DELETED);
    }
}
