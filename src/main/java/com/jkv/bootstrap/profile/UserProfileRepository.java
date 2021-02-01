package com.jkv.bootstrap.profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserProfileRepository extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE UserProfile a " +
    "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableUserProfile(String email);
}
