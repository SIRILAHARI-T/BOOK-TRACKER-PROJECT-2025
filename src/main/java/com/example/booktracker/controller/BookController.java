package com.example.booktracker.controller;

import com.example.booktracker.entity.Book;
import com.example.booktracker.entity.User;
import com.example.booktracker.repository.BookRepository;
import com.example.booktracker.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // allow React frontend
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepo;
    private final UserRepository userRepo;

    public BookController(BookRepository bookRepo, UserRepository userRepo) {
        this.bookRepo = bookRepo;
        this.userRepo = userRepo;
    }

    // Add a new book for a specific user
    @PostMapping
    public Book addBook(@RequestParam Long userId, @RequestBody Book book) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        book.setUser(user);
        return bookRepo.save(book);
    }

    // Get all books for a specific user
    @GetMapping("/user/{userId}")
    public List<Book> getBooksByUser(@PathVariable Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));
        return bookRepo.findByUser(user);
    }

    // Update a book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        Book book = bookRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + id));

        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        book.setStatus(bookDetails.getStatus());

        return bookRepo.save(book);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        Book book = bookRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + id));

        bookRepo.delete(book);
        return "Book deleted successfully!";
    }
}
