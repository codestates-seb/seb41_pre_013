package com.primenumber.stackoverflow.controller;

import com.google.gson.Gson;
import com.primenumber.stackoverflow.dto.AnswerDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Answer;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.Question;
import com.primenumber.stackoverflow.service.AnswerService;
import com.primenumber.stackoverflow.service.MemberService;
import com.primenumber.stackoverflow.util.QuestionStub;
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
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.List;

import static com.primenumber.stackoverflow.util.AnswerStub.createAnswer;
import static com.primenumber.stackoverflow.util.AnswerStub.createAnswerPage;
import static com.primenumber.stackoverflow.util.Stub.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.requestHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@DisplayName("컨트롤러 - 답변")
@WebMvcTest(AnswerController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
@Import(TestSecurityConfig.class)
public class AnswerControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnswerService answerService;

    @Autowired
    private MemberService memberService;

    @Autowired
    private Gson gson;

    @DisplayName("답변 목록 조회 테스트")
    @Test
    public void getAnswers() throws Exception {
        //given
        Pageable pageable = PageRequest.of(0, 10, Sort.Direction.DESC, "createdAt");
        Page<Answer> answerPage = createAnswerPage(pageable);

        given(answerService.getAnswers(anyLong(), anyInt(), anyInt())).willReturn(answerPage);

        //when
        ResultActions actions = mockMvc.perform(
                get("/answers")
                .queryParam("question-id", String.valueOf(1L))
                .queryParam("page", String.valueOf(1))
                .queryParam("size", String.valueOf(10))
                .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        actions.andExpect(status().isOk());

        actions.andDo(
                document("get-answers",
                preprocessRequest(prettyPrint()),
                preprocessResponse(prettyPrint()),
                requestParameters(
                        List.of(
                                parameterWithName("question-id").description("답변을 조회하고자 하는 질문 식별자"),
                                parameterWithName("page").description("페이지 인덱스"),
                                parameterWithName("size").description("페이지 사이즈")
                        )
                ),
                responseFields(
                        List.of(
                                fieldWithPath("response").type(JsonFieldType.ARRAY).description("결과 데이터"),
                                fieldWithPath("response[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                fieldWithPath("response[].content").type(JsonFieldType.STRING).description("답변 내용"),
                                fieldWithPath("response[].createdAt").type(JsonFieldType.STRING).description("답변 등록일"),
                                fieldWithPath("response[].modifiedAt").type(JsonFieldType.STRING).description("답변 최근 수정일"),
                                fieldWithPath("response[].memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                fieldWithPath("response[].displayName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                fieldWithPath("response[].questionId").type(JsonFieldType.NUMBER).description("질문 식별자"),
                                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 인덱스"),
                                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("현재 페이지가 가진 정보 갯수"),
                                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 갯수")
                        )
                )
        ));
    }

    @DisplayName("답변 삭제 기능 테스트")
    @Test
    public void deleteAnswer() throws Exception {
        //given
        Member member = createMember();

        String jwt = createJwt(member);

        Question question = QuestionStub.createQuestion(1L, "스트링부트 테스트에 대한 질문입니다.",
                "스프링부트 테스트는 어떻게 진행되나요?",
                member);

        Answer answer = createAnswer("답변입니다.", member, question);

        given(answerService.modifyDeletedAnswerStatus(anyLong(), anyLong()))
                .willReturn(answer);

        //when
        ResultActions actions = mockMvc.perform(
                delete("/answers/{answers-id}", answer.getId())
                        .header(getJwtHeader(), getJwtPrefix() + " " + jwt)
        );

        //then
        actions
                .andExpect(status().isOk());

        actions.andDo(
                document("delete-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("Access Token")
                        )
                ));

    }

    @DisplayName("답변 등록 기능 테스트")
    @Test
    public void registerAnswerTest() throws Exception {
        //given
        Member member = createMember();

        String jwt = createJwt(member);

        Question question = QuestionStub.createQuestion(1L, "스트링부트 테스트에 대한 질문입니다.",
                "스프링부트 테스트는 어떻게 진행되나요?",
                member);

        String content = "스프링부트 테스트에 대한 답변입니다.";
        AnswerDto.Post post = new AnswerDto.Post(content);
        String requestBody = gson.toJson(post);

        Answer answer = createAnswer(content, member, question);

        given(answerService.createAnswer(anyLong(), any(AnswerDto.Post.class), any(MemberPrincipal.class)))
                .willReturn(answer);

        //when
        ResultActions actions = mockMvc.perform(
                post("/answers")
                        .header(getJwtHeader(), getJwtPrefix() + " " + jwt)
                        .queryParam("question-id", String.valueOf(1L))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
        );

        //then
        actions
                .andExpect(status().isCreated());

        actions.andDo(
                document("post-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                        parameterWithName("question-id").description("답변을 조회하고자 하는 질문 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("Access Token")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("response.answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("response.content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("response.createdAt").type(JsonFieldType.STRING).description("답변 등록일"),
                                        fieldWithPath("response.modifiedAt").type(JsonFieldType.STRING).description("답변 최근 수정일"),
                                        fieldWithPath("response.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("response.displayName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("response.questionId").type(JsonFieldType.NUMBER).description("질문 식별자")
                                )
                        )
        ));
    }

    @DisplayName("답변 수정 기능 테스트")
    @Test
    public void modifyAnswerTest() throws Exception {
        //given
        Member member = createMember();

        String jwt = createJwt(member);

        Question question = QuestionStub.createQuestion(1L, "스트링부트 테스트에 대한 질문입니다.",
                "스프링부트 테스트는 어떻게 진행되나요?",
                member);

        String content = "스프링부트 테스트에 대한 답변 수정입니다.";
        AnswerDto.Patch patch = new AnswerDto.Patch(content);
        String requestBody = gson.toJson(patch);

        Answer answer = createAnswer(content, member, question);

        given(answerService.updateAnswer(anyLong(), any(AnswerDto.Patch.class), any(MemberPrincipal.class)))
                .willReturn(answer);

        //when
        ResultActions actions = mockMvc.perform(
                post("/answers")
                        .header(getJwtHeader(), getJwtPrefix() + " " + jwt)
                        .queryParam("question-id", String.valueOf(1L))
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestBody)
        );

        //then
        actions
                .andExpect(status().isCreated());

        actions.andDo(
                document("patch-answer",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("answer-id").description("답변 식별자")
                        ),
                        requestHeaders(
                                headerWithName("Authorization").description("Access Token")
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("response.answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                                        fieldWithPath("response.content").type(JsonFieldType.STRING).description("답변 내용"),
                                        fieldWithPath("response.createdAt").type(JsonFieldType.STRING).description("답변 등록일"),
                                        fieldWithPath("response.modifiedAt").type(JsonFieldType.STRING).description("답변 최근 수정일"),
                                        fieldWithPath("response.memberId").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("response.displayName").type(JsonFieldType.STRING).description("작성자 닉네임"),
                                        fieldWithPath("response.questionId").type(JsonFieldType.NUMBER).description("질문 식별자")
                                )
                        )
                ));
    }
}

