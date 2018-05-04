package com.ucar.eser.core.bean.vo.alarm;

import java.io.Serializable;
import java.util.Date;

/**
 * 
 * Description: 报警信息vo
 * All Rights Reserved.
 * Created on 2016-12-7 下午3:41:56
 */
public class AlarmInfo implements Serializable{

	private static final long serialVersionUID = -6089475876291402158L;
	
	/**
	 * 对象创建时间
	 */
	private Date createTime = new Date();

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
