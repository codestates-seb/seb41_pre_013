package config;

import com.primenumber.stackoverflow.auth.JwtTokenizer;
import com.primenumber.stackoverflow.config.SecurityConfig;
import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.repository.MemberRepository;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.event.annotation.BeforeTestMethod;

import java.util.Optional;

import static com.primenumber.stackoverflow.util.Stub.createMember;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@Import({SecurityConfig.class, JwtTokenizer.class})
public class TestSecurityConfig {

    @MockBean
    private MemberRepository memberRepository;

    @BeforeTestMethod
    public void securitySetUp() {
        given(memberRepository.findByEmail(anyString())).willReturn(Optional.of(createMember()));
    }
}
