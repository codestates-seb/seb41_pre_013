package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.QuestionTag;
import com.primenumber.stackoverflow.entity.Tag;
import com.primenumber.stackoverflow.repository.QuestionTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class QuestionTagService {
    private final QuestionTagRepository questionTagRepository;

    public QuestionTag createQuestionTags(Question question, Tag tag) {
        return questionTagRepository.save(QuestionTag.of(question, tag));
    }

    public List<QuestionTag> createQuestionTags(List<QuestionTag> questionTags) {
        return questionTagRepository.saveAll(questionTags);
    }

    public void deleteQuestionTag(Long questionTagId) {
        questionTagRepository.deleteById(questionTagId);
    }

    public void deleteQuestionTags(List<QuestionTag> questionTags) {
        questionTagRepository.deleteAll(questionTags);
    }
}
