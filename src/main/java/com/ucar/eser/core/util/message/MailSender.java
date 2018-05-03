package com.ucar.eser.core.util.message;

import org.apache.commons.lang3.StringUtils;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import java.io.*;
import java.util.Calendar;
import java.util.Properties;

/**
 *
 * Created by wangjiulin on 2017/11/9.
 */
public class MailSender {

    private static Properties prop;

    private static MailSender sender = null;

    static{
        try {
            prop = new Properties();
            InputStream in = MailSender.class.getClassLoader().getResourceAsStream("mail.properties");
            prop.load(new InputStreamReader(in, "utf-8"));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static MailSender getInstance() {
        if(sender == null){
            sender = new MailSender();
        }
        return sender;
    }

    public static boolean sendTextMail(MailInfo mailInfo) throws Exception {
        // 需要身份认证，创建一个密码验证器
        MailAuthenticator authenticator = new MailAuthenticator((String) prop.get("mail.user"), (String) prop.get("mail.password"));
        // 根据邮件会话属性和密码验证器构造一个发送邮件的session
        Session sendMailSession = Session.getDefaultInstance(prop, authenticator);
        try {
            // 根据session创建一个邮件消息
            Message mailMessage = new MimeMessage(sendMailSession);
            // 创建邮件发送者地址
            String nick = (String) prop.get("mail.nick");
            Address from = new InternetAddress((String) prop.get("mail.user"),MimeUtility.encodeText(nick, "UTF-8", "B"));
            // 设置邮件消息的发送者
            mailMessage.setFrom(from);
            // 创建邮件的接收者地址 to：发送；cc：抄送
            Address[][] maillToArr = getMailToAddress(mailInfo);
            // 设置邮件消息的接收者，发送，抄送
            if (maillToArr != null && maillToArr[0] != null && maillToArr[0].length > 0) {
                mailMessage.setRecipients(Message.RecipientType.TO, maillToArr[0]);
            }
            if (maillToArr != null && maillToArr[1] != null && maillToArr[1].length > 0) {
                mailMessage.setRecipients(Message.RecipientType.CC, maillToArr[1]);
            }
            // 设置邮件消息的主题
            mailMessage.setSubject(mailInfo.getSubject());
            // 设置邮件消息发送的时间
            mailMessage.setSentDate(Calendar.getInstance().getTime());
            // 设置邮件消息的主要内容
            mailMessage.setText(mailInfo.getContent());
            Multipart multiPart = new MimeMultipart();
            BodyPart bodyPart = new MimeBodyPart();
            bodyPart.setText(mailInfo.getContent());
            multiPart.addBodyPart(bodyPart);
            //添加附件
            addAttachFile(mailInfo, multiPart);
            mailMessage.setContent(multiPart);
            // 发送邮件
            Transport.send(mailMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }

    private static void addAttachFile(MailInfo mailInfo, Multipart multiPart) throws MessagingException, UnsupportedEncodingException {
        BodyPart bodyPart;
        if(mailInfo.getAttachFileNames() != null && mailInfo.getAttachFileNames().length != 0){
            for(String attachFile : mailInfo.getAttachFileNames()){
                bodyPart=new MimeBodyPart();
                FileDataSource fds=new FileDataSource(attachFile); //得到数据源
                bodyPart.setDataHandler(new DataHandler(fds)); //得到附件本身并放入BodyPart
                bodyPart.setFileName(MimeUtility.encodeText(fds.getName()));  //得到文件名并编码（防止中文文件名乱码）同样放入BodyPart
                multiPart.addBodyPart(bodyPart);
            }
        }
    }


    /**
     * 以HTML格式发送邮件
     * @param mailInfo
     * @return
     */
    public static boolean sendHtmlMail(MailInfo mailInfo) throws Exception {
        // 需要身份认证，创建一个密码验证器
        MailAuthenticator authenticator = new MailAuthenticator((String) prop.get("mail.user"), (String) prop.get("mail.password"));
        // 根据邮件会话属性和密码验证器构造一个发送邮件的session
        Session sendMailSession = Session.getDefaultInstance(prop, authenticator);
        try {
            // 根据session创建一个邮件消息
            Message mailMessage = new MimeMessage(sendMailSession);
            // 创建邮件发送者地址
            String nick = (String) prop.get("mail.nick");
            Address from = new InternetAddress((String) prop.get("mail.user"),MimeUtility.encodeText(nick, "UTF-8", "B"));
            // 设置邮件消息的发送者
            mailMessage.setFrom(from);
            // 创建邮件的接收者地址 to：发送；cc：抄送
            Address[][] maillToArr = getMailToAddress(mailInfo);
            // 设置邮件消息的接收者，发送，抄送
            if (maillToArr != null && maillToArr[0] != null && maillToArr[0].length > 0) {
                mailMessage.setRecipients(Message.RecipientType.TO, maillToArr[0]);
            }
            if (maillToArr != null && maillToArr[1] != null && maillToArr[1].length > 0) {
                mailMessage.setRecipients(Message.RecipientType.CC, maillToArr[1]);
            }
            // 设置邮件消息的主题
            mailMessage.setSubject(mailInfo.getSubject());
            // 设置邮件消息发送的时间
            mailMessage.setSentDate(Calendar.getInstance().getTime());
            // MimeMultipart类是一个容器类，包含MimeBodyPart类型的对象
            Multipart multiPart = new MimeMultipart();
            // 创建一个包含HTML内容的MimeBodyPart
            BodyPart bodyPart = new MimeBodyPart();
            // 设置html邮件消息内容
            bodyPart.setContent(mailInfo.getContent(), "text/html; charset=utf-8");
            multiPart.addBodyPart(bodyPart);
            //添加附件
            addAttachFile(mailInfo,multiPart);
            // 设置邮件消息的主要内容
            mailMessage.setContent(multiPart);
            // 发送邮件
            Transport.send(mailMessage);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return true;
    }


    /**
     * 创建发送邮件列表地址对象
     *
     * @param mailInfo
     * @return Address[0]：发送地址数组；Address[1]：抄送地址数组
     */
    private static Address[][] getMailToAddress(MailInfo mailInfo) throws AddressException {
        Address[] toAdds = null;
        Address[] ccAdds = null;

        String[] toMails = mailInfo.getNotifyTo().split(";");
        toAdds = new InternetAddress[toMails.length];
        for (int index = 0; index < toMails.length; index++) {
            toAdds[index] = new InternetAddress(toMails[index]);
        }
        String notifyCc =mailInfo.getNotifyCc();
        if(StringUtils.isNotBlank(notifyCc)){
            String[] ccMails = mailInfo.getNotifyCc().split(";");
            ccAdds = new InternetAddress[ccMails.length];
            for (int index = 0; index < ccMails.length; index++) {
                ccAdds[index] = new InternetAddress(ccMails[index]);
            }
        }
        Address[][] result = { toAdds, ccAdds };
        return result;
    }

}
