package com.primenumber.stackoverflow.mapper;

import com.primenumber.stackoverflow.dto.BoardDto;
import com.primenumber.stackoverflow.dto.TagDto;
import com.primenumber.stackoverflow.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    @Mapping(source = "question.member.id", target = "memberId")
    @Mapping(source = "question.member.displayName", target = "displayName")
    default BoardDto.response QuestionToBoardResponse(Question question) {
        return BoardDto.response.builder()
                .questionId(question.getId())
                .title(question.getTitle())
                            .content(question.getContent())
                            .createdAt(question.getCreatedAt())
                            .memberId(question.getMember().getId())
                            .displayName(question.getMember().getDisplayName())
                            .answerCount(question.getAnswers().size())
                            .tagList(question.getQuestionTags().stream()
                                    .map(questionTag -> {
                                        TagDto.response tagResponse = TagDto.response.builder()
                                                .id(questionTag.getTag().getId())
                                                .tagName(questionTag.getTag().getName())
                                                .build();
                                        return tagResponse;
                                    }).collect(Collectors.toList()))
                            .build();
    }

    List<BoardDto.response> QuestionsToBoardResponseList(List<Question> questions);

}
