package com.ucar.eser.front.controller.alias;

import com.alibaba.fastjson.JSON;
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
 * Created by wangjiulin on 2018/3/13.
 */
@Controller
@RequestMapping("/aliasManager")
public class AliasManagerController {

    private static final Logger LOG = LoggerFactory.getLogger(AliasManagerController.class);

    @Autowired
    private JestService jestService;


    @RequestMapping(value = "/createAll")
    @ResponseBody
    public Object cretaAll(@RequestParam("clusterName") String clusterName,
                                  @RequestParam(value="data",required=false) String data,
                                  @RequestParam("url") String url,
                                  @RequestParam("method") String method) {
        String json =null;
        try {
            JestResult result = (JestResult) jestService.httpProxy(clusterName,url,method,data);
            if(result != null){
                json = result.getJsonString();
            }
        } catch (Exception e) {
            LOG.error("alias error:{}",e.getMessage());
            return null;
        }
        return JSON.parse(json);
    }
}
