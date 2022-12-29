package com.primenumber.stackoverflow.pattern;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class DisplayNameValidator {
    private static final String DISPLAY_NAME_PATTERN = "^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{3,20}$";

    private static final Pattern pattern = Pattern.compile(DISPLAY_NAME_PATTERN);

    public static boolean isValid(final String displayName) {
        Matcher matcher = pattern.matcher(displayName);
        return matcher.matches();
    }

}