package com.ucar.eser.front.controller.stats;

import com.google.gson.JsonObject;
import com.ucar.eser.core.jest.service.JestService;
import io.searchbox.client.JestResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * Created by wangjiulin on 2018/4/26.
 */
@Controller
@RequestMapping("/stats")
public class StatsController {

    private static final Logger LOG = LoggerFactory.getLogger(StatsController.class);

    @Autowired
    private JestService jestService;

    @RequestMapping(value = "/shards")
    @ResponseBody
    public Object shards(@RequestParam("indexName") String indexName,
            @RequestParam("clusterName") String clusterName) {
        try {
            JsonObject object;
            String targetPath = "/"+indexName+"/_stats?level=shards&human&pretty";
            String targetMethod = "GET";
            JestResult jestResult = (JestResult) jestService.httpProxy(clusterName,targetPath,targetMethod,null);
            object=jestResult.getJsonObject();
            return object.toString();
        } catch (Exception e) {
            LOG.error("获取shards 信息失败：",e);
            return e.getMessage();
        }
    }
}
