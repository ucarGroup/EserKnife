package com.ucar.eser.core.bean.vo.query;
/**
 * 
 * Description: 查询条件
 * All Rights Reserved.
 * Created on 2016-10-20 下午6:52:35
 * @author  孔增（kongzeng@zuche.com）
 */
public class CondsVo {
	/**
	 * 逻辑运算符
	 */
	private String OpsType;  //term/match/range/missing
	/**
	 * 域名
	 */
    private String fieldname;
    /**
     * 域值
     */
    private String qText;
    /**
     * 大于比较符
     */
    private String gtOps;
    /**
     * 大于比较值
     */
    private String gtText;
    /**
     * 小于比较符
     */
    private String ltOps;
    /**
     * 小于比较值
     */
    private String ltText;
    
    private String logicOps;
    
	  
	public String getFieldname() {
		return fieldname;
	}
	
	public void setFieldname(String fieldname) {
		this.fieldname = fieldname;
	}
	
	public String getOpsType() {
		return OpsType;
	}
	
	public void setOpsType(String OpsType) {
		this.OpsType = OpsType;
	}
	
	public String getQText() {
		return qText;
	}
	
	public void setQText(String qText) {
		this.qText = qText;
	}
	
	public String getGtText() {
		return gtText;
	}
	
	public void setGtText(String gtText) {
		this.gtText = gtText;
	}
	
	public String getLtText() {
		return ltText;
	}
	
	public void setLtText(String ltText) {
		this.ltText = ltText;
	}
	
	public String getGtOps() {
		return gtOps;
	}
	
	public void setGtOps(String gtOps) {
		this.gtOps = gtOps;
	}
	
	public String getLtOps() {
		return ltOps;
	}
	
	public void setLtOps(String ltOps) {
		this.ltOps = ltOps;
	}

	public String getqText() {
		return qText;
	}

	public void setqText(String qText) {
		this.qText = qText;
	}

	public String getLogicOps() {
		return logicOps;
	}

	public void setLogicOps(String logicOps) {
		this.logicOps = logicOps;
	}
	
	
	  

}
