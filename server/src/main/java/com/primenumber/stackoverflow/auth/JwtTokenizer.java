package com.primenumber.stackoverflow.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Component
public class JwtTokenizer {
    // TODO: 이후 최소한 시크릿은 환경변수로 변경할 것
    @Getter
    private final String headerString = "Authorization";
    @Getter
    private final String tokenPrefix = "Bearer";
    @Getter
    private final String secret = "91a4a9ed31c0eddc70d040538543b82cdf5bb8e84a8513447293dd8167e70941764ec5be594ff940b1485c43ac4fbc7ac8d0e3a798f590ee832789bb85ae6b1e";
    @Getter
    private final long refreshExpirationTime = 259_200_000;
    @Getter
    private final long accessExpirationTime = 3_600_000;


    public String generateAccessToken(
            Map<String, Object> claims,
            String subject,
            long expirationTime
    ) {
        Key key = getKeyFromBase64EncodedKey();

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key)
                .compact();
    }

    public String generateRefreshToken(String subject, long expirationTime) {
        Key key = getKeyFromBase64EncodedKey();

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key)
                .compact();
    }

    // 검증 후, Claims을 반환 하는 용도
    public Jws<Claims> getClaims(String jws) {
        Key key = getKeyFromBase64EncodedKey();

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    // 단순히 검증만 하는 용도로 쓰일 경우
    public void verifySignature(String jws) {
        Key key = getKeyFromBase64EncodedKey();

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    public String encodeBase64SecretKey() {
        return Encoders.BASE64.encode(secret.getBytes(StandardCharsets.UTF_8));
    }

    private Key getKeyFromBase64EncodedKey() {
        byte[] keyBytes = Decoders.BASE64.decode(encodeBase64SecretKey());
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }
}
