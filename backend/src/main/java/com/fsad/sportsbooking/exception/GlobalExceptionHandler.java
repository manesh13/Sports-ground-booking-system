package com.fsad.sportsbooking.exception;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BookingException.class)
    public ResponseEntity<String> handle(BookingException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }
}