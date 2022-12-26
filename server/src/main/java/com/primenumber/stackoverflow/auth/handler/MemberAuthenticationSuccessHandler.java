package com.primenumber.stackoverflow.auth.handler;

import com.google.gson.Gson;
import com.primenumber.stackoverflow.dto.MemberDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.response.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        Gson gson = new Gson();

        MemberPrincipal memberPrincipal = (MemberPrincipal) authentication.getPrincipal();
        MemberDto.Response dto = MemberDto.Response.from(memberPrincipal.toEntity());
        BaseResponse baseResponse = new BaseResponse(dto);

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(baseResponse));

        log.info("# Authenticated successfully!");
    }
}
