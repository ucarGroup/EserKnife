package com.ucar.eser.core.jest.common;



public class EsCloudVoEnum {
	/**
	 * 
	 * Description: 角色枚举
	 * All Rights Reserved.
	 * Created on 2016-9-18 上午11:25:46
	 * @author  孔增（kongzeng@zuche.com）
	 */
	public static enum RoleEnum {
		MONITOR,
		ADMIN,
		GUEST,
	}
	
	/**
	 * 
	 * Description: 产品线枚举
	 * All Rights Reserved.
	 * Created on 2016-9-19 上午11:52:56
	 * @author  孔增（kongzeng@zuche.com）
	 */
	public static enum ProductLineEnum {
		UCAR("ucar"),
		UC("uc"),
		FCAR("fcar"),
		ZUCHE("zuche"),
		LOG("log"),
        LUCKY("lucky"),
		YCC("ycc");

		private String name;
		
		ProductLineEnum(String name) {
			this.name = name;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}
		
	}

}
