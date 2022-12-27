package com.primenumber.stackoverflow.entity;

import com.primenumber.stackoverflow.entity.util.Auditable;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Answer extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Setter
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BasicStatus status = BasicStatus.ACTIVE;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;


    private Answer(String content, Member member, Question question) {
        this.content = content;
        this.member = member;
        this.question = question;
    }

    public static Answer of(String content, Member member, Question question) {
        return new Answer(content, member, question);
    }
}
