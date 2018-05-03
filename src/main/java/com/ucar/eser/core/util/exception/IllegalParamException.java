package com.ucar.eser.core.util.exception;

public class IllegalParamException extends Exception {
    private static final long serialVersionUID = -5365630128856068164L;

    public IllegalParamException() {
    }

    public IllegalParamException(String message) {
        super(message);
    }

    public IllegalParamException(String message, Throwable cause) {
        super(message, cause);
    }

    public IllegalParamException(Throwable cause) {
        super(cause);
    }
}

