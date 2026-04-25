package com.fsad.sportsbooking.model;
import jakarta.persistence.*;
@Entity
public class Facility{
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
 public Long id;
 public String name;
 public String sportType;
 public String surfaceType;
 public boolean lighting;
 public double hourlyRate;
}
