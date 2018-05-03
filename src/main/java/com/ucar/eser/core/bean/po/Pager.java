package com.ucar.eser.core.bean.po;

/**
 * @author forest
 * @create 2016-11-02 16:42
 */
public class Pager {

    private int pagenum = 0;

    private int pagesize = 20;

    private int filterscount = 0;

    private int groupscount = 0;

    private int recordstartindex = 0;

    private int recordendindex = 20;

    public int getPagenum() {
        return pagenum;
    }

    public void setPagenum(int pagenum) {
        this.pagenum = pagenum;
    }

    public int getPagesize() {
        return pagesize;
    }

    public void setPagesize(int pagesize) {
        this.pagesize = pagesize;
    }

    public int getFilterscount() {
        return filterscount;
    }

    public void setFilterscount(int filterscount) {
        this.filterscount = filterscount;
    }

    public int getGroupscount() {
        return groupscount;
    }

    public void setGroupscount(int groupscount) {
        this.groupscount = groupscount;
    }

    public int getRecordstartindex() {
        return recordstartindex;
    }

    public void setRecordstartindex(int recordstartindex) {
        this.recordstartindex = recordstartindex;
    }

    public int getRecordendindex() {
        return recordendindex;
    }

    public void setRecordendindex(int recordendindex) {
        this.recordendindex = recordendindex;
    }
}
