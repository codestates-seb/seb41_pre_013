package com.primenumber.stackoverflow.pattern;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;

import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ValidatorTest {

    @ParameterizedTest(name = "#{index} - Run test with password = {0}")
    @MethodSource("validPasswordProvider")
    void test_password_regex_valid(String password) {
        assertTrue(PasswordValidator.isValid(password));
    }

    @ParameterizedTest(name = "#{index} - Run test with password = {0}")
    @MethodSource("invalidPasswordProvider")
    void test_password_regex_invalid(String password) {
        assertFalse(PasswordValidator.isValid(password));
    }

    static Stream<String> validPasswordProvider() {
        return Stream.of(
                "AAAbbbccc@123",
                "Helloworld$123",
                "A%^&*!a1",
                "A!@#$!a1",
                "0123456789$abcdefgAB",
                "123Aa$Aa"
        );
    }

    static Stream<String> invalidPasswordProvider() {
        return Stream.of(
                "Hello world$123",
                "12345678",
                "abcdefgh",
                "ABCDEFGH",
                "ABC$$$$$$",
                "java REGEX 123",
                "java REGEX 123 %",
                "________",
                "--------",
                "가나다라123#@!$",
                "abc123@",
                " ",
                "");
    }

    @ParameterizedTest(name = "#{index} - Run test with display name = {0}")
    @MethodSource("validDisplayNameProvider")
    void test_display_name_regex_valid(String displayName) {
        assertTrue(DisplayNameValidator.isValid(displayName));
    }

    @ParameterizedTest(name = "#{index} - Run test with display name = {0}")
    @MethodSource("invalidDisplayNameProvider")
    void test_display_name_regex_invalid(String displayName) {
        assertFalse(DisplayNameValidator.isValid(displayName));
    }

    static Stream<String> validDisplayNameProvider() {
        return Stream.of(
                "aaa",
                "CCC",
                "Abv가3",
                "뮤턴트30츠a",
                "한글만",
                "aaAA",
                "123AaAa",
                "0123456789abcde01234"
        );
    }

    static Stream<String> invalidDisplayNameProvider() {
        return Stream.of(
                "Hello world$123",
                "ABC$$$$$$",
                "java REGEX 123",
                "java REGEX 123 %",
                "________",
                "--------",
                "가나다라123#@!$",
                "abc123@",
                " ",
                "",
                "0123456789abcde012345");
    }
}

