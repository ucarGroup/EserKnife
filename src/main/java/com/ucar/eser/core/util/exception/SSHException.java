package com.ucar.eser.core.util.exception;

public class SSHException extends Exception {
    private static final long serialVersionUID = -5365630128856068164L;

    public SSHException() {
    }

    public SSHException(String message) {
        super(message);
    }

    public SSHException(String message, Throwable cause) {
        super(message, cause);
    }

    public SSHException(Throwable cause) {
        super(cause);
    }
}
