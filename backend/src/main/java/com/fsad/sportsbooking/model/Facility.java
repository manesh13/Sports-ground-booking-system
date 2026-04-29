package com.fsad.sportsbooking.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Facility {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String name;
 private String sportType;
 private boolean lighting;
 private double hourlyRate;

 public Long getId() { return id; }

 public String getName() { return name; }
 public void setName(String name) { this.name = name; }

 public String getSportType() { return sportType; }
 public void setSportType(String sportType) { this.sportType = sportType; }

 public boolean isLighting() { return lighting; }
 public void setLighting(boolean lighting) { this.lighting = lighting; }

 public double getHourlyRate() { return hourlyRate; }
 public void setHourlyRate(double hourlyRate) { this.hourlyRate = hourlyRate; }
}