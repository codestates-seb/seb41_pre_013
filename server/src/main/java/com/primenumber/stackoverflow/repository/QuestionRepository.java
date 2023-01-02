package com.primenumber.stackoverflow.repository;

import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Page<Question> findAllByStatus(Pageable pageable, BasicStatus status);

    Optional<Question> findByIdAndStatus(long questionId, BasicStatus status);
}