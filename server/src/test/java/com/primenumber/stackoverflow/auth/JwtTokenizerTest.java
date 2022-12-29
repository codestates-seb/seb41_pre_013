package com.primenumber.stackoverflow.auth;

import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.*;

import java.util.*;
import java.util.concurrent.TimeUnit;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.*;

@DisplayName("JWT 로직")
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class JwtTokenizerTest {
    private static JwtTokenizer jwtTokenizer;

    @BeforeAll
    public void init() {
        jwtTokenizer = new JwtTokenizer();
    }

    @DisplayName("AccessToken 을 생성한다")
    @Test
    public void generateAccessTokenTest() {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", 1);

        String subject = "test access token";

        long expirationTime = TimeUnit.HOURS.toMillis(3);

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expirationTime);

        System.out.println(accessToken);

        assertThat(accessToken, notNullValue());
    }

    @Disabled
    @DisplayName("RefreshToken 을 생성한다")
    @Test
    public void generateRefreshTokenTest() {
        String subject = "test refresh token";

        long expirationTime = TimeUnit.DAYS.toMillis(3);

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expirationTime);

        System.out.println(refreshToken);

        assertThat(refreshToken, notNullValue());
    }

    @DisplayName("만료한 JWT 를 받으면, 예외를 반환한다")
    @Test
    public void verifyExpirationTest() throws InterruptedException {
        String accessToken = getAccessToken(Calendar.SECOND, 1);
        assertDoesNotThrow(() -> jwtTokenizer.verifySignature(accessToken));

        TimeUnit.MILLISECONDS.sleep(2000);

        assertThrows(ExpiredJwtException.class, () -> jwtTokenizer.verifySignature(accessToken));
    }

    @DisplayName("유효한 JWT 를 받으면, 아무것도 하지 않는다")
    @Test
    public void verifySignatureTest() {
        String accessToken = getAccessToken(Calendar.MINUTE, 10);
        assertDoesNotThrow(() -> jwtTokenizer.verifySignature(accessToken));
    }

    @DisplayName("AccessToken 이 올바른 claim 을 포함하면, 아무것도 하지 않는다")
    @Test
    public void getClaimsTest() {
        String accessToken = getAccessToken(Calendar.MINUTE, 10);
        Map<String, Object> claims = jwtTokenizer.getClaims(accessToken).getBody();

        assertThat(claims.get("memberId"), is(1));
    }

//    @DisplayName("만료한 JWT 를 받으면 예외를 반환한다")
//    @Test
//    public void verifyExpirationTest() throws InterruptedException {
//        String accessToken = getAccessToken(Calendar.SECOND, 1);
//        assertDoesNotThrow(() -> jwtTokenizer.verifySignature(accessToken));
//
//        TimeUnit.MILLISECONDS.sleep(1500);
//
//        assertThrows(ExpiredJwtException.class, () -> jwtTokenizer.verifySignature(accessToken));
//    }

    private String getAccessToken(int timeUnit, long timeAmount) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("memberId", 1);

        long milliseconds = 0;
        switch (timeUnit) {
            case Calendar.SECOND: milliseconds = TimeUnit.SECONDS.toMillis(timeAmount); break;
            case Calendar.MINUTE: milliseconds = TimeUnit.MINUTES.toMillis(timeAmount); break;
            case Calendar.HOUR: milliseconds = TimeUnit.HOURS.toMillis(timeAmount); break;
            case Calendar.DATE: milliseconds = TimeUnit.DAYS.toMillis(timeAmount); break;
            case Calendar.DAY_OF_WEEK: milliseconds = TimeUnit.DAYS.toMillis(7 * timeAmount); break;
        }


        String subject = "test access token";
        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, milliseconds);

        return accessToken;
    }
}