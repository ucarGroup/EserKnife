package com.ucar.eser.core.util;

/**
 * Created by wangjiulin on 2017/10/23.
 */
public class IntegerUtil {
    public IntegerUtil() {
    }

    public static Integer defaultIfZero(Integer originalInt, Integer defaultInt) {
        return 0 == originalInt.intValue()?defaultInt:originalInt;
    }

    public static Integer defaultIfError(String originalStr, Integer defaultInt) {
        try {
            return Integer.valueOf(Integer.parseInt(org.apache.commons.lang3.StringUtils.trimToEmpty(originalStr)));
        } catch (Exception var3) {
            return defaultInt;
        }
    }

    public static Integer defaultIfError(Integer originalStr, Integer defaultInt) {
        try {
            return Integer.valueOf(originalStr.intValue());
        } catch (Exception var3) {
            return defaultInt;
        }
    }

    public static Integer defaultIfSmallerThan0(Integer originalInt, Integer defaultInt) {
        return 0 >= originalInt.intValue()?defaultInt:originalInt;
    }

    public static Integer exceptionIfSmallerThan0(String originalStr) throws Exception {
        try {
            int e = Integer.parseInt(org.apache.commons.lang3.StringUtils.trimToEmpty(originalStr));
            if(e > 0) {
                return Integer.valueOf(e);
            } else {
                throw new Exception();
            }
        } catch (Exception var2) {
            throw new Exception(originalStr + " is smaller than 0, or it is a  invalid parameter ");
        }
    }

    public static boolean isBiggerThan0(int num) {
        return 0 < num;
    }

    public static Integer maxIfTooBig(Integer originalInt, Integer maxInt) {
        if(originalInt.intValue() >= maxInt.intValue()) {
            originalInt = maxInt;
        }

        return originalInt;
    }
}
