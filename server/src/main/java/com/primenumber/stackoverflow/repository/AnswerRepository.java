package com.primenumber.stackoverflow.repository;

import com.primenumber.stackoverflow.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
