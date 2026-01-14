package com.group06.movieweb.repository;

import com.group06.movieweb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    // Tìm user theo email nếu cần sau này
    User findByEmail(String email);
}