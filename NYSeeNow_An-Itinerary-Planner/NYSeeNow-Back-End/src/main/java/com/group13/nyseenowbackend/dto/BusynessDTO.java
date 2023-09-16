package com.group13.nyseenowbackend.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import java.util.Objects;

@Data
public class BusynessDTO {
    @NotEmpty(message = "Venue name must not be empty")
    private String name;

    @NotEmpty(message = "Day must not be empty")
    private String day;

    @NotEmpty(message = "Hour must not be empty")
    private String hour;

    private String busyness;

    public BusynessDTO() {
    }

    @JsonCreator
    public BusynessDTO(@NotEmpty(message = "Venue name must not be empty") String name,
                    @NotEmpty(message = "Day must not be empty") String day,
                    @NotEmpty(message = "Hour must not be empty") String hour,
                       String busyness) {
        this.name = name;
        this.day = day;
        this.hour = hour;
        this.busyness = busyness;
    }

    public String getName() {
        return name;
    }

    public String getDay() {
        return day;
    }

    public String getHour() {
        return hour;
    }

    public String getBusyness() {
        return busyness;
    }

    @Override
    public String toString() {
        return "BusynessDTO{" +
                "name='" + name + '\'' +
                ", day='" + day + '\'' +
                ", hour='" + hour + '\'' +
                ", busyness='" + busyness + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BusynessDTO that = (BusynessDTO) o;
        return name.equals(that.name) && day.equals(that.day) && hour.equals(that.hour) && Objects.equals(busyness, that.busyness);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, day, hour);
    }

}
