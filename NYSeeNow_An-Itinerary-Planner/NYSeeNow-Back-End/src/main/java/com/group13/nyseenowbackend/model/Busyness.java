package com.group13.nyseenowbackend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "attraction_busyness_data")
@Data
public class Busyness {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "venue name")
    private String name;

    @Column(name = "day")
    private String day;

    @Column(name = "hour")
    private String hour;

    @Column(name = "busyness")
    private String busyness;
}
