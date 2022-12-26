package com.primenumber.stackoverflow.dto.security;

import com.primenumber.stackoverflow.entity.Member;
import com.primenumber.stackoverflow.entity.util.MemberStatus;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
public class MemberPrincipal implements UserDetails {
    private Long id;
    private String email;
    private String password;
    private String displayName;
    private MemberStatus status;

    private MemberPrincipal(Long id, String email, String password, String displayName, MemberStatus status) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.displayName = displayName;
        this.status = status;
    }

    public static MemberPrincipal of(Long id, String email, String password, String displayName, MemberStatus status) {
        return new MemberPrincipal(id, email, password, displayName, status);
    }

    public static MemberPrincipal from(Member entity) {
        return MemberPrincipal.of(
                entity.getId(),
                entity.getEmail(),
                entity.getPassword(),
                entity.getDisplayName(),
                entity.getStatus()
        );
    }

    public Member toEntity() {
        return Member.of(id, email, password, displayName, status);
    }

    @Override public String getUsername() { return email; }
    @Override public String getPassword() { return password; }

    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return null; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }

    @Override public boolean isEnabled() { return true; }
}
