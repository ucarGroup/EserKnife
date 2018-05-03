package com.ucar.eser.core.util.message;


import javax.mail.Authenticator;
import javax.mail.PasswordAuthentication;

/**
 *
 * Created by wangjiulin on 2017/11/9.
 */
public class MailAuthenticator extends Authenticator {
    /** 用户账号 */
    private String userName;
    /** 用户口令 */
    private String password;

    public MailAuthenticator(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    protected PasswordAuthentication getPasswordAuthentication() {
        return new PasswordAuthentication(userName, password);
    }
}
