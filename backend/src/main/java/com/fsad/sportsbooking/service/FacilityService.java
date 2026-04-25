package com.fsad.sportsbooking.service;
import java.util.*;import org.springframework.stereotype.Service;
import com.fsad.sportsbooking.repository.FacilityRepository;
import com.fsad.sportsbooking.model.Facility;
@Service
public class FacilityService{
 private final FacilityRepository repo;
 public FacilityService(FacilityRepository repo){this.repo=repo;}
 public List<Facility> all(){return repo.findAll();}
 public Facility add(Facility f){return repo.save(f);} }
