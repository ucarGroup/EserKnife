package com.ucar.eser.core.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 日期信息处理工具类
 * <br/> Created on 2011-01-01
 * @author  hu,李青原(liqingyuan1986@aliyun.com)
 * @since 1.0
 */
public class DateUtils {

    public static final String NORMAL_FORMAT="yyyy-MM-dd";
    public static final String LONG_FORMAT="yyyy-MM-dd HH:mm:ss";

    private static final int FOUR=4;
    private static final int FIVE=5;
    private static final int SIX=6;
    private static final int SEVEN=7;
    private static final int EIGHT=8;
    private static final int NINE=9;
    private static final int TEN=10;
    private static final int TWELVE = 12;
    private static final int THIRTEEN = 13;
    private static final int FOURTEEN = 14;


    private static final int TWENTY_FOUR=24;
    private static final int SIXTY=60;
    private static final int ONE_THOUSAND=1000;
    private static final Logger LOGGER = LoggerFactory.getLogger(DateUtils.class);

    public enum DateType {
        year,month,day;
    }


    /**
     * 根据传入字符串 返回yyyy年mm月dd日；
     * 方法已过期，替代方法为convertDateStrToChineseDateStr()
     */
    @Deprecated
    public static String getCurrentDateToCN(String dateTime) {

        String year = dateTime.substring(0, FOUR);
        String month;
        String day = "";

        if (dateTime.substring(FIVE, SIX).equals("0")){
            month = dateTime.substring(SIX, SEVEN);
        } else{
            month = dateTime.substring(FIVE, SEVEN);
        }

        if (dateTime.substring(EIGHT, NINE).equals("0")){
            day = dateTime.substring(NINE, TEN);
        }else{
            day = dateTime.substring(EIGHT, TEN);
        }
        return year + "年" + month + "月" + day + "日";
    }

    /**
     * 把日期字符串 转换为 中文日期字符串
     * <br/> Created on 2012-11-12 上午08:52:25
     * @author  李青原(liqingyuan1986@aliyun.com)
     * @since 1.0
     * @param dateTime 日期字符串，格式为 yyyy*MM*dd，*号可以是任意单个字符
     * @param zeroFlag 当月或者日小于10时，是否用0补填在十位上;true补填，false不补填
     * @return 中文日期字符串，格式为yyyy年MM月dd日，解析错误返回NULL
     */
    public static String convertDateStrToChineseDateStr(String dateTime, boolean zeroFlag){
        try{
            if(dateTime.length() < TEN){
                throw new IllegalArgumentException("日期字符串格式错误！");
            }
            String year = dateTime.substring(0, FOUR);
            String month = dateTime.substring(FIVE, SEVEN);
            String day = dateTime.substring(EIGHT, TEN);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日");
            String result = sdf.format(sdf.parse(year + "年" + month + "月" + day + "日"));
            if(!zeroFlag){
                if(result.charAt(EIGHT) == '0'){
                    result = StringUtils.removeCharAt(result, EIGHT);
                }
                if(result.charAt(FIVE) == '0'){
                    result = StringUtils.removeCharAt(result, FIVE);
                }
            }
            return result;
        }catch(Exception e){
            return null;
        }
    }

    /**
     * 把中文日期字符串 转换为 日期字符串
     * <br/> Created on 2012-11-12 上午09:18:32
     * @author  李青原(liqingyuan1986@aliyun.com)
     * @since 1.0
     * @param dateTime 中文日期字符串，格式为yyyy年MM月dd日
     * @param spliter 返回日期字符串的年月日分隔符
     * @return 日期字符串，格式为 yyyy*MM*dd，*号由参数spliter决定，解析错误则返回NULL
     */
    public static String convertChineseDateStrToDateStr(String dateTime, Character spliter){
        try{
            if(dateTime.length() < TEN){
                throw new IllegalArgumentException("中文日期字符串参数错误！");
            }
            SimpleDateFormat paramFormat = new SimpleDateFormat("yyyy年MM月dd日");
            SimpleDateFormat resultFormat = new SimpleDateFormat("yyyy"+spliter.toString()+"MM"+spliter.toString()+"dd");

            return resultFormat.format(paramFormat.parse(dateTime));
        }catch(Exception e){
            return null;
        }
    }

    /**
     * 把中文日期字符串 转换为 日期字符串
     * <br/> Created on 2012-11-12 上午09:18:32
     * @author  李青原(liqingyuan1986@aliyun.com)
     * @since 1.0
     * @param dateTime 中文日期字符串，格式为yyyy年MM月dd日
     * @return 日期字符串，格式为 yyyy-MM-dd，解析错误则返回NULL
     */
    public static String convertChineseDateStrToDateStr(String dateTime){
        return convertChineseDateStrToDateStr(dateTime, '-');
    }

    /**
     * 获取当前系统的年月日;
     * 已过期,替代方法为getCurrentDateStr
     * @return String yyyy-mm-dd
     */
    @Deprecated
    @SuppressWarnings("static-access")
    public static String getCurrentDate2Format() {
        Calendar c = Calendar.getInstance();
        return "" + c.get(c.YEAR) + "-" + (c.get(c.MONTH) + 1) + "-"
                + c.get(c.DATE);
    }

    /**
     * 获取当前系统的年月日;
     * <br/> Created on 2012-11-12 上午09:18:32
     * @author  李青原(liqingyuan1986@aliyun.com)
     * @since 1.0
     * @return 返回格式为yyyy-MM-dd
     */
    public static String getCurrentDateStr(){
        Calendar c = Calendar.getInstance();
        return c.get(Calendar.YEAR) + "-" + (c.get(Calendar.MONTH) + 1) + "-"
                + c.get(Calendar.DATE);
    }

    /**
     * 取得系统当前时间后n个月的相对应的一天的年月日
     *
     * @param n
     * @return String yyyy-mm-dd
     */
    public static String getNMonthAfterCurrentDay(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.MONTH, n);

        return "" + c.get(Calendar.YEAR) + "-" + (c.get(Calendar.MONTH) + 1) + "-"
                + c.get(Calendar.DATE);

    }

    /**
     * 取得系统当前时间前n天的年月日
     *
     * @param n
     * @return String yyyy-mm-dd
     */
    public static String getNDayBeforeCurrentDate(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, -n);
        return "" + c.get(Calendar.YEAR) + "-" + (c.get(Calendar.MONTH) + 1) + "-"
                + c.get(Calendar.DATE);
    }

    /**
     * 取得系统当前时间后n天的年月日
     *
     * @param n
     * @return String yyyy-mm-dd
     */
    public static String getNDayAfterCurrentDate(int n) {
        Calendar c = Calendar.getInstance();
        c.add(Calendar.DAY_OF_MONTH, n);
        return "" + c.get(Calendar.YEAR) + "-" + (c.get(Calendar.MONTH) + 1) + "-"
                + c.get(Calendar.DATE);
    }

    /**
     * 将一个日期转化成Calendar
     * 已过期，替代方法为convertDateObjectToCalendar
     * @param date
     * @return Calendar
     */
    @Deprecated
    public static Calendar switchStringToCalendar(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c;
    }

    /**
     * 将一个日期转化成Calendar
     * @param date
     * @return Calendar
     */
    public static Calendar convertDateObjectToCalendar(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c;
    }

    /**
     * 计算天数
     * @param startTime	起始日期字符串，格式 yyyy-MM-dd
     * @param endTime 结束日期字符串，格式 yyyy-MM-dd
     * @return int
     */
    public static int countDay(String startTime, String endTime) {
        int day = 0;
        Calendar startTimec = Calendar.getInstance();
        startTimec.setTime(dateString2Date(startTime));
        Calendar endTimec = Calendar.getInstance();
        endTimec.setTime(dateString2Date(endTime));
        double countMillis = (endTimec.getTimeInMillis() - startTimec
                .getTimeInMillis()) / (TWENTY_FOUR * SIXTY * SIXTY * ONE_THOUSAND);
        day = (int) Math.ceil(countMillis);
        return day;
    }

    /**
     * 将日期字符串转换成日期型,字符串格式 yyyy-MM-dd
     * @param dateStr
     * @return Date 解析错误，返回NULL
     */
    public static Date dateString2Date(String dateStr) {
        return dateString2Date(dateStr, NORMAL_FORMAT);
    }
    /**
     * 将日期字符串转换成日期型 格式化
     * @param dateStr	日期字符串
     * @param partner	解析格式
     * @return Date 解析错误，返回NULL
     */
    public static Date dateString2Date(String dateStr, String partner) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat(partner);
            ParsePosition pos = new ParsePosition(0);
            Date current = formatter.parse(dateStr, pos);
            return current;
        } catch (NullPointerException e) {
            return null;
        }
    }

    /**
     * 将日期字符串转换成日历对象,默认解析格式 yyyy-MM-dd
     * <br/> Created on 2012-11-12 上午09:18:32
     * @author  李青原(liqingyuan1986@aliyun.com)
     * @since 1.0
     * @param dateStr
     * @return Calendar对象,如果解析错误,返回NULL
     */
    public static Calendar convertDateStrToCalendar(String dateStr){
        return convertDateStrToCalendar(dateStr, NORMAL_FORMAT);
    }

    /**
     * 将日期字符串转换成日历对象,按照格式参数解析
     * <br/> Created on 2012-11-12 上午09:18:32
     * @author  李青原(liqingyuan1986@aliyun.com)
     * @since 1.0
     * @param dateStr 日期字符串
     * @param partner 解析格式
     * @return Calendar对象,如果解析错误,返回NULL
     */
    public static Calendar convertDateStrToCalendar(String dateStr, String partner){
        try {
            SimpleDateFormat formatter = new SimpleDateFormat(partner);
            Date current = formatter.parse(dateStr);
            Calendar c = Calendar.getInstance();
            c.setTime(current);
            return c;
        } catch (Exception e) {
            return null;
        }
    }
    /**
     * 获取指定日期的年份
     *
     * @param pDate util.Date日期
     *
     * @return int 年份
     */
    public static int getYearOfDate(Date pDate) {
        Calendar c = Calendar.getInstance();
        c.setTime(pDate);
        return c.get(Calendar.YEAR);
    }

    /**
     * 获取日期字符串的年份
     * @param pDate
     * @return int
     */
    public static int getYearOfDate(String pDate) {
        return getYearOfDate(dateString2Date(pDate));
    }

    /**
     * 获取指定日期的月份
     *
     * @param pDate 日期
     *
     * @return int 月份
     */
    public static int getMonthOfDate(Date pDate) {
        Calendar c = Calendar.getInstance();
        c.setTime(pDate);
        return c.get(Calendar.MONTH) + 1;
    }

    /**
     * 获取日期字符串的月份
     *
     * @param date
     * @return int
     */
    public static int getMonthOfDate(String date) {
        return getMonthOfDate(dateString2Date(date));
    }

    /**
     * 获取指定日期的日份
     *
     * @param pDate
     *            util.Date日期
     *
     * @return int 日份
     */
    public static int getDayOfDate(Date pDate) {
        Calendar c = Calendar.getInstance();
        c.setTime(pDate);
        return c.get(Calendar.DAY_OF_MONTH);
    }

    /**
     * 获取指定日期的小时
     *
     * @param date
     *            util.Date日期
     *
     * @return int 日份
     */
    public static int getHourOfDate(Date date) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.HOUR_OF_DAY);
    }

    /**
     * 获取指定日期的分钟
     *
     * @param pDate
     *            util.Date日期
     *
     * @return int 分钟
     */
    public static int getMinuteOfDate(Date pDate) {
        Calendar c = Calendar.getInstance();
        c.setTime(pDate);
        return c.get(Calendar.MINUTE);
    }

    /**
     * 获取指定日期的秒钟
     *
     * @param pDate
     *            util.Date日期
     *
     * @return int 秒钟
     */
    public static int getSecondOfDate(Date pDate) {
        Calendar c = Calendar.getInstance();
        c.setTime(pDate);
        return c.get(Calendar.SECOND);
    }

    /**
     * 获取指定日期的毫秒
     *
     * @param pDate
     *            util.Date日期
     *
     * @return long 毫秒
     */
    public static long getMillisOfDate(Date pDate) {
        Calendar c = Calendar.getInstance();
        c.setTime(pDate);
        return c.getTimeInMillis();
    }

    /**
     * util.Date型日期转化指定格式的字符串型日期
     *
     * @param pUtilDate
     *            Date
     *
     * @param pFormat
     *            String 格式1:"yyyy-MM-dd" 格式2:"yyyy-MM-dd hh:mm:ss EE"
     *            格式3:"yyyy年MM月dd日 hh:mm:ss EE" 说明: 年-月-日 时:分:秒 星期 注意MM/mm大小写
     *
     * @return String
     */
    public static String toStrDateFromUtilDateByFormat(
            Date pUtilDate, String pFormat) throws ParseException {
        String result = "";
        if (pUtilDate != null) {
            SimpleDateFormat sdf = new SimpleDateFormat(pFormat);
            result = sdf.format(pUtilDate);
        }
        return result;
    }

    /**
     * 在给定的日期基础上添加年，月，日、时，分，秒 例如要再2006－10－21（uitl日期）添加3个月，并且格式化为yyyy-MM-dd格式，
     * 这里调用的方式为 addDate(2006－10－21,3,Calendar.MONTH,"yyyy-MM-dd")
     *
     * @param startDate
     *            给定的日期
     *
     * @param count
     *            时间的数量
     *
     * @param field
     *            添加的域
     *
     * @param format
     *            时间转化格式，例如：yyyy-MM-dd hh:mm:ss 或者yyyy-mm-dd等
     *
     * @return 添加后格式化的时间
     *
     */
    public String addDate(Date startDate, int count, int field,
                          String format) throws ParseException {

        // 年，月，日、时，分，秒
        int year = getYearOfDate(startDate);
        int month = getMonthOfDate(startDate) - 1;
        int day = getDayOfDate(startDate);
        int hour = getHourOfDate(startDate);
        int minute = getMinuteOfDate(startDate);
        int second = getSecondOfDate(startDate);
        Calendar calendar = new GregorianCalendar(year, month, day, hour, minute, second);
        calendar.add(field, count);
        return toStrDateFromUtilDateByFormat(calendar.getTime(), format);
    }

    /**
     *
     * @Title: checkWeekendDay
     *
     * @Description: 判断是平时还是周末
     *
     * @param @param date
     * @param @return
     *
     * @return boolean
     *
     * @throws
     */

    public static boolean checkWeekendDay(String date) {
        Calendar c = Calendar.getInstance();
        c.setTime(dateString2Date(date));
        int num = c.get(Calendar.DAY_OF_WEEK);

        // 如果为周六 周日则为周末 1星期天 2为星期六
        if (num == SIX || num == SEVEN || num == 1) {
            return true;
        }
        return false;
    }

    /**
     *
     *
     * @Title: getMonthsByTime
     *
     * @Description: 按时间段计算月份跨度 计算出所包含的月份
     *
     * @param @param startTime
     * @param @param endTime
     * @param @return
     * @param @throws ParseException
     *
     * @return String[][]
     *
     * @throws
     */
    public static int[][] getMonthsByTime(String startTime, String endTime) {
        List<String> months = new ArrayList<String>();
        int m = 0;
        String[] start = startTime.split("-");
        String[] end = endTime.split("-");
        int year1 = StringUtils.parseInt(start[0]);
        int year2 = StringUtils.parseInt(end[0]);
        int month1 = StringUtils.parseInt(start[1]);
        int month2 = StringUtils.parseInt(end[1]);
        int count = year2 - year1;
        int mon = TWELVE;
        if(count == 0){
            mon = month2;
        }
        while (month1 <= mon) {
            months.add(year1 + "-" + (month1++));
        }
        if (count > 1) {
            for (int i = 1; i < count; i++) {
                year1 += 1;
                for (int j = 1; j < THIRTEEN; j++) {
                    months.add(year1 + "-" + j);
                }
            }
        }
        if(count > 0){
            year1 += 1;
            month1 = 1;
            while (month1 <= month2) {
                months.add(year1 + "-" + (month1++));
            }
        }
        m = months.size();
        int[][] month = new int[m][2];
        for (int j = 0; j < months.size(); j++) {
            String[] date = months.get(j).split("-");
            month[j][0] = StringUtils.parseInt(date[0]);
            month[j][1] = StringUtils.parseInt(date[1]);
        }
        return month;
    }


    /**
     *
     * Description: 比较日期
     * @Version1.0 2012-11-26 上午11:39:05 by 李涛（litao02@zuche.com）创建
     * @param dateType   枚举类型 年，月，日
     * @param pattern
     * @param isRoundMode  计算零头的情况，根据实际确定月份是否要加1 还是要减1
     * @param startDate
     * @param endDate  可变参数，如果不传入endDate参数，默认startDate和系统当前日期去比较
     * @return
     * @throws ParseException
     */
    public static int getDateDiff(DateType dateType,String pattern,boolean isRoundMode,String startDate, String... endDate) throws ParseException {
        int month;
        int day;
        int year;
        SimpleDateFormat fmt = new SimpleDateFormat(pattern);
        Date startDate1 = fmt.parse(startDate);

        Calendar starCal = Calendar.getInstance();
        starCal.setTime(startDate1);

        int sYear = starCal.get(Calendar.YEAR);
        int sMonth = starCal.get(Calendar.MONTH);
        int sDay = starCal.get(Calendar.DAY_OF_MONTH);

        Calendar endCal = Calendar.getInstance();
        Date endDate1 = null;
        if (endDate.length != 0) {
            if (endDate.length > 1) {
                throw new RuntimeException("endDate参数只能是0个或者1个");
            }
            for (String date : endDate) {
                endDate1 = fmt.parse(date);
            }
        } else {
            endDate1 = fmt.parse(getCurrentDateStr());
        }
        endCal.setTime(endDate1);
        int eYear = endCal.get(Calendar.YEAR);
        int eMonth = endCal.get(Calendar.MONTH);
        int eDay = endCal.get(Calendar.DAY_OF_MONTH);

        switch (dateType) {
            case year:
                year = eYear - sYear;
                return year;
            case month:
                month = ((eYear - sYear) * TWELVE + (eMonth - sMonth));
                if (isRoundMode){
                    month += (eDay > sDay ? 1 : 0);
                }else{
                    month += (eDay >= sDay ? 0 : -1);
                }
                return month;
            case day:
                day = (int) ((endDate1.getTime() - startDate1.getTime()) / (TWENTY_FOUR * SIXTY * SIXTY * ONE_THOUSAND));
                return day;
            default:
                return 0;
        }
    }


    /**
     *
     * Description: 时间计算(根据时间推算另个日期)
     *
     * @Version1.0 2012-4-12 下午12:59:39 by 王星皓（albertwxh@gmail.com）创建
     * @param date
     *            日期
     * @param type
     *            类型 y,M,d,h,m,s 年、月、日、时、分、秒
     * @param value
     *            添加值
     * @return
     */
    public static Date dateAdd(Date date, String type, int value) {
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        if (type.toLowerCase().equals("y") || type.toLowerCase().equals("year")){
            c.add(Calendar.YEAR, value);
        }else if (type.equals("M") || type.toLowerCase().equals("month")){
            c.add(Calendar.MONTH, value);
        }else if (type.toLowerCase().equals("d")
                || type.toLowerCase().equals("date")){
            c.add(Calendar.DATE, value);
        }else if (type.toLowerCase().equals("h")
                || type.toLowerCase().equals("hour")){
            c.add(Calendar.HOUR, value);
        }else if (type.equals("m") || type.toLowerCase().equals("minute")){
            c.add(Calendar.MINUTE, value);
        }else if (type.toLowerCase().equals("s")
                || type.toLowerCase().equals("second")){
            c.add(Calendar.SECOND, value);
        }
        return c.getTime();
    }

    /**
     * 获取指定日期的周
     *
     * @param date
     *            util.Date日期
     *
     * @return int 周
     */
    @SuppressWarnings("deprecation")
    public static int getWeekOfDate(String date) {
        ParsePosition pos = new ParsePosition(0);
        Date parseDate = new SimpleDateFormat(NORMAL_FORMAT).parse(date,
                pos);
        return parseDate.getDay();
    }
    /**
     * 指定字符串格式的日期 加指定天数
     * @param date yyyy-MM-dd
     * @param amount
     * @return String yyyy-MM-dd
     */
    public static String dateAddByString(String date, int amount){
        Date d = StringUtils.parseDate(date, NORMAL_FORMAT);
        Calendar c = Calendar.getInstance();
        c.setTime(d);
        c.add(Calendar.DATE, amount);
        SimpleDateFormat sdf = new SimpleDateFormat(NORMAL_FORMAT);
        return sdf.format(c.getTime());
    }
    /**
     * 指定字符串格式的日期 加指定月数
     * @param date yyyy-MM-dd
     * @param amount
     * @return String yyyy-MM-dd
     */
    public static String dateMonthAddByString(String date, int amount){
        Date d = StringUtils.parseDate(date, NORMAL_FORMAT);
        Calendar c = Calendar.getInstance();
        c.setTime(d);
        c.add(Calendar.MONTH, amount);
        SimpleDateFormat sdf = new SimpleDateFormat(NORMAL_FORMAT);
        return sdf.format(c.getTime());
    }

    /**
     *
     * Description: 使用默认格式格式化日期，默认格式：yyyy-MM-dd HH:mm:ss
     * @Version1.0
     * @param date
     * @return
     */
    public static String formatDate(Date date) {
        return formatDate(date,LONG_FORMAT);
    }

    /**
     *
     * Description:
     * @Version1.0
     * @param date
     * @param format
     * @return
     */
    public static String formatDate(Date date, String format) {
        if (date == null){
            return "";
        }else{
            return new SimpleDateFormat(format).format(date);
        }
    }

    /**
     * 将日期字符串，按照格式参数格式化;
     * 已过期，替代方法formatDateStr;
     * @param date
     * @param format
     * @return
     */
    @Deprecated
    public static String formatDate(String date, String format) {

        Date d = StringUtils.parseDate(date, format);

        if (d == null){
            return "";
        }else{
            return new SimpleDateFormat(format).format(d);
        }
    }

    /**
     * 将日期字符串，按照格式参数格式化;
     * @param date
     * @param format
     * @return
     */
    public static String formatDateStr(String date, String format){
        Date d = StringUtils.parseDate(date, format);

        if (d == null){
            return "";
        }else{
            return new SimpleDateFormat(format).format(d);
        }
    }
    /**
     *
     * Description:
     * @Version1.0
     * @param year
     * @param month
     * @return
     */
    public static String getLastDayOfMonth(int year, int month) {
        Calendar cal = Calendar.getInstance();
        cal.set(Calendar.YEAR, year);
        cal.set(Calendar.MONTH, month);
        cal.set(Calendar.DAY_OF_MONTH,cal.getActualMaximum(Calendar.DATE));
        return  new   SimpleDateFormat( "yyyy-MM-dd ").format(cal.getTime());
    }

    /**
     *
     * Description:
     * @Version1.0
     * @param dateSt
     * @return
     */
    public static String getLastDayOfMonth(String dateSt) {
        int year = getYearOfDate(dateSt);
        int month = getMonthOfDate(dateSt) - 1;

        return getLastDayOfMonth( year,  month);
    }

    /**
     * 得到两个时间差
     * @param startTime
     * @param toTime
     * @return
     */
    public static long dateDiffToMinuteD(String startTime, String toTime){
        long diff = 0l;
        if(StringUtils.checkEmpty(startTime) != null && StringUtils.checkEmpty(toTime) != null){
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            ParsePosition pos = new ParsePosition(0);
            Date startTimeD = format.parse(startTime, pos);
            pos.setIndex(0);
            Date toTimeD = format.parse(toTime, pos);
            diff = (startTimeD.getTime() - toTimeD.getTime())/ ONE_THOUSAND/SIXTY;
        }
        return diff;
    }

    /**
     * 获取给定时间下几天
     * @param thisDate，给定时间
     * @param days，天数
     * @return
     */
    public static String getNextDate(String thisDate,int days){

        SimpleDateFormat df=new SimpleDateFormat(NORMAL_FORMAT);

        Calendar cal=Calendar.getInstance();
        try {
            Date d = df.parse(thisDate);
            cal.setTime(d);
        } catch (ParseException e) {

            LOGGER.error(e.getMessage(), e);
            throw new IllegalArgumentException("参数格式异常thisDate:"+thisDate);
        }
        cal.add(Calendar.DAY_OF_MONTH, days);
        return df.format(cal.getTime());
    }

    /**
     * 判断是否是日期格式
     * @param sDate
     * @return
     * @since 1.0.0
     * @version 1.0.0
     */
    public static boolean isValidDate(String sDate) {
        String datePattern1 = "\\d{4}-\\d{2}-\\d{2}";
        String datePattern2 = "^((\\d{2}(([02468][048])|([13579][26]))"
                + "[\\-\\/\\s]?((((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|"
                + "(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?"
                + "((0?[1-9])|([1-2][0-9])))))|(\\d{2}(([02468][1235679])|([13579][01345789]))[\\-\\/\\s]?("
                + "(((0?[13578])|(1[02]))[\\-\\/\\s]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\\-\\/\\s]?"
                + "((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\\-\\/\\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))";
        if ((sDate != null)) {
            Pattern pattern = Pattern.compile(datePattern1);
            Matcher match = pattern.matcher(sDate);
            if (match.matches()) {
                pattern = Pattern.compile(datePattern2);
                match = pattern.matcher(sDate);
                return match.matches();
            }
            else {
                return false;
            }
        }
        return false;
    }

    /**
     * 转换时间格式
     *
     * @param time
     * @return
     */
    public static String formatDate(String time) {

        String ctime = null;
        StringBuilder temp = new StringBuilder();

        for (int i = 0; i < time.length(); i++) {
            if (time.charAt(i) >= '0' && time.charAt(i) <= '9') {
                temp.append(time.charAt(i));
            }
        }
        if (!StringUtils.isEmpty(temp.toString())){
            StringBuilder timeFormat = new StringBuilder();
            if (temp.length() == FOURTEEN) {
                timeFormat.append(temp.substring(0, FOUR));
                timeFormat.append("-");
                timeFormat.append(temp.substring(FOUR, SIX));
                timeFormat.append("-");
                timeFormat.append(temp.substring(SIX, EIGHT));
                timeFormat.append(" ");
                timeFormat.append(temp.substring(EIGHT, TEN));
                timeFormat.append(":");
                timeFormat.append(temp.substring(TEN, TWELVE));
                timeFormat.append(":");
                timeFormat.append(temp.substring(TWELVE, FOURTEEN));
            }else if (temp.length() == EIGHT) {
                timeFormat.append(temp.substring(0, FOUR));
                timeFormat.append("-");
                timeFormat.append(temp.substring(FOUR, SIX));
                timeFormat.append("-");
                timeFormat.append(temp.substring(SIX, EIGHT));
                timeFormat.append(" 00:00:00");
            }

            ctime = timeFormat.toString();

        }
        return ctime;
    }

}