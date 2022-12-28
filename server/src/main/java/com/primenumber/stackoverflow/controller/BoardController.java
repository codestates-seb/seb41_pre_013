package com.primenumber.stackoverflow.controller;

import com.primenumber.stackoverflow.entity.*;
import com.primenumber.stackoverflow.mapper.BoardMapper;
import com.primenumber.stackoverflow.repository.BoardRepository;
import com.primenumber.stackoverflow.response.PagingResponse;
import com.primenumber.stackoverflow.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/board")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper mapper;

    /**
     * 질문 리스트 조회 기능
     * 메인 화면에서 질문 리스트 조회할 때 사용
     * @param page
     * @param size
     * @return ResponseEntity
     */
    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam(defaultValue = "1", required = false) int page,
                                       @Positive @RequestParam(defaultValue = "10", required = false) int size) {

        Page<Question> pageQuestions = boardService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity(
                new PagingResponse<>(mapper.QuestionsToBoardResponseList(questions), pageQuestions),
                HttpStatus.OK
        );
    }
}
