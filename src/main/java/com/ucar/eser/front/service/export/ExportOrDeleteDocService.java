package com.ucar.eser.front.service.export;

import javax.servlet.http.HttpServletRequest;

/**
 * @author forest
 * @email wei.wang09@ucarinc.com
 * @create 2017-05-26 13:50
 */
public interface ExportOrDeleteDocService {

    public void queryAndDelete(String clusterName, String indexName, Integer maxNum,
                               String conds,HttpServletRequest request) throws Exception;

    public String getAllScrollInfo();

    public boolean terminate(String taskId);

    public void refreshTaskList();
}