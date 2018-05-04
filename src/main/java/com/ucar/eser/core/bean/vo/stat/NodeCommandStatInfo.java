package com.ucar.eser.core.bean.vo.stat;


import java.io.Serializable;


/**
 * 
 * Description: 节点纬度命令统计信息
 * All Rights Reserved.
 * Created on 2016-10-25 下午2:59:15
 */
public class NodeCommandStatInfo extends CommandStatInfo implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -245333980769435122L;
	
    /**
     * 所属结点ip
     */
	private String nodeHost;

	public String getNodeHost() {
		return nodeHost;
	}

	public void setNodeHost(String nodeHost) {
		this.nodeHost = nodeHost;
	}

	
	
}
