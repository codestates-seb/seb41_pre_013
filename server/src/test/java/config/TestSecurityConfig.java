package config;

import com.primenumber.stackoverflow.auth.JwtTokenizer;
import com.primenumber.stackoverflow.config.SecurityConfig;
import com.primenumber.stackoverflow.service.MemberService;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.event.annotation.BeforeTestMethod;

import static com.primenumber.stackoverflow.util.Stub.createMemberPrincipal;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@Import({SecurityConfig.class, JwtTokenizer.class})
public class TestSecurityConfig {
    @MockBean private MemberService memberService;

    @BeforeTestMethod
    public void securitySetUp() {
        given(memberService.searchMember(anyString())).willReturn(createMemberPrincipal().toEntity());
    }
}
