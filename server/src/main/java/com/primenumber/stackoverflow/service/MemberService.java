package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import com.primenumber.stackoverflow.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public Page<Member> searchMembers(Pageable pageable) {
        return memberRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Member searchMember(String email) {
        return memberRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("유저가 없습니다 - email: " + email));
    }

    @Transactional(readOnly = true)
    public Member searchMember(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("유저가 없습니다 - memberId: " + memberId));
    }

    // TODO : create, update 가 결과값을 리턴해야 할지 결정
    // TODO : passwordEncoder 순환 주입 문제를 해결하고 깔끔한 코드 만들기
    public void saveMember(MemberDto.Post dto) {
        dto.setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
        memberRepository.save(MemberDto.Post.toEntity(dto));
    }

    // TODO : 일치 하지 않는 경우 HttpStatus
    public void updateMember(Long memberId, MemberPrincipal memberPrincipal, MemberDto.Patch dto) {
        try {
            if (memberId == memberPrincipal.getId()) {
                Member member = memberRepository.getReferenceById(memberId);
                if (dto.getPassword() != null) {
                    dto.setPassword(new BCryptPasswordEncoder().encode(dto.getPassword()));
                    member.setPassword(dto.getPassword());
                }
                if (dto.getDisplayName() != null) {
                    member.setDisplayName(dto.getDisplayName());
                }
            }
        } catch (EntityNotFoundException e) {
            log.warn("유저 정보 업데이트 실패. 수정할 유저를 찾을 수 없습니다 - {}", e.getLocalizedMessage());
        }
    }

    public void deleteMember(Long memberId, MemberPrincipal memberPrincipal) {
        try {
            Member member = memberRepository.getReferenceById(memberId);
            if (member.getEmail() == memberPrincipal.getUsername()) {
                member.setStatus(MemberStatus.QUIT);
            }
        } catch (EntityNotFoundException e) {
            log.warn("유저 삭제 실패. 삭제할 유저를 찾을 수 없습니다 - {}", e.getLocalizedMessage());
        }
    }
}
