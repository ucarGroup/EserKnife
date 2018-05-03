package com.ucar.eser.core.bean;


import com.ucar.eser.core.util.StringUtils;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class User implements Serializable {
    private static final long serialVersionUID = 1728014864193885363L;
    private String userId;
    private String loginId;
    private String userName;
    private String userEmail;
    private String userPwd;
    private String authority;
    private String deptScope;
    private Set deptScopes;
    private String deptScopeBiz;
    private Set deptScopeBizs;
    private String deptScopeComp;
    private Set deptScopeComps;
    private Integer dataAccessS;
    private String cityScopeShort;
    private Integer dataAccessL;
    private Integer dataAccessC;
    private String cityScope;
    private Set cityScopes;
    private String areaScope;
    private Set areaScopes;
    private Integer deptId;
    private Integer cityId;
    private String deptName;
    private String parentDeptId;
    private String rule;
    private Set rules;
    private String[] ruleList;
    private String password;
    private String userTelePhone;
    private String emil;
    private boolean isAdmin;
    private boolean isXUser;
    private boolean isEnbaled;
    private boolean isAuthorityS = false;
    private boolean isAuthorityL = false;
    private boolean isAuthorityC = false;
    private String chainScopeBiz;
    private Set chainScopeBizs;
    private Integer dataAccessChain;
    private boolean isAuthorityChain = false;

    public User() {
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getUserId() {
        return this.userId;
    }

    public Integer getUserIdNum() {
        return StringUtils.parseInt(this.userId);
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLoginId() {
        return this.loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAuthority() {
        return this.authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public String getDeptScope() {
        return this.deptScope;
    }

    public void setDeptScope(String deptScope) {
        this.deptScope = deptScope;
    }

    public Set getDeptScopes() {
        if(this.deptScope == null) {
            return this.deptScopes;
        } else {
            List list = Arrays.asList(this.deptScope.split(","));
            this.deptScopes = new HashSet(list);
            this.deptScopes.clear();
            this.deptScopes.addAll(list);
            return this.deptScopes;
        }
    }

    public void setDeptScopes(Set deptScopes) {
        this.deptScopes = deptScopes;
    }

    public String getCityScope() {
        return this.cityScope;
    }

    public void setCityScope(String cityScope) {
        this.cityScope = cityScope;
    }

    public Set getCityScopes() {
        if(this.cityScope == null) {
            return this.cityScopes;
        } else {
            List list = Arrays.asList(this.cityScope.split(","));
            this.cityScopes = new HashSet(list);
            this.cityScopes.clear();
            this.cityScopes.addAll(list);
            return this.cityScopes;
        }
    }

    public void setCityScopes(Set cityScopes) {
        this.cityScopes = cityScopes;
    }

    public Integer getDeptId() {
        return this.deptId;
    }

    public void setDeptId(Integer deptId) {
        this.deptId = deptId;
    }

    public String getDeptName() {
        return this.deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getParentDeptId() {
        return this.parentDeptId;
    }

    public void setParentDeptId(String parentDeptId) {
        this.parentDeptId = parentDeptId;
    }

    public String getRule() {
        return this.rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }

    public Set getRules() {
        if(this.rule == null) {
            return this.rules;
        } else {
            List list = Arrays.asList(this.rule.split(","));
            this.rules = new HashSet(list);
            this.rules.clear();
            this.rules.addAll(list);
            return this.rules;
        }
    }

    public void setRules(Set rules) {
        this.rules = rules;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUserTelePhone() {
        return this.userTelePhone;
    }

    public void setUserTelePhone(String userTelePhone) {
        this.userTelePhone = userTelePhone;
    }

    public String getEmil() {
        return this.emil;
    }

    public void setEmil(String emil) {
        this.emil = emil;
    }

    public boolean isAdmin() {
        return this.isAdmin;
    }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public boolean isXUser() {
        return this.isXUser;
    }

    public void setXUser(boolean isXUser) {
        this.isXUser = isXUser;
    }

    public boolean isEnbaled() {
        return this.isEnbaled;
    }

    public void setEnbaled(boolean isEnbaled) {
        this.isEnbaled = isEnbaled;
    }

    public String[] getRuleList() {
        return this.ruleList;
    }

    public void setRuleList(String[] ruleList) {
        this.ruleList = ruleList;
    }

    public String getDeptScopeBiz() {
        return this.deptScopeBiz;
    }

    public void setDeptScopeBiz(String deptScopeBiz) {
        this.deptScopeBiz = deptScopeBiz;
    }

    public Set getDeptScopeBizs() {
        if(StringUtils.checkEmpty(this.deptScopeBiz) == null) {
            return this.deptScopeBizs;
        } else {
            List list = Arrays.asList(this.deptScopeBiz.split(","));
            this.deptScopeBizs = new HashSet(list);
            this.deptScopeBizs.clear();
            this.deptScopeBizs.addAll(list);
            return this.deptScopeBizs;
        }
    }

    public void setDeptScopeBizs(Set deptScopeBizs) {
        this.deptScopeBizs = deptScopeBizs;
    }

    public Integer getDataAccessS() {
        return this.dataAccessS;
    }

    public void setDataAccessS(Integer dataAccessS) {
        this.dataAccessS = dataAccessS;
    }

    public Integer getDataAccessL() {
        return this.dataAccessL;
    }

    public void setDataAccessL(Integer dataAccessL) {
        this.dataAccessL = dataAccessL;
    }

    public Integer getCityId() {
        return this.cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    public boolean isAuthorityS() {
        return this.isAuthorityS;
    }

    public void setAuthorityS(boolean isAuthorityS) {
        this.isAuthorityS = isAuthorityS;
    }

    public boolean isAuthorityL() {
        return this.isAuthorityL;
    }

    public void setAuthorityL(boolean isAuthorityL) {
        this.isAuthorityL = isAuthorityL;
    }

    public String getAreaScope() {
        return this.areaScope;
    }

    public void setAreaScope(String areaScope) {
        this.areaScope = areaScope;
    }

    public Set getAreaScopes() {
        if(StringUtils.checkEmpty(this.areaScope) == null) {
            return this.areaScopes;
        } else {
            List list = Arrays.asList(this.areaScope.split(","));
            this.areaScopes = new HashSet(list);
            this.areaScopes.clear();
            this.areaScopes.addAll(list);
            return this.areaScopes;
        }
    }

    public void setAreaScopes(Set areaScopes) {
        this.areaScopes = areaScopes;
    }

    public String getDeptScopeComp() {
        return this.deptScopeComp;
    }

    public void setDeptScopeComp(String deptScopeComp) {
        this.deptScopeComp = deptScopeComp;
    }

    public Set getDeptScopeComps() {
        if(StringUtils.checkEmpty(this.deptScopeComp) == null) {
            return this.deptScopeComps;
        } else {
            List list = Arrays.asList(this.deptScopeComp.split(","));
            this.deptScopeComps = new HashSet(list);
            this.deptScopeComps.clear();
            this.deptScopeComps.addAll(list);
            return this.deptScopeComps;
        }
    }

    public void setDeptScopeComps(Set deptScopeComps) {
        this.deptScopeComps = deptScopeComps;
    }

    public Integer getDataAccessC() {
        return this.dataAccessC;
    }

    public void setDataAccessC(Integer dataAccessC) {
        this.dataAccessC = dataAccessC;
    }

    public boolean isAuthorityC() {
        return this.isAuthorityC;
    }

    public void setAuthorityC(boolean isAuthorityC) {
        this.isAuthorityC = isAuthorityC;
    }

    public String getChainScopeBiz() {
        return this.chainScopeBiz;
    }

    public void setChainScopeBiz(String chainScopeBiz) {
        this.chainScopeBiz = chainScopeBiz;
    }

    public Set getChainScopeBizs() {
        return this.chainScopeBizs;
    }

    public void setChainScopeBizs(Set chainScopeBizs) {
        this.chainScopeBizs = chainScopeBizs;
    }

    public Integer getDataAccessChain() {
        return this.dataAccessChain;
    }

    public void setDataAccessChain(Integer dataAccessChain) {
        this.dataAccessChain = dataAccessChain;
    }

    public boolean isAuthorityChain() {
        return this.isAuthorityChain;
    }

    public void setAuthorityChain(boolean isAuthorityChain) {
        this.isAuthorityChain = isAuthorityChain;
    }

    public String getCityScopeShort() {
        return this.cityScopeShort;
    }

    public void setCityScopeShort(String cityScopeShort) {
        this.cityScopeShort = cityScopeShort;
    }
}
