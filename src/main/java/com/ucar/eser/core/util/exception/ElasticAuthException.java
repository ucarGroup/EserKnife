package com.ucar.eser.core.util.exception;

public class ElasticAuthException extends RuntimeException {


    private static final long serialVersionUID = -5781507163935151142L;

    public ElasticAuthException(String message){
        super(message);
    }

    public ElasticAuthException(String message, Throwable e){
        super(message,e);
    }
}
