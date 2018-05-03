package com.ucar.eser.admin.controller.datasource;

import com.ucar.eser.admin.service.datasource.DataSourceService;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.bean.po.DataSourceInfo;
import com.ucar.eser.core.jest.common.EsCloudVoEnum;
import com.ucar.eser.core.util.RequestContext;
import com.ucar.eser.core.util.common.Constant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * Created by wangjiulin on 2018/3/7.
 */
@Controller
@RequestMapping("/dataSource")
public class DataSourceController {

    private static final Logger LOG = LoggerFactory.getLogger(DataSourceController.class);


    @Autowired
    private DataSourceService dataSourceService;

    @RequestMapping(value = "getList")
    public String getDataSourceInfoList(Model model) {
        List<DataSourceInfo> dataSourceInfos = dataSourceService.getList();
        model.addAttribute("dataSourceInfos", dataSourceInfos);
        model.addAttribute("productLineList", EsCloudVoEnum.ProductLineEnum.values());
        return "/jsp/datasourceInfo/dataSourceInfoList.jsp";
    }


    @RequestMapping(value = "addInfo")
    public @ResponseBody
    Map<String,Object> addDataSourceInfo(DataSourceInfo dataSourceInfo) {
        Map<String,Object> map = new HashMap<String, Object>();
        try {

            if(dataSourceService.checkExists(dataSourceInfo)) {
                map.put("success", false);
                map.put("msg", "此数据源名称已存在！");
                return map;
            }
            CustomUser customUser = (CustomUser) RequestContext.getSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME);
            if(customUser != null){
                dataSourceInfo.setCreateUser(customUser.getUserName());
                dataSourceService.insertInfo(dataSourceInfo);
                map.put("success", true);
                map.put("msg", "保存成功！");
            }
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", "保存失败！");
            LOG.error("创建失败",e);
        }
        return map;
    }

    @RequestMapping("getInfo")
    public @ResponseBody Map<String,Object> getInfo(Long id) {
        Map<String,Object> map = new HashMap<String,Object>();
        try {
            DataSourceInfo dataSourceInfo = dataSourceService.getDataSourceInfo(id);
            map.put("code", 1);
            map.put("data", dataSourceInfo);
        } catch (Exception e) {
            map.put("code", "获取详情失败！");
            LOG.error("获取集群详情失败",e);
        }
        return map;
    }


    @RequestMapping(value = "updateInfo")
    public @ResponseBody Map<String,Object> updateInfo(DataSourceInfo dataSourceInfo) {
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            if(dataSourceService.checkExists(dataSourceInfo)) {
                map.put("success", false);
                map.put("msg", "此数据源名称已存在！");
                return map;
            }
            CustomUser customUser = (CustomUser) RequestContext.getSessionAttribute(Constant.CUSTOM_USER_SESSION_NAME);
            if(customUser != null){
                dataSourceInfo.setUpdateUser(customUser.getUserName());
                dataSourceService.updateInfo(dataSourceInfo);
                map.put("success", true);
                map.put("msg", "修改成功！");
            }
        } catch (Exception e) {
            map.put("success", false);
            map.put("msg", "修改失败！");
            LOG.error("修改失败",e);
        }
        return map;
    }


    @RequestMapping(value = "deleteInfo")
    public @ResponseBody Map<String,Object> deleteInfo(Long id) {
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            dataSourceService.deleteInfo(id);
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
