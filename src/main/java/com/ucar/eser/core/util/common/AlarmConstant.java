package com.ucar.eser.core.util.common;

import java.util.ArrayList;
import java.util.List;


public class AlarmConstant {
	
	public static List<String> emails  = new ArrayList<String>();
	public static List<String> mobiles  = new ArrayList<String>();
	
	static {// 默认手机号 邮箱
		emails.add("");
		mobiles.add("");
	}
	
	/**
	 * 
	 * Description: 产品线枚举
	 * All Rights Reserved.
	 * Created on 2016-9-19 上午11:52:56
	 */
	public static enum AlarmLatitudeEnum {
		JVM("jvm"),
		CPU("cpu"),
		HEALTH("health"),
		DISK("disk"),
		THREAD_QUEUE("thread_queue");
		//NODE_CONNECT("node_connect");

		private String name;

		AlarmLatitudeEnum(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	}



	public static enum AlarmLatitudeSubEnum {
		JVM("jvm","oldMemUsed,yongMemUsed"),
		CPU("cpu","memUsed,loadAverage"),
		HEALTH_CHECK("health","healthCheck"),
		DISK("disk","freePercent,usedPercent"),
		THREAD_QUEUE("thread_queue","search,index,refresh,bulk");
		//NODE_CONNECT("node_connect","");

		private String name;

		private String value;

		AlarmLatitudeSubEnum(String name,String value) {
			this.name = name;
			this.value=value;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public static String getValueByName(String name){
			String value = null;
			for(AlarmLatitudeSubEnum alarmLatitudeSubEnum:AlarmLatitudeSubEnum.values()){
				if(alarmLatitudeSubEnum.getName().equals(name)){
					value = alarmLatitudeSubEnum.getValue();
					break;
				}
			}
			return value;
		}
	}

	public static enum AlarmLatitudeSubSplitEnum {
		JVM_OLD_MEM_USED("oldMemUsed"),
		JVM_YONG_MEM_USED("yongMemUsed"),
		CPU_MEM_USED("memUsed"),
		CPU_MEM_FREE("memFree"),
		CPU_LOAD_AVERAGE("loadAverage"),
		DISK_FREE("freePercent"),
		DISK_USED("usedPercent"),
		HEALTH_CHECK("health");

		private String name;

		AlarmLatitudeSubSplitEnum(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

	}


	//需要监控 的线程池类型
	public static final String[] THREAD_TYPES = new String[]{"bulk","index","search","get"};
	
    //报警模版
	public static final String JVM_OLD_ALARM_TEMPLATE = "节点（{0}）jvm老生代占比使用过高，当前已使用{1}%";
	public static final String JVM_YONG_ALARM_TEMPLATE = "节点（{0}）jvm新生代占比使用过高，当前已使用{1}%";
	public static final String JVM_ALARM_TEMPLATE = "节点（{0}）jvm内存使用过高，当前已使用{1}%";
	public static final String CPU_ALARM_TEMPLATE = "节点（{0}）cpu使用过高，当前已使用{1}%";
	public static final String LOAD_ALARM_TEMPLATE = "节点（{0}）cpu负载过高，当前负载为{1}%";
	public static final String SWAP_ALARM_TEMPLATE = "节点（{0}）swap使用过高，当前已使用{1}%";
	public static final String THREAD_QUEUE_TEMPLATE = "节点（{0}）线程key任务队列等待任务数已达{1}";
	public static final String DISK_USED_TEMPLATE = "节点（{0}）disk使用过高，当前使用占比为{1}";
	public static final String DISK_FREE_TEMPLATE = "节点（{0}）disk使用过高，当前空闲占比为{1}";
}
