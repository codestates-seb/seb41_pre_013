package com.primenumber.stackoverflow.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class LoginDto {
    private String email;
    private String password;

    @JsonCreator
    public LoginDto(@JsonProperty("email") String email, @JsonProperty("password") String password) {
        this.email = email;
        this.password = password;
    }

    public static LoginDto of(String email, String password) {
        return new LoginDto(email, password);
    }
}
