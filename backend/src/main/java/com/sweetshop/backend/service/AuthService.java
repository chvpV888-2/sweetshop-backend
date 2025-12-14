package com.sweetshop.backend.service;

import org.springframework.stereotype.Service;

@Service
public class AuthService {

    public String login(String username, String password) {
        if ("admin".equals(username) && "admin123".equals(password)) {
            return "LOGIN OK: " + username;
        }
        return "INVALID LOGIN";
    }
}
