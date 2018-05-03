package com.ucar.eser.admin.controller.sechedule;

import com.ucar.eser.admin.service.schedule.SchedulerCenter;
import com.ucar.eser.core.bean.po.TriggerInfo;
import org.apache.commons.lang.StringUtils;
import org.quartz.TriggerKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * quartz管理test
 */
@Controller
@RequestMapping("manage/quartz")
public class QuartzManageController {

    @Autowired
    private SchedulerCenter schedulerCenter;

    @RequestMapping(value = "/list")
    public String doQuartzList(HttpServletRequest request, Model model) {
        String query = request.getParameter("query");
        List<TriggerInfo> triggerList;
        if (StringUtils.isBlank(query)) {
            triggerList = schedulerCenter.getAllTriggers();
            query = "";
        } else {
            triggerList = schedulerCenter.getTriggersByNameOrGroup(query);
        }
        model.addAttribute("triggerList", triggerList);
        model.addAttribute("query", query);
        return "/jsp/quartz/quartzList.jsp";
    }
    
    @RequestMapping(value = "/jsonList")
    public @ResponseBody Map<String,List<TriggerInfo>> getQuartzList() {
    	Map<String,List<TriggerInfo>> map = new HashMap<String, List<TriggerInfo>>();
        List<TriggerInfo> triggerList = schedulerCenter.getAllTriggers();
        map.put("aaData", triggerList);
        return map;
    }

    @RequestMapping(value = "/pause")
    public @ResponseBody Map<String,Object> pause(HttpServletRequest request) {
    	Map<String,Object> map = new HashMap<String,Object>();
		String name = request.getParameter("name");
		String group = request.getParameter("group");
		if (StringUtils.isNotBlank(name) || StringUtils.isNotBlank(group)) {
		    boolean result = schedulerCenter.pauseTrigger(new TriggerKey(name, group));
		    map.put("success", result);
		    if(result) {
		    	map.put("msg", "暂停成功！");
		    }else {
		    	map.put("msg", "暂停失败！");
		    }
		}
        return map;
    }

    @RequestMapping(value = "/resume")
    public @ResponseBody Map<String,Object> resume(HttpServletRequest request) {
    	Map<String,Object> map = new HashMap<String,Object>();
        String name = request.getParameter("name");
        String group = request.getParameter("group");
        if (StringUtils.isNotBlank(name) || StringUtils.isNotBlank(group)) {
        	boolean result = schedulerCenter.resumeTrigger(new TriggerKey(name, group));
            map.put("success", result);
		    if(result) {
		    	map.put("msg", "恢复成功！");
		    }else {
		    	map.put("msg", "恢复失败！");
		    }
        }
        return map;
    }

    @RequestMapping(value = "/remove")
    public @ResponseBody Map<String,Object> remove(HttpServletRequest request) {
    	Map<String,Object> map = new HashMap<String,Object>();
        String name = request.getParameter("name");
        String group = request.getParameter("group");
        if (StringUtils.isNotBlank(name) || StringUtils.isNotBlank(group)) {
        	boolean result = schedulerCenter.unscheduleJob(new TriggerKey(name, group));
            map.put("success", result);
		    if(result) {
		    	map.put("msg", "删除成功！");
		    }else {
		    	map.put("msg", "删除失败！");
		    }
        }
        return map;
    }

}
