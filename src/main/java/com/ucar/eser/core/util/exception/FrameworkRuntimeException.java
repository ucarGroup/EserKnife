package com.ucar.eser.core.util.exception;

/**
 * Description:
 * All Rights Reserved.
 */
public class FrameworkRuntimeException extends RuntimeException {

    /**
     *
     */
    private static final long serialVersionUID = -1087812001354327291L;

    public FrameworkRuntimeException(){
        super();
    }

    public FrameworkRuntimeException(String message){
        super(message);
    }

    public FrameworkRuntimeException(String message, Throwable cause) {
        super(message, cause);
    }

    public FrameworkRuntimeException(Throwable cause) {
        super(cause);
    }

}