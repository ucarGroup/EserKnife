package com.ucar.eser.front.controller.bigdesk;

import com.alibaba.fastjson.JSON;
import com.ucar.eser.admin.service.clusterManager.ClusterInfoService;
import com.ucar.eser.core.jest.service.JestService;
import io.searchbox.client.JestResult;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 *
 * Created by user on 2016/8/5.
 */
@Controller
@RequestMapping("bigdesk")
public class BigDeskController {

    @Autowired
    JestService jestService;

    @Autowired
    ClusterInfoService clusterInfoService;

    @RequestMapping(value = "/index")
    public String front(@RequestParam("clusterName") String clusterName, Model model) {

        model.addAttribute("clusterName",clusterName);
        return "/jsp/index/bigdesk.jsp";
    }

    @RequestMapping(value = "/proxy")
    @ResponseBody
    public Object esproxy(
                          @RequestParam("target") String target,
                          @RequestParam("clusterName") String clusterName) {

        try {
            String realTarget = new String(Base64.decodeBase64(target.getBytes("UTF-8")),"UTF-8");
            JestResult result = (JestResult) jestService.httpProxy(clusterName,realTarget,"GET",null);
            if(result != null){
                return JSON.parse(result.getJsonString());
            }else{
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
