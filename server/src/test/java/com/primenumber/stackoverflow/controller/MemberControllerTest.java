package com.primenumber.stackoverflow.controller;

import com.google.gson.Gson;
import com.primenumber.stackoverflow.dto.LoginDto;
import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.service.MemberService;
import config.TestSecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static com.primenumber.stackoverflow.util.Stub.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.requestParameters;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("컨트롤러 - 회원")
@AutoConfigureRestDocs
@Import(TestSecurityConfig.class)
@WebMvcTest(MemberController.class)
class MemberControllerTest {

    @Autowired private MockMvc mvc;

    @MockBean private MemberService memberService;

    @DisplayName("[GET] 회원 페이지 - 정상 호출")
    @Test
    public void givenNothing_whenQuestingMemberPage_thenReturnMemberPage() throws Exception {
        // Given with Stubbing
        Pageable pageable = PageRequest.of(0, 10, Sort.Direction.DESC, "createdAt");
        Page<Member> memberPage = createMemberPage(pageable);

        given(memberService.searchMembers(any(Pageable.class)))
                .willReturn(memberPage);

        // When & Then
        mvc.perform(get("/members")
                        .queryParam("page", String.valueOf(0))
                        .queryParam("size", String.valueOf(10))
                )
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(document("get-members",
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
                                        fieldWithPath("response[].id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("response[].email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("response[].displayName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("response[].status").type(JsonFieldType.STRING).description("회원 상태: 활동 상태 / 탈퇴 상태"),
                                        fieldWithPath("response[].createdAt").type(JsonFieldType.STRING).description("회원 등록일"),
                                        fieldWithPath("response[].modifiedAt").type(JsonFieldType.STRING).description("회원 정보 수정일"),
                                        fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                                        fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("페이지 인덱스"),
                                        fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("페이지 크기"),
                                        fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("현재 페이지가 가진 정보 갯수"),
                                        fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("전체 페이지 갯수")
                                )
                        )
                ));
    }

    @DisplayName("[POST] 회원 가입 - 정상 호출")
    @Test
    public void givenMemberDtoPost_whenQuestingMemberRegistration_thenReturnNothing() throws Exception {
        // Given with Stubbing
        MemberDto.Post dto = createMemberPostDto();
        willDoNothing().given(memberService).saveMember(any(MemberDto.Post.class));

        Gson gson = new Gson();

        String requestJson = gson.toJson(dto);

        // When & Then
        mvc.perform(post("/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson)
                )
                .andExpect(status().isCreated())
                .andDo(document("post-members",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호"),
                                        fieldWithPath("displayName").type(JsonFieldType.STRING).description("닉네임")
                                )
                        )
                ));
    }
}