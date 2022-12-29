package com.primenumber.stackoverflow.controller;

import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.response.BaseResponse;
import com.primenumber.stackoverflow.response.PagingResponse;
import com.primenumber.stackoverflow.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@Validated
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity getMembers(
            @Positive @RequestParam(defaultValue = "1", required = false) int page,
            @Positive @RequestParam(defaultValue = "10", required = false) int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());

        Page<MemberDto.Response> pageMembers = memberService.searchMembers(pageable).map(MemberDto.Response::from);
        List<MemberDto.Response> members = pageMembers.getContent();

        return new ResponseEntity<>(
                new PagingResponse<>(members, pageMembers),
                HttpStatus.OK
        );
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") @Positive Long memberId) {
        MemberDto.Response member = MemberDto.Response.from(memberService.searchMember(memberId));

        return new ResponseEntity<>(
                new BaseResponse<>(member),
                HttpStatus.OK
        );
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post dto) {
        memberService.saveMember(dto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive Long memberId,
            @AuthenticationPrincipal MemberPrincipal memberPrincipal,
            @Valid @RequestBody MemberDto.Patch dto
    ) {
        memberService.updateMember(memberId, memberPrincipal, dto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive Long memberId,
            @AuthenticationPrincipal MemberPrincipal memberPrincipal
    ) {
        memberService.deleteMember(memberId, memberPrincipal);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
