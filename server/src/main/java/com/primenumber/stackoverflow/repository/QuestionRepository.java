package com.primenumber.stackoverflow.repository;

import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Optional<Question> findByIdAndStatus(long questionId, BasicStatus active);
}