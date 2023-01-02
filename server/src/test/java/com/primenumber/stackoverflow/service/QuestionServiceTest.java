package com.primenumber.stackoverflow.service;

import com.primenumber.stackoverflow.dto.QuestionDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.entity.QuestionTag;
import com.primenumber.stackoverflow.entity.Tag;
import com.primenumber.stackoverflow.entity.util.BasicStatus;
import com.primenumber.stackoverflow.repository.QuestionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static com.primenumber.stackoverflow.util.Stub.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.BDDMockito.*;

@DisplayName("비즈니스 로직 - 질문")
@ExtendWith(MockitoExtension.class)
class QuestionServiceTest {
    @InjectMocks
    private QuestionService sut;
    @Mock
    private QuestionRepository questionRepository;
    @Mock
    private QuestionTagService questionTagService;
    @Mock
    private TagService tagService;

    @DisplayName("질문 목록을 요청하면, 질문 목록 페이지를 반환한다.")
    @Test
    void givenPageInfo_whenSearchingQuestions_thenReturnQuestionPage() {
        // Given
        Pageable pageable = Pageable.ofSize(10);
        given(questionRepository.findAllByStatus(pageable, BasicStatus.ACTIVE)).willReturn(Page.empty());

        // When
        Page<Question> questions = sut.searchQuestions(pageable);

        // Then
        assertThat(questions).isEmpty();
        then(questionRepository).should().findAllByStatus(pageable, BasicStatus.ACTIVE);
    }

    @DisplayName("id를 통해 질문을 요청하면, 질문을 반환하다.")
    @Test
    void givenId_whenSearchingQuestion_thenReturnQuestion() {
        // Given
        Long questionId = 1L;
        Question question = createQuestion();
        given(questionRepository.findByIdAndStatus(questionId, BasicStatus.ACTIVE)).willReturn(Optional.of(question));

        // When
        Question resultQuestion = sut.searchQuestion(questionId);

        // Then
        assertThat(resultQuestion)
                .hasFieldOrPropertyWithValue("id", 1L)
                .hasFieldOrPropertyWithValue("title", "Stub 질문")
                .hasFieldOrPropertyWithValue("content", "Stub 내용")
                .hasFieldOrPropertyWithValue("member", createMember());
        then(questionRepository).should().findByIdAndStatus(questionId, BasicStatus.ACTIVE);

    }

    @DisplayName("질문 정보를 입력하면, 질문을 생성한다.")
    @Test
    void givenMemberPrincipalAndQuestionInfo_whenSavingQuestion_thenSaveQuestion() {
        // Given
        MemberPrincipal principal = createMemberPrincipal();
        QuestionDto.Post dto = createQuestionPostDto();

        Question question = Question.of(dto.getTitle(), dto.getContent(), principal.toEntity());
        List<Tag> tags = convertToTags(dto.getTags());

        given(questionRepository.save(any(Question.class))).willReturn(question);
        given(tagService.convertToTags(anyList())).willReturn(tags);
        given(questionTagService.createQuestionTags(any(Question.class), any(Tag.class))).willReturn(QuestionTag.of(question, tags.get(0)));


        // When
        sut.saveQuestion(principal, dto);

        // Then
        then(questionRepository).should().save(any(Question.class));
        then(tagService).should().convertToTags(anyList());
        verify(questionTagService, times(tags.size())).createQuestionTags(any(Question.class), any(Tag.class));
    }

    @DisplayName("질문의 수정 정보를 입력하면, 질문을 수정한다.")
    @Test
    void givenMemberPrincipalAndModifiedQuestionInfo_whenUpdatingQuestion_thenUpdatesQuestion() {
        // Given
        Long questionId = 1L;
        MemberPrincipal principal = createMemberPrincipal();
        QuestionDto.Patch dto = createQuestionPatchDto();

        Question question = createQuestion();
        List<Tag> addTags = convertToTags(dto.getTags());
        Set<Tag> oldTagSet = question.getQuestionTags().stream().map(QuestionTag::getTag).collect(Collectors.toSet());
        List<QuestionTag> addQuestionTags =
                addTags.stream()
                        .filter(tag -> !oldTagSet.contains(tag))
                        .map(tag -> QuestionTag.of(question, tag))
                        .collect(Collectors.toList());

        given(questionRepository.getReferenceById(questionId)).willReturn(question);
        given(tagService.convertToTags(anyList())).willReturn(addTags);
        willDoNothing().given(questionTagService).deleteQuestionTags(anyList());
        given(questionTagService.createQuestionTags(anyList())).willReturn(addQuestionTags);

        // When
        sut.updateQuestion(questionId, principal, dto);

        // Then
        assertThat(question)
                .hasFieldOrPropertyWithValue("title", dto.getTitle())
                .hasFieldOrPropertyWithValue("content", dto.getContent())
                .hasFieldOrProperty("questionTags");
        then(questionRepository).should().getReferenceById(questionId);
        then(tagService).should().convertToTags(dto.getTags());
        then(questionTagService).should().deleteQuestionTags(anyList());
        then(questionTagService).should().createQuestionTags(anyList());
    }

    @DisplayName("질문의 ID를 입력하면, 질문을 삭제한다.")
    @Test
    void givenMemberPrincipalAndMemberId_whenDeletingMember_thenDeleteMember() {
        // Given
        Long questionId = 1L;
        MemberPrincipal memberPrincipal = createMemberPrincipal();

        Question question = createQuestion();

        given(questionRepository.getReferenceById(questionId)).willReturn(question);

        // When
        sut.deleteQuestion(questionId, memberPrincipal);

        // Then
        assertThat(question)
                .hasFieldOrPropertyWithValue("status", BasicStatus.DELETED);
        then(questionRepository).should().getReferenceById(questionId);
    }
}