package com.primenumber.stackoverflow.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "QUESTION_ID")
    private Question question;

    @ManyToOne(optional = false)
    @JoinColumn(name = "TAG_ID")
    private Tag tag;

    private QuestionTag(Question question, Tag tag) {
        this.question = question;
        this.tag = tag;
    }

    public static QuestionTag of(Question question, Tag tag) {
        return new QuestionTag(question, tag);
    }
}
