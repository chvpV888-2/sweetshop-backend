package com.sweetshop.backend.controller;

import com.sweetshop.backend.entity.Sweet;
import com.sweetshop.backend.repository.SweetRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    private final SweetRepository repo;

    public SweetController(SweetRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/add")
    public Sweet addSweet(@RequestBody Sweet sweet) {
        return repo.save(sweet);
    }

    @GetMapping("/{username}")
    public List<Sweet> getUserSweets(@PathVariable String username) {
        return repo.findByUsername(username);
    }

    @PostMapping("/buy/{id}")
    public Sweet buy(@PathVariable Long id) {
        Sweet s = repo.findById(id).orElseThrow();
        if (s.getQuantity() > 0) {
            s.setQuantity(s.getQuantity() - 1);
        }
        return repo.save(s);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
