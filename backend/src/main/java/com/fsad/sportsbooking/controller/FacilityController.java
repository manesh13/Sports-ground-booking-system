package com.fsad.sportsbooking.controller;

import com.fsad.sportsbooking.model.Facility;
import com.fsad.sportsbooking.model.UserRole;
import com.fsad.sportsbooking.security.AuthenticatedUser;
import com.fsad.sportsbooking.service.FacilityService;
import com.fsad.sportsbooking.service.RoleValidator;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/facilities")
@CrossOrigin(origins = "*")
public class FacilityController {

    private final FacilityService service;

    public FacilityController(FacilityService service) {
        this.service = service;
    }

    @GetMapping
    public List<Facility> list() {
        return service.getAllFacilities();
    }

    @PostMapping
    public Facility add(
            @RequestBody Facility facility,
            @AuthenticationPrincipal AuthenticatedUser auth
    ) {
        RoleValidator.requireRole(auth.getRole(), UserRole.ADMIN);
        return service.addFacility(facility);
    }
}
