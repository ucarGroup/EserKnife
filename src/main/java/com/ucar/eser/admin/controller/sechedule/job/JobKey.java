package com.ucar.eser.admin.controller.sechedule.job;

import java.util.Date;

/**
 *
 * Created by wangjiulin on 2017/12/20.
 */
public class JobKey {

    public static String buildFutureKey(String clusterName, String type, Date collectTime) {
        return "cluster-" + clusterName +
                "-" +
                type +
                "-" +
                collectTime.getTime();
    }

}
