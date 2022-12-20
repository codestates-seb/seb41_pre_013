package com.primenumber.stackoverflow.entity;

import com.primenumber.stackoverflow.entity.util.Auditable;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Auditable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Column(nullable = false, length = 300)
    private String password;

    @Column(nullable = false, length = 20)
    private String displayName;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MemberStatus status = MemberStatus.ACTIVE;

    private Member(String email, String password, String displayName) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
    }

    public static Member of(String email, String password, String displayName) {
        return new Member(email, password, displayName);
    }
}
