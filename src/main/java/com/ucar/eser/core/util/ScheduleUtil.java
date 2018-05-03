package com.ucar.eser.core.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

/**
 * 调度相关的工具类
 * <p/>
 * Created by wangzhen on 15-10-22.
 */
public class ScheduleUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(ScheduleUtil.class);

    private static final String COLLECT_TIME_FORMAT = "yyyyMMddHHmm";
    private static final String DATE_FORMAT = "yyyyMMdd";

    /**
     * cron表达式：每分钟，根据appId计算分钟的秒数
     *
     * @param appId
     * @return
     */
    public static String getMinuteCronByAppId(long appId) {
        String baseCron = (appId % 50) + " 0/1 * ? * *";
        //String baseCron = "*/2 * * ? * *";
        return baseCron;
    }

    /**
     * cron表达式：每小时，根据hostId计算小时的分钟数
     *
     * @param hostId
     * @return
     */
    public static String getHourCronByHostId(long hostId) {
        String hourCron = "0 %s 0/1 ? * *";
        Random random = new Random();
        long minute = (hostId + random.nextInt(Integer.MAX_VALUE)) % 60;
        return String.format(hourCron, minute);
    }

    /**
     * 获取当前时间下一分钟，按照定时任务格式返回
     * @return
     */
    public static String getHourCronByCurrentTime() {
        String hourCron = "%s 0/5 * ? * *";
        long minute = getCurrentTimeNextMinute();
        return String.format(hourCron, minute);
    }

    /**
     * 计算前一分钟的时间，并格式化
     *
     * @param collectTime 基准时间
     * @return
     */
    public static long getLastCollectTime(long collectTime) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(COLLECT_TIME_FORMAT);
        try {
            Date date = simpleDateFormat.parse(String.valueOf(collectTime));
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(date);
            calendar.add(Calendar.MINUTE, -1);
            Date lastDate = calendar.getTime();
            return Long.valueOf(simpleDateFormat.format(lastDate));
        } catch (ParseException e) {
            LOGGER.error(e.getMessage(), e);
            return 0L;
        }
    }

    /**
     * 格式化时间
     *
     * @param date
     * @return
     */
    public static long getCollectTime(Date date) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(COLLECT_TIME_FORMAT);
        return Long.valueOf(simpleDateFormat.format(date));
    }

    /**
     * 返回某一天的起始时间，如：201406300000
     *
     * @param date   当前日期
     * @param offset 针对当前日期的偏移
     * @return 日期的long形式，如201406300000
     */
    public static long getBeginTimeOfDay(Date date, int offset) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.add(Calendar.DAY_OF_YEAR, offset);
        date = calendar.getTime();
        SimpleDateFormat dateFormat = new SimpleDateFormat(DATE_FORMAT);
        return Long.valueOf(dateFormat.format(date) + "0000");
    }

    /**
     * 获取当前时间前一小时
     * @return
     */
    public static long getCurrentTimeNextMinute() {
        Calendar calendar = Calendar.getInstance();
        return calendar.get(Calendar.MINUTE);
    }

    /**
     * 根据基准时间baseTime，获取field中相差offset的时间值
     * By lvxiaoling
     * @param baseTime
     * @param field
     * @param offset
     * @return
     */
    public static Date getTimeByOffset (Date baseTime, int field, int offset) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(baseTime);
        calendar.add(field, offset);
        return calendar.getTime();
    }

}
