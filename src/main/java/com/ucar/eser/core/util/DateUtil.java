package com.ucar.eser.core.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by wangzhen on 2015/10/21
 * 日期工具类
 */
public class DateUtil {
    private final static Logger LOGGER = LoggerFactory.getLogger(DateUtil.class);
    public final static String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss SSS";
    public  static SimpleDateFormat MIN_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm");
    /*
     * yyyyMMddHHmm格式format
     */
    public static String formatYYYYMMddHHMM(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmm");
        return sdf.format(date);
    }

    /*
     * yyyy-MM-dd HH:mm:ss格式format
     */
    public static String formatYYYYMMddHHMMSS(Date date) {
        if (date == null) {
            return null;
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return sdf.format(date);
    }

    /*
     * yyyyMMddHHmm格式parse
     */
    public static Date parse(String dateStr, String format) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return sdf.parse(dateStr);
    }

    /*
     * yyyyMMddHHmm格式parse
     */
    public static Date parseYYYYMMddHHMM(String dateStr) throws ParseException {
        return parse(dateStr, "yyyyMMddHHmm");
    }

    /**
     * yyyyMMddHH格式parse
     *
     * @throws ParseException
     */
    public static Date parseYYYYMMddHH(String dateStr) throws ParseException {
        return parse(dateStr, "yyyyMMddHH");
    }


    /*
     * yyyy-MM-dd格式parse
     */
    public static Date parseYYYY_MM_dd(String dateStr) throws ParseException {
        return parse(dateStr, "yyyy-MM-dd");
    }

    /**
     * yyyyMMdd格式parse
     */
    public static Date parseYYYYMMdd(String dateStr) throws ParseException {
        return parse(dateStr, "yyyyMMdd");
    }


    public static Date getDateByFormat(String date, String format) {
        SimpleDateFormat sf = new SimpleDateFormat(format);
        Date result = null;
        try {
            result = sf.parse(date);
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
        }
        return result;
    }

    public static String formatDate(Date date, String format) {
        SimpleDateFormat sf = new SimpleDateFormat(format);
        return sf.format(date);
    }


    public static String formatYYYYMMdd(Date date) {
        SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd");
        return sf.format(date);
    }

    public static String formatHHMM(Date date) {
        SimpleDateFormat sf = new SimpleDateFormat("HHmm");
        return sf.format(date);
    }

    public static Date afterDate(Date date,long afterTime) {
        return new Date(date.getTime()+afterTime);
    }

    public static String getBeforeMinTime() {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MINUTE, -1);
        return MIN_FORMAT.format(c.getTime());

    }
    
    /**
     * 
     * Description: 计算两个时间之间相差的秒数
     * Created on 2016-10-10 下午2:22:40
     * @param startTime
     * @param toTime
     * @return
     */
	public static long dateDiffToSecondD(Date startTime, Date toTime){
		long diff = 0l;
		if(startTime != null && toTime != null){
			diff = (toTime.getTime() - startTime.getTime())/ 1000;
		}
		return diff;
	}
	/**
	 * 
	 * Description: 获取与指定时间指定单位的时间
	 * Created on 2016-10-10 下午2:45:54
	 * @param date
	 * @param field
	 * @param diff
	 * @return
	 */
    public static Date getDiffTime(Date date , int field, int diff) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(field, diff);
        return c.getTime();
    }
}
