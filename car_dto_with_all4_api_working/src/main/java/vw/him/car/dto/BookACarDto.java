package vw.him.car.dto;

import vw.him.car.enums.BookCarStatus;

import java.util.Date;

public class BookACarDto {

    private Long id;

    private Date fromDate;

    private Date toDate;

    private BookCarStatus bookCarStatus;

    private Long CarId;

    private Long userId;

    private String name;

    private  String email;


    public BookACarDto() {
    }

    public BookACarDto(Long id, Date fromDate, Date toDate, BookCarStatus bookCarStatus, Long carId, Long userId, String name, String email) {
        this.id = id;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.bookCarStatus = bookCarStatus;
        CarId = carId;
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
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
}
