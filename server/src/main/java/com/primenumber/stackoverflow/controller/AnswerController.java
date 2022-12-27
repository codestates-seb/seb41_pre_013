package com.primenumber.stackoverflow.controller;

import com.primenumber.stackoverflow.dto.AnswerDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Answer;
import com.primenumber.stackoverflow.response.BaseResponse;
import com.primenumber.stackoverflow.response.PagingResponse;
import com.primenumber.stackoverflow.service.AnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/{question-id}/answers")
@Validated
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping
    public ResponseEntity registerAnswer(@Positive @PathVariable("question-id") long questionId,
                                         @Valid @RequestBody AnswerDto.Post requestBody,
                                         @AuthenticationPrincipal MemberPrincipal memberPrincipal) {

        AnswerDto.Response response = AnswerDto.Response.from(answerService.createAnswer(questionId, requestBody, memberPrincipal));
        return new ResponseEntity(new BaseResponse<>(response), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity findAnswers(@Positive @PathVariable("question-id") long questionId,
                                      @Positive @RequestParam(name = "page", defaultValue = "1", required = false) int page,
                                      @Positive @RequestParam(name = "size", defaultValue = "10", required = false) int size) {

        Page<AnswerDto.Response> pageAnswers = answerService.getAnswers(questionId, page - 1, size).map(AnswerDto.Response::from);
        List<AnswerDto.Response> answers = pageAnswers.getContent();

        return new ResponseEntity<>(new PagingResponse<>(answers, pageAnswers), HttpStatus.OK);
    }
}
