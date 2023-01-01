package com.primenumber.stackoverflow.repository;

import com.primenumber.stackoverflow.entity.Answer;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Page<Answer> findAllByQuestionIdAndStatus(Pageable pageable, long questionId, BasicStatus status);

    Optional<Answer> findByIdAndMemberId(long answerId, long memberId);
}
