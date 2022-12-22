package com.primenumber.stackoverflow.entity;

import com.primenumber.stackoverflow.entity.util.Auditable;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Question extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false)
    private String content;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BasicStatus status = BasicStatus.ACTIVE;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<Answer> answers = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = {CascadeType.REMOVE, CascadeType.PERSIST})
    private List<QuestionTag> questionTags = new ArrayList<>();

    private Question(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public static Question of(String title, String content) {
        return new Question(title, content);
    }
}
