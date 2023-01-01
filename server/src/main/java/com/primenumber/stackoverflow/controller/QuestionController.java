package com.primenumber.stackoverflow.controller;

import com.primenumber.stackoverflow.dto.QuestionDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.response.BaseResponse;
import com.primenumber.stackoverflow.response.PagingResponse;
import com.primenumber.stackoverflow.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Validated
public class QuestionController {
    private final QuestionService questionService;

    @GetMapping
    public ResponseEntity getQuestions(
            @Positive @RequestParam(defaultValue = "1", required = false) int page,
            @Positive @RequestParam(defaultValue = "10", required = false) int size
    ) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdAt").descending());

        Page<QuestionDto.Response> pageQuestions = questionService.searchQuestions(pageable).map(QuestionDto.Response::from);
        List<QuestionDto.Response> questions = pageQuestions.getContent();

        return new ResponseEntity<>(
                new PagingResponse<>(questions, pageQuestions)
                , HttpStatus.OK
        );
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long questionId) {
        QuestionDto.Response question = QuestionDto.Response.from(questionService.searchQuestion(questionId));

        return new ResponseEntity<>(
                new BaseResponse<>(question),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity postQuestion(
            @AuthenticationPrincipal MemberPrincipal memberPrincipal,
            @Valid @RequestBody QuestionDto.Post dto
    ) {
        questionService.saveQuestion(memberPrincipal, dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(
            @PathVariable("question-id") @Positive Long questionId,
            @AuthenticationPrincipal MemberPrincipal memberPrincipal,
            @Valid @RequestBody QuestionDto.Patch dto
    ) {
        questionService.updateQuestion(questionId, memberPrincipal, dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(
            @PathVariable("question-id") @Positive Long questionId,
            @AuthenticationPrincipal MemberPrincipal memberPrincipal
    ) {
        questionService.deleteQuestion(questionId, memberPrincipal);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}