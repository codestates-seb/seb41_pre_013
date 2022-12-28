package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import com.primenumber.stackoverflow.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    //질문 목록 조회시 페이지네이션 적용
    public Page<Question> findQuestions(int page, int size) {
        return boardRepository.findAllByStatus(PageRequest.of(page, size, Sort.by("createdAt").descending()),
                BasicStatus.ACTIVE);
    }
}
