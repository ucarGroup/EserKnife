package com.ucar.eser.core.bean.po;


import java.io.Serializable;


/**
 * 查询收藏附属条件
 * @author wangjiulin
 *
 */
public class QueryCollectionSubInfo implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private Long qcId; //主条件id
	
	private String logicCondition;//与或非逻辑条件
	
	private String logicVal;//选择字段
	
	private String condition;//条件
	
	private String conVal;//文本条件
	
	private String conGt;//大于 或 大于等于
	
	private String  conLt;//小于
	
	private String conGtTime;//大于的时间点
	
	private String conLtTime;//小于的时间点
	
	private Integer level;//顺序

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getQcId() {
		return qcId;
	}

	public void setQcId(Long qcId) {
		this.qcId = qcId;
	}

	public String getLogicCondition() {
		return logicCondition;
	}

	public void setLogicCondition(String logicCondition) {
		this.logicCondition = logicCondition;
	}

	public String getLogicVal() {
		return logicVal;
	}

	public void setLogicVal(String logicVal) {
		this.logicVal = logicVal;
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getConVal() {
		return conVal;
	}

	public void setConVal(String conVal) {
		this.conVal = conVal;
	}

	public String getConGt() {
		return conGt;
	}

	public void setConGt(String conGt) {
		this.conGt = conGt;
	}

	public String getConLt() {
		return conLt;
	}

	public void setConLt(String conLt) {
		this.conLt = conLt;
	}

	public String getConGtTime() {
		return conGtTime;
	}

	public void setConGtTime(String conGtTime) {
		this.conGtTime = conGtTime;
	}

	public String getConLtTime() {
		return conLtTime;
	}

	public void setConLtTime(String conLtTime) {
		this.conLtTime = conLtTime;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}
	

}
