package com.ucar.eser.core.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * Created by wangjiulin on 2017/10/20.
 */
public final class ReflectUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(ReflectUtil.class);

    private ReflectUtil() {
    }

    public static void setFieldValue(Object target, String fname, Class ftype, Object fvalue) {
        boolean flag = target == null || fname == null || "".equals(fname);
        flag = flag || fvalue != null && !ftype.isAssignableFrom(fvalue.getClass());
        if(!flag) {
            Class clazz = target.getClass();

            try {
                Method me = clazz.getDeclaredMethod("set" + Character.toUpperCase(fname.charAt(0)) + fname.substring(1), new Class[]{ftype});
                if(!Modifier.isPublic(me.getModifiers())) {
                    me.setAccessible(true);
                }

                me.invoke(target, new Object[]{fvalue});
            } catch (Exception var9) {
                try {
                    Field fe = clazz.getDeclaredField(fname);
                    if(!Modifier.isPublic(fe.getModifiers())) {
                        fe.setAccessible(true);
                    }

                    fe.set(target, fvalue);
                } catch (Exception var8) {
                    if(LOGGER.isDebugEnabled()) {
                        LOGGER.debug(var8.getMessage(), var8);
                    }
                }
            }

        }
    }
}