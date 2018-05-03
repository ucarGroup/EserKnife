package com.ucar.eser.core.util;

import com.ucar.eser.core.util.exception.FrameworkRuntimeException;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;

import java.io.UnsupportedEncodingException;

/**
 * 常用加密算法
 * <br/>Created on 2012-11-6 上午11:51:56
 * @author 郑治明（zm.zheng@zhuche.com）
 * @since 1.0
 */
public final class EncryptUtil {
    private static final String PREFIX = "CAR-ZUCHE";
    private static final char MD5_ENCODING_VALUE1 = 0x001f;
    private static final int MD5_ENCODING_VALUE2 = 0x0015;
    private static final char MD5_ENCODING_VALUE3 = 0xffe0;

    private EncryptUtil() { }

    /**
     * sha1加密
     *
     * @param inStr 要加密的内容
     * @return 加密后的结果
     * @since  1.0
     */
    public static String sha1Encode(String inStr) {
        if (StringUtils.isEmpty(inStr)){
            return null;
        }
        String encryptStr = DigestUtils.sha1Hex(DigestUtils.sha1Hex(inStr + PREFIX) + PREFIX);
        return encryptStr;
    }

    /**
     * MD5加密
     * @param inStr 要加密的内容
     * @return 加密后的结果以16进制字符串返回
     * @since  3.4
     */
    public static String md5EncodeHex(String inStr) {
        return DigestUtils.md5Hex(inStr);
    }

    /**
     * MD5加密
     * @param inStr 要加密的内容
     * @return 加密后的结果
     * @since  3.4
     */
    public static byte[] md5Encode(String inStr) {
        return DigestUtils.md5(inStr);
    }

    /**
     * 简单加密
     *
     * @param in
     * @return
     */
    public static String encoding(String in) {//加密
        if (in == null){
            return null;
        }
        StringBuffer sb = new StringBuffer();
        for (int i = in.length() - 1; i >= 0; i--) {
            char chr = in.charAt(i);
            if (chr == '2'){
                sb.append((chr));
            }else{
                int result=  (chr & MD5_ENCODING_VALUE1) ^ MD5_ENCODING_VALUE2;
                result = chr & MD5_ENCODING_VALUE3 | result;
                sb.append((char)result);
            }
        }
        return sb.toString();
    }

    /**
     * 简单解密
     *
     * @param in
     * @return
     */
    public static String decoding(String in) {//解密
        return encoding(in);
    }

    /**
     * BASE64加密
     *
     * @param key 要加密的内容
     * @return 加密后的结果
     */
    public static String encryptBASE64(byte[] key) {
        return Base64.encodeBase64String(key);
//        return (new BASE64Encoder()).encodeBuffer(key);
    }

    /**
     * BASE64解密
     *
     * @param key 要解密的内容
     * @return 解密后的结果
     */
    public static byte[] decryptBASE64(String key) {
        try {
            return Base64.decodeBase64(key.getBytes("gb2312"));
        } catch (UnsupportedEncodingException e) {
            throw new FrameworkRuntimeException(e);
        }
    }
}
