package com.primenumber.stackoverflow.util;

import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.List;

public class Stub {

    public static Member createMember() {
        Member member = Member.of(
                "hong@email.com",
                "pw1",
                "홍길동"
        );
        ReflectionTestUtils.setField(member, "id", 1L);

        return member;
    }

    public static MemberDto.Post createMemberPostDto() {
        return MemberDto.Post.of(
                "hong@email.com",
                "pw1",
                "홍길동"
        );
    }

    public static MemberDto.Patch createMemberPatchDto() {
        return MemberDto.Patch.of(
                "pwModified",
                "홍홍홍"
        );
    }

    public static Page<Member> createMemberPage(Pageable pageable) {
        Member member1 = Member.of("hong@email.com", "pw1", "홍길동");
        ReflectionTestUtils.setField(member1, "id", 1L);
        ReflectionTestUtils.setField(member1, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member1, "modifiedAt", LocalDateTime.now());

        Member member2 = Member.of("jeon@email.com", "pw2", "전우치");
        ReflectionTestUtils.setField(member2, "id", 2L);
        ReflectionTestUtils.setField(member2, "createdAt", LocalDateTime.now());
        ReflectionTestUtils.setField(member2, "modifiedAt", LocalDateTime.now());

        List<Member> members = List.of(member1, member2);

        return new PageImpl<>(members, pageable, members.size());
    }

    public static MemberPrincipal createMemberPrincipal() {
        return MemberPrincipal.from(createMember());
    }
}
