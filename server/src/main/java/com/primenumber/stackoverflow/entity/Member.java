package com.primenumber.stackoverflow.entity;

import com.primenumber.stackoverflow.entity.util.Auditable;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Setter
    @Column(nullable = false, length = 300)
    private String password;

    @Setter
    @Column(nullable = false, length = 20)
    private String displayName;

    @OneToMany(mappedBy = "member", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Question> questions = new ArrayList<>();

    @Setter
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MemberStatus status = MemberStatus.ACTIVE;

    private Member(Long id, String email, String password, String displayName, MemberStatus status) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.status = status;
    }

    public static Member of(Long id, String email, String password, String displayName, MemberStatus status) {
        return new Member(id, email, password, displayName, status);
    }

    public static Member of(String email, String password, String displayName) {
        return new Member(null, email, password, displayName, MemberStatus.ACTIVE);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Member member = (Member) o;
        return email.equals(member.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(email);
    }
}
