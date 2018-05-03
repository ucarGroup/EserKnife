package com.ucar.eser.core.util.message;

import com.ucar.eser.core.util.ConfigUtil;

/**
 *
 * Created by wangjiulin on 2017/12/21.
 */
public class MailClient {

    // 默认邮箱地址
    private static String addrDefault="";

    public static Boolean sendMessage(String addr,String Content,String subject){
        MailInfo mailInfo = new MailInfo();
        if(addr == null){
            addr = addrDefault;
        }
        mailInfo.setNotifyTo(addr);
        mailInfo.setContent(Content);
        mailInfo.setSubject(subject);
        try {
            return MailSender.sendTextMail(mailInfo);
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public static Boolean sendMessage(String addr,String Content,String subject,Integer alarmWay){
        MailInfo mailInfo = new MailInfo();
        if(addr == null){
            addr = addrDefault;
        }
        mailInfo.setNotifyTo(addr);
        mailInfo.setContent(Content);
        mailInfo.setSubject(subject);
        try {
            if(alarmWay == 1) {//邮件
                return MailSender.sendTextMail(mailInfo);
            }else if(alarmWay == 2) {//短信
               // sendSMS(content);
                return false;
            }else if(alarmWay == 3) {//邮件+短信
                if(ConfigUtil.I.envType() == 3) {//非生产环境，只发送邮件
                  //  sendSMS(content);
                }
                return MailSender.sendTextMail(mailInfo);
            }else{
                return false;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
