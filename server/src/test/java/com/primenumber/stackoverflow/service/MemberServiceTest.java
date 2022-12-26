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

import java.util.Optional;

import static com.primenumber.stackoverflow.util.Stub.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;

@DisplayName("비즈니스 로직 - 회원")
@ExtendWith(MockitoExtension.class)
class MemberServiceTest {
    @InjectMocks
    private MemberService sut;
    // @Mock -> 그 외의 나머지 모든 Mock
    @Mock
    private MemberRepository memberRepository;

    @DisplayName("이메일을 통해 회원을 요청하면, 회원을 반환한다.")
    @Test
    void givenEmail_whenSearchingMember_thenReturnMember() {
        // Given
        String email = "hong@email.com";
        Member member = createMember();
        given(memberRepository.findByEmail(email)).willReturn(Optional.of(member));

        // When
        Member resultMember = sut.searchMember(email);

        // Then
        assertThat(resultMember)
                .hasFieldOrPropertyWithValue("email", "hong@email.com")
                .hasFieldOrPropertyWithValue("password", "pw1")
                .hasFieldOrPropertyWithValue("displayName", "홍길동");
        then(memberRepository).should().findByEmail(email);
    }

    @DisplayName("id을 통해 회원을 요청하면, 회원을 반환한다.")
    @Test
    void givenId_whenSearchingMember_thenReturnMember() {
        // Given
        long memberId = 1L;
        Member member = createMember();
        given(memberRepository.findById(memberId)).willReturn(Optional.of(member));

        // When
        Member resultMember = sut.searchMember(memberId);

        // Then
        assertThat(resultMember)
                .hasFieldOrPropertyWithValue("id", 1L)
                .hasFieldOrPropertyWithValue("email", "hong@email.com")
                .hasFieldOrPropertyWithValue("password", "pw1")
                .hasFieldOrPropertyWithValue("displayName", "홍길동");
        then(memberRepository).should().findById(memberId);
    }

    @DisplayName("회원 목록을 요청하면, 회원 목록 페이지를 반환한다.")
    @Test
    void givenNothing_whenSearchingMembers_thenReturnMemberPage() {
        // Given
        Pageable pageable = Pageable.ofSize(20);
        given(memberRepository.findAll(pageable)).willReturn(Page.empty());

        // When
        Page<Member> members = sut.searchMembers(pageable);

        // Then
        assertThat(members).isEmpty();
        then(memberRepository).should().findAll(pageable);
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
    void givenModifiedMemberInfo_whenUpdatingMember_thenUpdatesMember() {
        // Given
        long memberId = 1L;
        MemberPrincipal memberPrincipal = createMemberPrincipal();
        MemberDto.Patch dto = createMemberPatchDto();
        Member member = createMember();
        given(memberRepository.getReferenceById(memberId)).willReturn(member);

        // When
        sut.updateMember(memberId, memberPrincipal, dto);

        // Then
        assertThat(member)
                .hasFieldOrPropertyWithValue("password", dto.getPassword())
                .hasFieldOrPropertyWithValue("displayName", dto.getDisplayName());
        then(memberRepository).should().getReferenceById(memberId);
    }

    @DisplayName("회원의 ID를 입력하면, 회원을 삭제한다.")
    @Test
    void givenMemberId_whenDeletingMember_thenDeleteMember() {
        // Given
        long memberId = 1L;
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