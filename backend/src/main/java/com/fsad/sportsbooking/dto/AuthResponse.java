package com.fsad.sportsbooking.dto;

public record AuthResponse(String token, Long id, String email, String role) {}
