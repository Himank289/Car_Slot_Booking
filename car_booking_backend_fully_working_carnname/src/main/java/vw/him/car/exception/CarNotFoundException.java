package vw.him.car.exception;

public class CarNotFoundException extends RuntimeException {
    public CarNotFoundException (String message) {
        super(message);
    }
}
