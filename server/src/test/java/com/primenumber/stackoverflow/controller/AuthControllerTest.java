package com.primenumber.stackoverflow.controller;

import com.google.gson.Gson;
import com.primenumber.stackoverflow.auth.JwtTokenizer;
import com.primenumber.stackoverflow.dto.LoginDto;
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
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static com.primenumber.stackoverflow.util.Stub.createMember;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.headers.HeaderDocumentation.headerWithName;
import static org.springframework.restdocs.headers.HeaderDocumentation.responseHeaders;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("컨트롤러 - 인증")
@AutoConfigureRestDocs
@Import(TestSecurityConfig.class)
@WebMvcTest(Void.class)
public class AuthControllerTest {
    private final MockMvc mvc;

    @MockBean private MemberService memberService;

    public AuthControllerTest(@Autowired MockMvc mvc) { this.mvc = mvc; }

    @DisplayName("[POST] 로그인 - 정상 호출")
    @Test
    public void givenEmailAndPW_whenTryingToLogin_thenReturnMemberInfo() throws Exception {
        // Given
        Member member = createMember();
        LoginDto dto = LoginDto.of(member.getEmail(), member.getPassword());

        member.setPassword(new BCryptPasswordEncoder().encode(member.getPassword()));
        given(memberService.searchMember(anyString())).willReturn(member);

        Gson gson = new Gson();

        String requestJson = gson.toJson(dto);

        JwtTokenizer jwtTokenizer = new JwtTokenizer();

        // When & Then
        mvc.perform(post("/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson)
                )
                .andExpect(status().isOk())
                .andExpect(header().exists(jwtTokenizer.getHeaderString()))
                .andExpect(header().exists("Refresh"))
                .andDo(document("post-login",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("password").type(JsonFieldType.STRING).description("비밀번호")
                                )
                        ),
                        responseHeaders(
                                List.of(
                                        headerWithName("Authorization").description("Access Token"),
                                        headerWithName("Refresh").description("Refresh Token")
                                )
                        ),
                        responseFields(
                                List.of(
                                        fieldWithPath("response").type(JsonFieldType.OBJECT).description("결과 데이터"),
                                        fieldWithPath("response.id").type(JsonFieldType.NUMBER).description("회원 식별자"),
                                        fieldWithPath("response.email").type(JsonFieldType.STRING).description("이메일"),
                                        fieldWithPath("response.displayName").type(JsonFieldType.STRING).description("닉네임"),
                                        fieldWithPath("response.status").type(JsonFieldType.STRING).description("회원 상태: 활동 상태 / 탈퇴 상태")
                                )
                        )
                ));
    }

    @DisplayName("[GET] 로그아웃 - 정상 호출")
    @Test
    public void givenNothing_whenTryingToLogout_thenReturnNothing() throws Exception {
        // Given

        // When & Then
        mvc.perform(get("/logout"))
                .andExpect(status().isOk())
                .andDo(document("get-logout",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint())
                ));
    }
}
