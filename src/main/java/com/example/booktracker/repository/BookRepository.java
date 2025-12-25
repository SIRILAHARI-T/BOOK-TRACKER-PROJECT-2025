package com.example.booktracker.repository;

import com.example.booktracker.entity.Book;
import com.example.booktracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    // Custom method to find books by a specific user
    List<Book> findByUser(User user);
}



