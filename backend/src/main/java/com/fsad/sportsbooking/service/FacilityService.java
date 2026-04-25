package com.fsad.sportsbooking.service;

import com.fsad.sportsbooking.model.Facility;
import com.fsad.sportsbooking.repository.FacilityRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacilityService {

 private final FacilityRepository repository;

 public FacilityService(FacilityRepository repository) {
  this.repository = repository;
 }

 public List<Facility> getAllFacilities() {
  return repository.findAll();
 }

 public Facility addFacility(Facility facility) {
  return repository.save(facility);
 }
}