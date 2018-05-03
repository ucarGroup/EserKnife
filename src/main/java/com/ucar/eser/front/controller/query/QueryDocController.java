package com.ucar.eser.front.controller.query;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.service.impl.JestServiceImpl;
import com.ucar.eser.front.service.export.ExportOrDeleteDocService;
import com.ucar.eser.front.service.query.QueryPageService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


/**
 *
 * Created by forest on 2016/8/5.
 */
@Controller
@RequestMapping("/query")
public class QueryDocController {

    @Autowired
    QueryPageService queryPageService;

    @Autowired
    ExportOrDeleteDocService exportOrDeleteDocService;

    @RequestMapping(value = "/proxy")
    @ResponseBody
    public Object query(
            @RequestParam("clusterName") String clusterName,
            @RequestParam("indexName") String indexName,
            @RequestParam("maxNum") Integer maxNum,
            @RequestParam("conds") String conds) {

        Map<String, Object> results = Maps.newHashMap();
        try {
            results = queryPageService.query(clusterName, indexName, maxNum, conds);
        } catch (Exception e) {
            e.printStackTrace();
        }
        List<Map<String, Object>> data = (List<Map<String, Object>>) results.get("data");
        for (Map<String, Object> each : data) {
            for (String fn : each.keySet()) {
                each.put(fn, each.get(fn).toString());
            }
        }
        return results;
    }

    @RequestMapping(value = "/refreshTaskList")
    @ResponseBody
    public Object refreshTaskList() {
        exportOrDeleteDocService.refreshTaskList();
        return "success";
    }

    @RequestMapping(value = "/terminateTask")
    @ResponseBody
    public Object terminateTask(@RequestParam("taskId") String taskId) {
        if (StringUtils.isBlank(taskId)) {
            return "taskId empty";
        }

        if (exportOrDeleteDocService.terminate(taskId)) {
            return "success";
        } else {
            return "not found task";
        }
    }

    @RequestMapping(value = "/viewScroll")
    @ResponseBody
    public Object viewScroll() {
        return exportOrDeleteDocService.getAllScrollInfo();
    }

    @RequestMapping(value = "/exportOrDelete")
    @ResponseBody
    public Object exportOrDelete(
            @RequestParam("clusterName") String clusterName,
            @RequestParam("indexName") String indexName,
            @RequestParam("maxNum") Integer maxNum,
            @RequestParam("conds") String conds,
            HttpServletRequest request
    ) {
        Map<String, Object> handlerResults = Maps.newHashMap();
        try {
            exportOrDeleteDocService.queryAndDelete(clusterName, indexName, maxNum, conds,request);
        } catch (Exception e) {
            e.printStackTrace();
            handlerResults.put("error", e.getCause());
            return "提交删除任务失败,原因:" + e.getCause();
        }

        return "已提交删除任务到后台";
    }

    @RequestMapping(value = "/getFieldInfos")
    @ResponseBody
    public Object getFieldInfos(
            @RequestParam("clusterName") String clusterName,
            @RequestParam("indexName") String indexName
    ) {
        Map<String, Object> results = Maps.newHashMap();
        if (StringUtils.isBlank(indexName)) {
            results.put("fieldInfos", Lists.newArrayList());
        } else {
            ArrayList<Object> fields = Lists.newArrayList();
            JestServiceImpl jestServiceImpl = (JestServiceImpl) SpringInit.getApplicationContext().getBean("jestServiceImpl");
            try {
                String execute =jestServiceImpl.getMapping(clusterName,indexName).getJsonString();
                Map<String, JSONObject> metaInfo = (Map<String, JSONObject>) JSON.parse(execute);
                if (metaInfo != null && metaInfo.get(indexName) != null && metaInfo.get(indexName).get("mappings") != null) {
                    JSONObject mappings = (JSONObject) metaInfo.get(indexName).get("mappings");

                    for (String key : mappings.keySet()) {
                        JSONObject eachMeta = mappings.getJSONObject(key);
                        JSONObject properties = (JSONObject) eachMeta.get("properties");
                        for (String fName : properties.keySet()) {
                            FieldInfo fieldInfo = new FieldInfo();
                            fieldInfo.setfName(fName);
                            fields.add(fieldInfo);
                        }
                    }
                }
                results.put("fieldInfos", fields);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return results;
    }

    public static class FieldInfo {
        String fName;

        public String getfName() {
            return fName;
        }

        public void setfName(String fName) {
            this.fName = fName;
        }
    }

}
