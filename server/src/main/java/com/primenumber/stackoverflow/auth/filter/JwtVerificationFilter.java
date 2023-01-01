package com.primenumber.stackoverflow.auth.filter;

import com.primenumber.stackoverflow.auth.JwtTokenizer;
import com.primenumber.stackoverflow.dto.security.MemberPrincipal;
import com.primenumber.stackoverflow.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MemberService memberService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (Exception se) {
            request.setAttribute("exception", se);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader(jwtTokenizer.getHeaderString());

        return authorization == null || !authorization.startsWith(jwtTokenizer.getTokenPrefix());
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader(jwtTokenizer.getHeaderString()).replace(jwtTokenizer.getTokenPrefix() + " ", "");

        return jwtTokenizer.getClaims(jws).getBody();
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String email = (String) claims.get("email");

        MemberPrincipal principal = MemberPrincipal.from(memberService.searchMember(email));
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
