package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import com.primenumber.stackoverflow.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static com.primenumber.stackoverflow.util.Stub.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@DisplayName("비즈니스 로직 - 회원")
@ExtendWith(MockitoExtension.class)
class MemberServiceTest {
    @InjectMocks
    private MemberService sut;
    @Mock
    private MemberRepository memberRepository;

    @DisplayName("회원 목록을 요청하면, 회원 목록 페이지를 반환한다.")
    @Test
    void givenPageInfo_whenSearchingMembers_thenReturnMemberPage() {
        // Given
        Pageable pageable = Pageable.ofSize(10);

        given(memberRepository.findAllByStatus(pageable, MemberStatus.ACTIVE)).willReturn(Page.empty());

        // When
        Page<Member> members = sut.searchMembers(pageable);

        // Then
        assertThat(members).isEmpty();
        then(memberRepository).should().findAllByStatus(pageable, MemberStatus.ACTIVE);
    }

    @DisplayName("이메일을 통해 회원을 요청하면, 회원을 반환한다.")
    @Test
    void givenEmail_whenSearchingMember_thenReturnMember() {
        // Given
        String email = "hong@email.com";

        Member member = createMember();

        given(memberRepository.findByEmailAndStatus(email, MemberStatus.ACTIVE)).willReturn(Optional.of(member));

        // When
        Member resultMember = sut.searchMember(email);

        // Then
        assertThat(resultMember)
                .hasFieldOrPropertyWithValue("email", "hong@email.com")
                .hasFieldOrPropertyWithValue("password", "pw1")
                .hasFieldOrPropertyWithValue("displayName", "홍길동");
        then(memberRepository).should().findByEmailAndStatus(email, MemberStatus.ACTIVE);
    }

    @DisplayName("id를 통해 회원을 요청하면, 회원을 반환한다.")
    @Test
    void givenId_whenSearchingMember_thenReturnMember() {
        // Given
        Long memberId = 1L;

        Member member = createMember();

        given(memberRepository.findByIdAndStatus(memberId, MemberStatus.ACTIVE)).willReturn(Optional.of(member));

        // When
        Member resultMember = sut.searchMember(memberId);

        // Then
        assertThat(resultMember)
                .hasFieldOrPropertyWithValue("id", 1L)
                .hasFieldOrPropertyWithValue("email", "hong@email.com")
                .hasFieldOrPropertyWithValue("password", "pw1")
                .hasFieldOrPropertyWithValue("displayName", "홍길동");
        then(memberRepository).should().findByIdAndStatus(memberId, MemberStatus.ACTIVE);
    }

    @DisplayName("회원 정보를 입력하면, 회원을 생성한다.")
    @Test
    void givenMemberInfo_whenSavingMember_thenSaveMember() {
        // Given
        MemberDto.Post dto = createMemberPostDto();

        given(memberRepository.save(any(Member.class))).willReturn(createMember());

        // When
        sut.saveMember(dto);

        // Then
        then(memberRepository).should().save(any(Member.class));
    }

    @DisplayName("회원의 수정 정보를 입력하면, 회원을 수정한다.")
    @Test
    void givenMemberPrincipalAndModifiedMemberInfo_whenUpdatingMember_thenUpdatesMember() {
        // Given
        Long memberId = 1L;
        MemberPrincipal memberPrincipal = createMemberPrincipal();
        MemberDto.Patch dto = createMemberPatchDto();

        Member member = createMember();

        given(memberRepository.getReferenceById(memberId)).willReturn(member);

        // When
        sut.updateMember(memberId, memberPrincipal, dto);

        // Then
        assertThat(member)
                .hasFieldOrPropertyWithValue("displayName", dto.getDisplayName());
        assertThat(new BCryptPasswordEncoder().matches(dto.getPassword(), member.getPassword()))
                .isTrue();
        then(memberRepository).should().getReferenceById(memberId);
    }

    @DisplayName("회원의 ID를 입력하면, 회원을 삭제한다.")
    @Test
    void givenMemberPrincipalAndMemberId_whenDeletingMember_thenDeleteMember() {
        // Given
        Long memberId = 1L;
        MemberPrincipal memberPrincipal = createMemberPrincipal();

        Member member = createMember();

        given(memberRepository.getReferenceById(memberId)).willReturn(member);

        // When
        sut.deleteMember(memberId, memberPrincipal);

        // Then
        assertThat(member)
                .hasFieldOrPropertyWithValue("status", MemberStatus.QUIT);
        then(memberRepository).should().getReferenceById(memberId);
    }
}