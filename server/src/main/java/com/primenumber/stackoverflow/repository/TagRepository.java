package com.primenumber.stackoverflow.repository;

import com.primenumber.stackoverflow.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {
    Optional<Tag> findByName(String tag);
}
