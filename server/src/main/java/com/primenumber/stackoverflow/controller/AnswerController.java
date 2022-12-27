package com.primenumber.stackoverflow.controller;

import com.primenumber.stackoverflow.dto.AnswerDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.response.BaseResponse;
import com.primenumber.stackoverflow.service.AnswerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RestController
@RequestMapping("/answers")
@Validated
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping
    public ResponseEntity registerAnswer(@Positive @RequestParam("question-id") long questionId,
                                         @Valid @RequestBody AnswerDto.Post requestBody,
                                         @AuthenticationPrincipal MemberPrincipal memberPrincipal) {

        AnswerDto.Response response = AnswerDto.Response.from(answerService.createAnswer(questionId, requestBody, memberPrincipal));
        return new ResponseEntity(new BaseResponse<>(response), HttpStatus.CREATED);
    }
}
