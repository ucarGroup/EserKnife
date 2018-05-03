package com.ucar.eser.admin.controller.token;

import com.ucar.eser.admin.service.token.TokenInfoService;
import com.ucar.eser.core.bean.vo.token.TokenInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 用户登录
 */
@Controller
@RequestMapping("/customtoken")
public class CustomTokenController {

    private static final Logger LOG = LoggerFactory.getLogger(CustomTokenController.class);

    @Autowired
    private TokenInfoService tokenInfoService;

	@RequestMapping(value = "/loadToken")
    @ResponseBody
    public ModelAndView loadToken(WebRequest request, Model model,String name) {

        TokenInfo tokenInfo = tokenInfoService.getTokenInfoByName(name);

        if (tokenInfo == null || request.checkNotModified(tokenInfo.getUpdateTime().getTime())) {
            model.addAttribute("tokens", "");
        }else{
            model.addAttribute("tokens", tokenInfo.getContent());
        }

        return new ModelAndView("/jsp/customtoken/token.jsp");
    }


    @RequestMapping("getTokenInfoList")
    public String getUserList(Model model) {

        List<TokenInfo> tokenInfoList = tokenInfoService.getList();

        model.addAttribute("tokenInfoList", tokenInfoList);
        return "/jsp/token/tokenInfoList.jsp";
    }

    @RequestMapping(value = "addTokenInfo")
    public @ResponseBody
    Map<String,Object> addTokenInfo(TokenInfo tokenInfo) {
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            if(tokenInfoService.checkExist(tokenInfo)) {
                map.put("success", false);
                map.put("msg", "此规则已存在！");
                return map;
            }
            tokenInfoService.addTokenInfo(tokenInfo);
            map.put("success", true);
            map.put("msg", "保存成功！");
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", "保存失败！");
            LOG.error("创建失败",e);
        }
        return map;
    }

    @RequestMapping("getTokenInfo")
    public @ResponseBody Map<String,Object> getTokenInfo(Long id) {
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            TokenInfo tokenInfo = tokenInfoService.getTokenInfoById(id);
            map.put("code", 1);
            map.put("data", tokenInfo);
        } catch (Exception e) {
            map.put("code", "获取详情失败！");
            LOG.error("获取报警规则详情失败",e);
        }
        return map;
    }


    @RequestMapping(value = "updateTokenInfo")
    public @ResponseBody Map<String,Object> updateTokenInfo(TokenInfo tokenInfo) {
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            tokenInfoService.updateTokenInfo(tokenInfo);
            map.put("success", true);
            map.put("msg", "修改成功！");
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", "修改失败！");
            LOG.error("修改失败",e);
        }
        return map;
    }


    @RequestMapping(value = "deleteTokenInfo")
    public @ResponseBody Map<String,Object> deleteTokenInfo(Long id) {
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            tokenInfoService.deleteTokenInfoById(id);
            map.put("success", true);
            map.put("msg", "删除成功！");
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", "删除失败！");
            LOG.error("删除失败",e);
        }
        return map;
    }
}
