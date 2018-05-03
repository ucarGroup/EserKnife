package com.ucar.eser.front.controller.restclient;

import com.google.gson.JsonObject;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.jest.service.JestService;
import com.ucar.eser.core.util.RequestContext;
import com.ucar.eser.core.util.common.Constant;
import io.searchbox.client.JestResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 *
 * Created by forest on 2016/8/5.
 */
@Controller
@RequestMapping("/rest")
public class RestClientController {

    @Autowired
    private JestService jestService;

    @RequestMapping(value = "/proxy")
    @ResponseBody
    public Object rest(
            @RequestParam("targetMethod") String targetMethod,
            @RequestParam("targetPath") String targetPath,
            @RequestParam("targetBody") String targetBody,
                          @RequestParam("clusterName") String clusterName) {
        try {
            JsonObject object;
            CustomUser customUser = (CustomUser) RequestContext.getSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME);
            if(customUser != null && !customUser.isAdmin() && !"get".equalsIgnoreCase(targetMethod)){
                object= new JsonObject();
                object.addProperty("msg","PUT POST DELETE   功能只有管理员有权限，如有疑问请联系管理员！！！" );
                return object.toString();
            }
            JestResult jestResult = (JestResult) jestService.httpProxy(clusterName,targetPath,targetMethod,targetBody);
            object=jestResult.getJsonObject();
            return object.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

}
