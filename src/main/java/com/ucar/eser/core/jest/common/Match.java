package com.ucar.eser.core.jest.common;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 *
 * Created by wangjiulin on 2017/10/30.
 */
public class Match {

    public static String nodeStatsMatch(String str){
        Pattern p = Pattern.compile("[/][_]nodes[/]([\\w\\W]*)[/]stats[?]human");
        Matcher m = p.matcher(str);
        while (m.find()) {
           return m.group(1);
        }
        return null;
    }

    public static String clusterMatch(String str){
        Pattern p = Pattern.compile("[/][_]cluster[/]state[/]metadata[/]([\\w\\W]*)[?]human");
        Matcher m = p.matcher(str);
        while (m.find()) {
            return m.group(1);
        }
        return null;
    }

}
