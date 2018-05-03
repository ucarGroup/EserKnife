package com.ucar.eser.core.util.message;

/**
 *
 * Created by wangjiulin on 2017/11/8.
 */
public class MailInfo {

    /** 通知信息发送地址（多个邮件地址以";"分隔） */
    private String notifyTo;
    /** 通知信息抄送地址（多个邮件地址以";"分隔） */
    private String notifyCc;

    /** 邮件主题 */
    private String subject;
    /** 邮件内容 */
    private String content;
    /** 邮件附件的文件名 */
    private String[] attachFileNames;

    public String getNotifyTo() {
        return notifyTo;
    }

    public void setNotifyTo(String notifyTo) {
        this.notifyTo = notifyTo;
    }

    public String getNotifyCc() {
        return notifyCc;
    }

    public void setNotifyCc(String notifyCc) {
        this.notifyCc = notifyCc;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String[] getAttachFileNames() {
        return attachFileNames;
    }

    public void setAttachFileNames(String[] attachFileNames) {
        this.attachFileNames = attachFileNames;
    }
}
