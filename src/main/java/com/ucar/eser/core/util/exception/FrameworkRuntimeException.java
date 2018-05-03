package com.ucar.eser.core.util.exception;

/**
 * Description:
 * All Rights Reserved.
 * @version 1.0  2012-9-1 下午10:46:28  by 李洪波（hb.li@zhuche.com）创建
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