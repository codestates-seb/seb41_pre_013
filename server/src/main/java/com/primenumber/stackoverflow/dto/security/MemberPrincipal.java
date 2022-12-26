package com.primenumber.stackoverflow.dto.security;

import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class MemberPrincipal implements UserDetails {
    private String email;
    private String password;
    private String displayName;
    private MemberStatus status;

    private MemberPrincipal(String email, String password, String displayName, MemberStatus status) {
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.status = status;
    }

    public static MemberPrincipal of(String email, String password, String displayName, MemberStatus status) {
        return new MemberPrincipal(email, password, displayName, status);
    }

    public static MemberPrincipal from(Member entity) {
        return MemberPrincipal.of(
                entity.getEmail(),
                entity.getPassword(),
                entity.getDisplayName(),
                entity.getStatus()
        );
    }

    // TODO : status 도 추가해야 하는지 확인
    public Member toEntity() {
        return Member.of(email, password, displayName);
    }

    @Override public String getUsername() { return email; }
    @Override public String getPassword() { return password; }

    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return null; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }

    @Override public boolean isEnabled() { return true; }
}
