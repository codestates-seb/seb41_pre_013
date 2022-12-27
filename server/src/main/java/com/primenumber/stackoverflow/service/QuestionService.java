package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import com.primenumber.stackoverflow.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    public Question findQuestion(long questionId) {
        return questionRepository.findByIdAndStatus(questionId, BasicStatus.ACTIVE)
                .orElseThrow(() -> new EntityNotFoundException("해당 질문을 찾을 수 없습니다."));
    }
}
