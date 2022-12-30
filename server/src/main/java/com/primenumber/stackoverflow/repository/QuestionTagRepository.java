package com.primenumber.stackoverflow.repository;

import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionTagRepository extends JpaRepository<QuestionTag, Long> {
    Optional<QuestionTag> findByQuestionAndTag(Question question, String tagName);
}
