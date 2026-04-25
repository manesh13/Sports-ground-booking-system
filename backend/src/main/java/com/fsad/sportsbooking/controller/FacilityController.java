package com.fsad.sportsbooking.controller;
import java.util.*;import org.springframework.web.bind.annotation.*;
import com.fsad.sportsbooking.service.FacilityService;
import com.fsad.sportsbooking.model.Facility;
@RestController @RequestMapping("/api/facilities") @CrossOrigin
public class FacilityController{
 private final FacilityService service;
 public FacilityController(FacilityService s){this.service=s;}
 @GetMapping public List<Facility> list(){return service.all();}
 @PostMapping public Facility add(@RequestBody Facility f){return service.add(f);} }
