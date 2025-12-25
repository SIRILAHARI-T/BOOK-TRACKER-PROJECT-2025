package com.example.booktracker.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;
    private String status;

    // Many-to-One relationship with User
    @ManyToOne
    @JoinColumn(name = "user_id") // foreign key to User table
    private User user;

    // Constructors
    public Book() {}

    public Book(String title, String author, String status, User user) {
        this.title = title;
        this.author = author;
        this.status = status;
        this.user = user;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
}
