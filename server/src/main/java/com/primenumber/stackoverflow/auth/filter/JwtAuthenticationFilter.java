package com.primenumber.stackoverflow.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.primenumber.stackoverflow.auth.JwtTokenizer;
import com.primenumber.stackoverflow.dto.LoginDto;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        ObjectMapper objectMapper = new ObjectMapper();
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain,
            Authentication authentication
    ) throws ServletException, IOException {
        MemberPrincipal memberPrincipal = (MemberPrincipal) authentication.getPrincipal();
        Member member = memberPrincipal.toEntity();

        String accessToken = delegateAccessToken(member);
        //String refreshToken = delegateRefreshToken(member);

        response.setHeader(jwtTokenizer.getHeaderString(), jwtTokenizer.getTokenPrefix() + " " + accessToken);
        //response.setHeader("Refresh", refreshToken);

        this.getSuccessHandler().onAuthenticationSuccess(request, response, authentication);
    }

    private String delegateAccessToken(Member member) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", member.getEmail());

        String subject = member.getEmail();

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, jwtTokenizer.getAccessExpirationTime());

        return accessToken;
    }

//    private String delegateRefreshToken(Member member) {
//        String subject = member.getEmail();
//
//        String refreshToken = jwtTokenizer.generateRefreshToken(subject, jwtTokenizer.getRefreshExpirationTime());
//
//        return refreshToken;
//    }
}
