package com.ucar.eser.core.jest.vo;

public class RequestVO extends VoItf{
    private String path;

    public RequestVO(String path) {
        this.path = path;
    }

    @Override
    public String getUrl() {
        return "http://" + host+path;
    }

}