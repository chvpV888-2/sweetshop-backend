package com.sweetshop.backend.controller;

import com.sweetshop.backend.dto.LoginRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody LoginRequest request) {
        return Map.of(
                "status", "success",
                "username", request.getUsername()
        );
    }
}
