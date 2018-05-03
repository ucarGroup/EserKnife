package com.ucar.eser.core.bean.vo.token;




import java.io.Serializable;
import java.util.Date;

public class TokenInfo implements Serializable{

    private static final long serialVersionUID = 8776044996829450508L;
    private Long id;

    private String name;

    private Date updateTime;

    private String content;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
