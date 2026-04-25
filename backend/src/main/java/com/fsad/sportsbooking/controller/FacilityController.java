package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.model.Facility;
import com.fsad.sportsbooking.model.UserRole;
import com.fsad.sportsbooking.service.FacilityService;
import com.fsad.sportsbooking.service.RoleValidator;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "http://localhost:3000")
public class FacilityController {

 private final FacilityService service;

 public FacilityController(FacilityService service) {
  this.service = service;
 }

 // ✅ Anyone can view facilities (optional: restrict to CITIZEN)
 @GetMapping
 public List<Facility> getAllFacilities() {
  return service.getAllFacilities();
 }

 // ✅ Only ADMIN can add facility
 @PostMapping
 public Facility addFacility(
         @RequestBody Facility facility,
         @RequestHeader("Role") String role
 ) {
  RoleValidator.requireRole(role, UserRole.ADMIN);
  return service.addFacility(facility);
 }
}
