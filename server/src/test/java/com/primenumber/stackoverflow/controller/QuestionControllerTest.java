package com.primenumber.stackoverflow.controller;

import com.google.gson.Gson;
import com.primenumber.stackoverflow.dto.QuestionDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.service.MemberService;
import com.primenumber.stackoverflow.service.QuestionService;
import config.TestSecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.primenumber.stackoverflow.util.Stub.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("컨트롤러 - 질문")
@AutoConfigureRestDocs
@Import(TestSecurityConfig.class)
@WebMvcTest(QuestionController.class)
class QuestionControllerTest {
    @Autowired private MockMvc mvc;
    @Autowired private MemberService memberService;
    @MockBean private QuestionService questionService;

    @DisplayName("[GET] 질문 페이지 - 정상 호출")
    @Test
    public void givenPageableParameter_whenQuestingMemberPage_thenReturnMemberPage() throws Exception {
        // Given with Stubbing
        Pageable pageable = PageRequest.of(0, 10, Sort.Direction.DESC, "createdAt");
        Page<Question> questionPage = createQuestionPage(pageable);

        given(questionService.searchQuestions(any(Pageable.class))).willReturn(questionPage);

        // When & Then
        mvc.perform(get("/questions")
                        .queryParam("page", String.valueOf(1))
                        .queryParam("size", String.valueOf(10))
                )
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("get-questions",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("페이지 인덱스"),
                                        parameterWithName("size").description("페이지 사이즈")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("response").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                        fieldWithPath("response[].id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("response[].title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("response[].content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("response[].status").type(JsonFieldType.STRING).description("질문 상태: 등록 / 삭제"),
                                        fieldWithPath("response[].createdAt").type(JsonFieldType.STRING).description("질문 등록일"),
                                        fieldWithPath("response[].modifiedAt").type(JsonFieldType.STRING).description("질문 정보 수정일"),
                                        fieldWithPath("response[].member").type(JsonFieldType.OBJECT).description("질문 등록자"),
                                        fieldWithPath("response[].member.id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("response[].member.email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("response[].member.displayName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("response[].member.status").type(JsonFieldType.STRING).description("회원 상태: 활동 상태 / 탈퇴 상태"),
                                        fieldWithPath("response[].member.createdAt").type(JsonFieldType.STRING).description("회원 등록일"),
                                        fieldWithPath("response[].member.modifiedAt").type(JsonFieldType.STRING).description("회원 정보 수정일"),
                                        fieldWithPath("response[].tags").type(JsonFieldType.ARRAY).description("질문 태그"),
                                        fieldWithPath("response[].tags[].id").type(JsonFieldType.NUMBER).description("태그 식별자"),
                                        fieldWithPath("response[].tags[].tagName").type(JsonFieldType.STRING).description("태그 이름"),
                                        fieldWithPath("response[].answers").type(JsonFieldType.ARRAY).description("질문 답변"),
                                        fieldWithPath("response[].answers[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("response[].answers[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("response[].answers[].createdAt").type(JsonFieldType.STRING).description("답변 등록일"),
                                        fieldWithPath("response[].answers[].modifiedAt").type(JsonFieldType.STRING).description("답변 정보 수정일"),
                                        fieldWithPath("response[].answers[].memberId").type(JsonFieldType.NUMBER).description("답변 작성자의 식별자"),
                                        fieldWithPath("response[].answers[].displayName").type(JsonFieldType.STRING).description("답변 작성자의 닉네임"),
                                        fieldWithPath("response[].answers[].questionId").type(JsonFieldType.NUMBER).description("답변이 작성된 질문의 식별자"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 인덱스"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("현재 페이지가 가진 정보 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 갯수")
                                )
                        )
                ));
        then(questionService).should().searchQuestions(any(Pageable.class));
    }

    @DisplayName("[GET] 단일 질문 정보 조회 - 정상 호출")
    @Test
    public void givenQuestionId_whenQuestingQuestionInfo_thenReturnQuestionInfo() throws Exception {
        // Given with Stubbing
        Question question = createQuestion();

        given(questionService.searchQuestion(anyLong())).willReturn(question);

        // When & Then
        mvc.perform(get("/questions/{questionId}", question.getId()))
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("get-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("questionId").description("질문의 PK")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("response.id").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                        fieldWithPath("response.title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("response.content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("response.status").type(JsonFieldType.STRING).description("질문 상태: 등록 / 삭제"),
                                        fieldWithPath("response.createdAt").type(JsonFieldType.STRING).description("질문 등록일"),
                                        fieldWithPath("response.modifiedAt").type(JsonFieldType.STRING).description("질문 정보 수정일"),
                                        fieldWithPath("response.member").type(JsonFieldType.OBJECT).description("질문 등록자"),
                                        fieldWithPath("response.member.id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("response.member.email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("response.member.displayName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("response.member.status").type(JsonFieldType.STRING).description("회원 상태: 활동 상태 / 탈퇴 상태"),
                                        fieldWithPath("response.member.createdAt").type(JsonFieldType.STRING).description("회원 등록일"),
                                        fieldWithPath("response.member.modifiedAt").type(JsonFieldType.STRING).description("회원 정보 수정일"),
                                        fieldWithPath("response.tags").type(JsonFieldType.ARRAY).description("질문 태그"),
                                        fieldWithPath("response.tags[].id").type(JsonFieldType.NUMBER).description("태그 식별자"),
                                        fieldWithPath("response.tags[].tagName").type(JsonFieldType.STRING).description("태그 이름"),
                                        fieldWithPath("response.answers").type(JsonFieldType.ARRAY).description("질문 답변"),
                                        fieldWithPath("response.answers[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("response.answers[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("response.answers[].createdAt").type(JsonFieldType.STRING).description("답변 등록일"),
                                        fieldWithPath("response.answers[].modifiedAt").type(JsonFieldType.STRING).description("답변 정보 수정일"),
                                        fieldWithPath("response.answers[].memberId").type(JsonFieldType.NUMBER).description("답변 작성자의 식별자"),
                                        fieldWithPath("response.answers[].displayName").type(JsonFieldType.STRING).description("답변 작성자의 닉네임"),
                                        fieldWithPath("response.answers[].questionId").type(JsonFieldType.NUMBER).description("답변이 작성된 질문의 식별자")
                                )
                        )
                ));
        then(questionService).should().searchQuestion(anyLong());
    }

    @DisplayName("[POST] 질문 등록 - 정상 호출")
    @Test
    public void givenMemberPrincipalQuestionDtoPost_whenQuestingQuestionRegistration_thenReturnNothing() throws Exception {
        // Given with Stubbing
        MemberPrincipal principal = createMemberPrincipal();
        QuestionDto.Post dto = createQuestionPostDto();

        willDoNothing().given(questionService).saveQuestion(any(MemberPrincipal.class), any(QuestionDto.Post.class));

        Gson gson = new Gson();

        String requestJson = gson.toJson(dto);
        String jwt = createJwt(principal.toEntity());

        // When & Then
        mvc.perform(post("/questions")
                        .header(getJwtHeader(), getJwtPrefix() + " " + jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson)
                )
                .andExpect(status().isCreated())
                .andDo(document("post-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestHeaders(
                                headerWithName("Authorization").description("Access Token")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용"),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("질문 태그들")
                                )
                        )
                ));
        then(questionService).should().saveQuestion(any(MemberPrincipal.class), any(QuestionDto.Post.class));
        then(memberService).should().searchMember(anyString());
    }


    @DisplayName("[PATCH] 질문 정보 수정 - 정상 호출")
    @Test
    public void givenQuestionIdAndMemberPrincipalAndPatchInfo_whenUpdatingQuestionInfo_thenReturnNothing() throws Exception {
        // Given with Stubbing
        Question question = createQuestion();
        MemberPrincipal principal = createMemberPrincipal();
        QuestionDto.Patch dto = createQuestionPatchDto();

        willDoNothing().given(questionService).updateQuestion(anyLong(), any(MemberPrincipal.class), any(QuestionDto.Patch.class));

        Gson gson = new Gson();

        String requestJson = gson.toJson(dto);
        String jwt = createJwt(principal.toEntity());

        // When & Then
        mvc.perform(patch("/questions/{questionId}", question.getId())
                        .header(getJwtHeader(), getJwtPrefix() + " " + jwt)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson)
                )
                .andExpect(status().isOk())
                .andDo(document("patch-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("questionId").description("질문의 PK")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("Access Token")
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목").optional(),
                                        fieldWithPath("content").type(JsonFieldType.STRING).description("질문 내용").optional(),
                                        fieldWithPath("tags").type(JsonFieldType.ARRAY).description("질문 태그들").optional()
                                )
                        )
                ));
        then(questionService).should().updateQuestion(anyLong(), any(MemberPrincipal.class), any(QuestionDto.Patch.class));
        then(memberService).should().searchMember(anyString());
    }

    @DisplayName("[DELETE] 질문 정보 삭제 - 정상 호출")
    @Test
    public void givenQuestionId_whenDeletingQuestion_thenReturnNothing() throws Exception {
        // Given with Stubbing
        Question question = createQuestion();
        MemberPrincipal principal = createMemberPrincipal();

        willDoNothing().given(memberService).deleteMember(anyLong(), any(MemberPrincipal.class));

        String jwt = createJwt(principal.toEntity());

        // When & Then
        mvc.perform(delete("/questions/{questionId}", question.getId())
                        .header(getJwtHeader(), getJwtPrefix() + " " + jwt)
                        .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isNoContent())
                .andDo(document("delete-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("questionId").description("질문의 PK")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("Access Token")
                        )
                ));
        then(questionService).should().deleteQuestion(anyLong(), any(MemberPrincipal.class));
        then(memberService).should().searchMember(anyString());
    }
}