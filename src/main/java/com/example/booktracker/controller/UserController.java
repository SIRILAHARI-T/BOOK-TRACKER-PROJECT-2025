package com.example.booktracker.controller;

import com.example.booktracker.entity.User;
import com.example.booktracker.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;

    public UserController(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        // Check if email already exists
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }
        userRepo.save(user);
        return "User registered successfully!";
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        Optional<User> existingUser = userRepo.findByEmail(user.getEmail());
        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            return existingUser.get(); // return full user object
        }
        throw new RuntimeException("Invalid email or password!");
    }
}

