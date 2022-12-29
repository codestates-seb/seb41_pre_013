package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import com.primenumber.stackoverflow.exception.BusinessLogicException;
import com.primenumber.stackoverflow.exception.ExceptionCode;
import com.primenumber.stackoverflow.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {
    // TODO: Status 가 삭제 상태인 것들에 대한 Action 생각하고 수정하기 (CRUD 모두)
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Page<Member> searchMembers(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Member searchMember(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(EntityNotFoundException::new);
    }

    @Transactional(readOnly = true)
    public Member searchMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(EntityNotFoundException::new);
    }

    // TODO : create, update 가 결과값을 리턴해야 할지 결정
    // TODO : passwordEncoder 순환 주입 문제를 해결하고 깔끔한 코드 만들기
    public void saveMember(MemberDto.Post dto) {
        dto.setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
        memberRepository.save(MemberDto.Post.toEntity(dto));
    }

    public void updateMember(Long memberId, MemberPrincipal memberPrincipal, MemberDto.Patch dto) {
        if (memberId != memberPrincipal.getId()) { throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER); }

        Member member = memberRepository.getReferenceById(memberId);
        Optional.ofNullable(dto.getPassword())
                .ifPresent(password -> member.setDisplayName(new BCryptPasswordEncoder().encode(password)));
        Optional.ofNullable(dto.getDisplayName())
                .ifPresent(member::setDisplayName);
    }

    public void deleteMember(Long memberId, MemberPrincipal memberPrincipal) {
        if (memberId != memberPrincipal.getId()) { throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_MEMBER); }

        Member member = memberRepository.getReferenceById(memberId);
        if (member.getStatus() == MemberStatus.QUIT) { throw new BusinessLogicException(ExceptionCode.GONE); }
        member.setStatus(MemberStatus.QUIT);
    }
}
