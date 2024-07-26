package vw.him.car.dto;

import vw.him.car.enums.BookCarStatus;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookACarDto {

    private Long id;

    private LocalDate onDate;

    private LocalTime time;

    private BookCarStatus bookCarStatus;

    private Long CarId;

    private Long userId;

    private String name;

    private  String email;

    private String carName;


    public BookACarDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getOnDate() {
        return onDate;
    }

    public void setOnDate(LocalDate fromDate) {
        this.onDate = fromDate;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public BookCarStatus getBookCarStatus() {
        return bookCarStatus;
    }

    public void setBookCarStatus(BookCarStatus bookCarStatus) {
        this.bookCarStatus = bookCarStatus;
    }

    public Long getCarId() {
        return CarId;
    }

    public void setCarId(Long carId) {
        CarId = carId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCarName() {
        return carName;
    }

    public void setCarName(String carName) {
        this.carName = carName;
    }
}
