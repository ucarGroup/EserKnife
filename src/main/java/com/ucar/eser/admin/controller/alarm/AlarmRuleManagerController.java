package com.ucar.eser.admin.controller.alarm;

import com.ucar.eser.admin.service.alarm.AlarmRuleService;
import com.ucar.eser.admin.service.clusterManager.ClusterInfoService;
import com.ucar.eser.admin.service.user.UserInfoService;
import com.ucar.eser.core.bean.po.ClusterInfo;
import com.ucar.eser.core.bean.po.UserInfo;
import com.ucar.eser.core.bean.vo.alarm.AlarmRule;
import com.ucar.eser.core.util.RequestContextUtil;
import com.ucar.eser.core.util.common.AlarmConstant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * 
 * Description: 报警规则控制器
 * All Rights Reserved.
 * Created on 2016-9-19 上午11:35:42
 */
@Controller
@RequestMapping("/alarm/rule/")
public class AlarmRuleManagerController {
	
	private static final Logger LOG = LoggerFactory.getLogger(AlarmRuleManagerController.class);
	
	@Autowired
	private AlarmRuleService alarmRuleService;

	@Autowired
	private ClusterInfoService clusterInfoService;

	@Autowired
	private UserInfoService userInfoService;

	@RequestMapping("getAlarmRuleList")
	public String getUserList(Model model) {
		
		List<AlarmRule> alarmRuleList = alarmRuleService.getList();
		List<ClusterInfo> clusterInfoList = clusterInfoService.getList(null);
		List<UserInfo> userList = userInfoService.getList();

		model.addAttribute("userList", userList);
		model.addAttribute("clusterInfoList", clusterInfoList);
		model.addAttribute("alarmRuleList", alarmRuleList);
		model.addAttribute("latitudeList", AlarmConstant.AlarmLatitudeEnum.values());
		return "/jsp/alarm/alarmRuleList.jsp";
	}

	@RequestMapping(value = "getLatitudeSub")
	public @ResponseBody Map<String,Object> getLatitudeSub(HttpServletRequest request){
		String latitudeValue = request.getParameter("latitudeValue");
		Map<String,Object> map = new HashMap<String, Object>();
		try{
			List<String> result = new ArrayList<String>();
			if(latitudeValue != null){
				String str =AlarmConstant.AlarmLatitudeSubEnum.getValueByName(latitudeValue);
				if(str != null ){
					String[] strs = str.split(",");
					Collections.addAll(result, strs);
				}
			}
			map.put("result",result);
			map.put("success", true);
			map.put("msg", "成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "失败！");
			LOG.error("获取latitudeSub失败",e);
		}
		return map;
	}
	
	
	@RequestMapping(value = "addAlarmRule")
    public @ResponseBody
	Map<String,Object> addAlarmRule( AlarmRule alarmRule) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		if(alarmRuleService.checkExist(alarmRule)) {
    			map.put("success", false);
    			map.put("msg", "此规则已存在！");
    			return map;
    		}
    		alarmRule.setOperateUser(RequestContextUtil.getCustomUserName());
			alarmRuleService.addAlarmRule(alarmRule);
			map.put("success", true);
			map.put("msg", "保存成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "保存失败！");
			LOG.error("创建失败",e);
		}
        return map;
    }
	
	@RequestMapping("getAlarmRule")
	public @ResponseBody
	Map<String,Object> getAlarmRule( Long id) {
		Map<String,Object> map = new HashMap<String,Object>();
		try {
			AlarmRule alarmRule = alarmRuleService.getAlarmRuleById(id);
			List<String> result = new ArrayList<String>();
			if(alarmRule.getLatitude() != null){
				String str =AlarmConstant.AlarmLatitudeSubEnum.getValueByName(alarmRule.getLatitude());
				if(str != null ){
					String[] strs = str.split(",");
					Collections.addAll(result, strs);
				}
			}

			map.put("latitudeSub",result);
			map.put("code", 1);
			map.put("data", alarmRule);
		} catch (Exception e) {
			map.put("code", "获取详情失败！");
			LOG.error("获取报警规则详情失败",e);
		}
		return map;
	}
	
	
	@RequestMapping(value = "updateAlarmRule")
    public @ResponseBody
	Map<String,Object> updateAlarmRule(AlarmRule alarmRule) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
    		if(alarmRuleService.checkExist(alarmRule)) {
    			map.put("success", false);
    			map.put("msg", "此规则已存在！");
    			return map;
    		}
    		alarmRule.setOperateUser(RequestContextUtil.getCustomUserName());
			alarmRuleService.updateAlarmRule(alarmRule);
			map.put("success", true);
			map.put("msg", "修改成功！");
		} catch (Exception e) {
			map.put("success", false);
			map.put("msg", "修改失败！");
			LOG.error("修改失败",e);
		}
        return map;
    }
	
	
	@RequestMapping(value = "deleteAlarmRule")
    public @ResponseBody
	Map<String,Object> deleteAlarmRule(Long id) {
    	Map<String,Object> map = new HashMap<String, Object>();
    	try {
			alarmRuleService.deleteAlarmRuleById(id);
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
