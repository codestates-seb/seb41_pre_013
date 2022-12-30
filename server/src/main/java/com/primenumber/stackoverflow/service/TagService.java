package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.entity.Tag;
import com.primenumber.stackoverflow.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
public class TagService {
    private final TagRepository tagRepository;

    public List<Tag> convertToTags(List<String> tagNames) {
        return tagNames.stream()
                .map(tagName ->
                        tagRepository.findByName(tagName)
                                .orElseGet(() -> tagRepository.save(Tag.of(tagName)))
                )
                .collect(Collectors.toList());
    }
}
