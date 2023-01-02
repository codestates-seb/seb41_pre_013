package com.primenumber.stackoverflow.repository;

import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Page<Member> findAllByStatus(Pageable pageable, MemberStatus status);

    Optional<Member> findByEmailAndStatus(String email, MemberStatus status);

    Optional<Member> findByIdAndStatus(Long memberId, MemberStatus status);
}
