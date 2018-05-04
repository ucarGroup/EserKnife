package com.ucar.eser.core.bean.vo.query;

import java.util.List;

/**
 * 
 * Description: 查询请求体
 * All Rights Reserved.
 * Created on 2016-10-20 下午6:52:10
 */
public class QueryVo {
	
	private String clusterName;
	
	private String indexName;
	
	private int maxNum = 20;
	
	private List<CondsVo> conds;
	
	public QueryVo(String clusterName, String indexName , Integer maxNum) {
		this.clusterName = clusterName;
		this.indexName = indexName;
		this.maxNum = maxNum;
	}
	
	public QueryVo() {
	}

	

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getIndexName() {
		return indexName;
	}

	public void setIndexName(String indexName) {
		this.indexName = indexName;
	}

	public int getMaxNum() {
		return maxNum;
	}

	public void setMaxNum(int maxNum) {
		this.maxNum = maxNum;
	}

	public List<CondsVo> getConds() {
		return conds;
	}

	public void setConds(List<CondsVo> conds) {
		this.conds = conds;
	}
	
}
