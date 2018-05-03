package com.ucar.eser.core.bean.po;


import java.io.Serializable;
import java.util.List;


/**
 * 查询收藏主要条件
 * @author wangjiulin
 *
 */
public class QueryCollectionInfo implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String name;//收藏名称
	
	private String index;//索引
	
	private Integer count;//抓取条数
	
	private String clusterName;//集群名称
	
	private String createTime;
	
	private String userName;//用户名
	
	private Integer state;//1有效 ，0 无效
	
	private List<QueryCollectionSubInfo> queryCollectionSubInfos;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getClusterName() {
		return clusterName;
	}

	public void setClusterName(String clusterName) {
		this.clusterName = clusterName;
	}

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<QueryCollectionSubInfo> getQueryCollectionSubInfos() {
		return queryCollectionSubInfos;
	}

	public void setQueryCollectionSubInfos(
			List<QueryCollectionSubInfo> queryCollectionSubInfos) {
		this.queryCollectionSubInfos = queryCollectionSubInfos;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}
	
}
