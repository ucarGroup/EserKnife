package com.ucar.eser.core.util.exception;

public class BusinessRuntimeException extends RuntimeException {
    private static final long serialVersionUID = -7464087034363911027L;

    public BusinessRuntimeException() {
    }

    public BusinessRuntimeException(String message) {
        super(message);
    }

    public BusinessRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public BusinessRuntimeException(Throwable cause) {
        super(cause);
    }
}

