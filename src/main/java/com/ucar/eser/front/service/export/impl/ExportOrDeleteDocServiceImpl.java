package com.ucar.eser.front.service.export.impl;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ucar.eser.core.bean.po.CustomUser;
import com.ucar.eser.core.bean.vo.query.CondsVo;
import com.ucar.eser.core.bean.vo.query.QueryVo;
import com.ucar.eser.core.jest.result.ParseHandler;
import com.ucar.eser.core.jest.vo.BulkResultItem;
import com.ucar.eser.core.jest.vo.SearchResultDetailVO;
import com.ucar.eser.core.jest.vo.SearchResultVo;
import com.ucar.eser.core.jest.service.JestService;
import com.ucar.eser.core.util.StringUtils;
import com.ucar.eser.core.util.common.Constant;
import com.ucar.eser.front.service.export.ExportOrDeleteDocService;
import com.ucar.eser.front.service.query.impl.QueryPageServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedTransferQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

/**
 * @author forest
 * @create 2017-05-26 11:01
 */

@Service
public class ExportOrDeleteDocServiceImpl implements ExportOrDeleteDocService {

    @Autowired
    private JestService jestService;

    private static final Logger logger = LoggerFactory.getLogger(ExportOrDeleteDocServiceImpl.class);

    private static final AtomicLong idGenerator = new AtomicLong();

    private BlockingQueue<Runnable> transferQueue = new LinkedTransferQueue<Runnable>();

    //最多同时运行10个任务
    private ThreadPoolExecutor executor = new ThreadPoolExecutor(10, 10, 0, TimeUnit.SECONDS, transferQueue);

    volatile Map<String,StatInfo> scrollMaps = new LinkedHashMap<String,StatInfo>();

    @Override
    public void queryAndDelete(final String clusterName, String indexName, Integer maxNum, String conds,HttpServletRequest request) throws Exception {
        assert maxNum != null : "";
        CustomUser customUser = (CustomUser) request.getSession().getAttribute(Constant.CUSTOM_USER_SESSION_NAME);
        executor.execute(new QueryAndDeleteTask(clusterName,indexName,maxNum*10,conds,customUser));
    }

    public void query(String clusterName, String indexName , Integer maxNum,
                      String conds,CustomUser customUser, QueryDocListener queryDocListener) throws Exception {

        String scrollId = "";

        // 第一次查询,获取首页结果和游标
        List<CondsVo> condsVos = JSONArray.parseArray(conds, CondsVo.class);
        QueryVo queryVo = new QueryVo(clusterName, indexName, maxNum);
        queryVo.setConds(condsVos);
        String queryBody = QueryPageServiceImpl.packageQuery(queryVo);
        String resonse = jestService.querySearch(clusterName,queryBody,indexName).getJsonString();
        ParseHandler pH = new RetainDetailParseHandler2();
        SearchResultVo2 resultVo = (SearchResultVo2) pH.parse(JSONObject.parseObject(resonse));

        scrollId = resultVo.getScrollId();
        assert scrollId != null : "scroll 响应出问题了";

        StatInfo statInfo = getScroll(scrollId);

        statInfo.setStatusDesc("first phase finished");

        try {
            statInfo.setTotal(resultVo.getTotal());
            queryDocListener.onQuery(resultVo.getResults(),statInfo);
            if (resultVo.getTotal() <= maxNum) {
                statInfo.setStatusDesc("success,no need scroll");
                return;
            }

            //使用游标接口逐步扫描
            int counter = 0;

            while ( !statInfo.isTerminated() ) {
                counter ++ ;
                String scrollResonse = jestService.searchScroll(clusterName,"1m",scrollId).getJsonString();
                SearchResultVo2 scrollResultVo = (SearchResultVo2) pH.parse(JSONObject.parseObject(scrollResonse));
                if (scrollResultVo.getResults() == null || scrollResultVo.getResults().size() == 0) {//最后一页
                    statInfo.setStatusDesc("success,finish scroll");
                    break;
                }
                statInfo.setStatusDesc("scrolling");
                queryDocListener.onQuery(scrollResultVo.getResults(),statInfo);
                logger.info("第 %s 次通过游标抓取到 %s 条数据,当前进度:",counter,resultVo.getResults().size(),statInfo);
            }
        }catch(Exception e){
            statInfo.setStatusDesc("sth wrong,reason:"+e.getCause());
            throw e;
        } finally {
            assert scrollId != null : "sth wrong";
        }

    }

    public interface QueryDocListener{

        void onQuery(List<SearchResultDetailVO> results, StatInfo statInfo);
    }

    public synchronized StatInfo getScroll(String id){
        if (!scrollMaps.containsKey(id)) {
            scrollMaps.put(id,new StatInfo());
        }
        return scrollMaps.get(id);
    }

    public synchronized String getAllScrollInfo(){

        if (scrollMaps.isEmpty()) {
            return "no running task";
        }

        StringBuffer sb = new StringBuffer();
        for (String sid : scrollMaps.keySet()) {
            sb.append("scrollId:" + sid);
            sb.append("\n");
            sb.append("statinfo:" + scrollMaps.get(sid));
            sb.append("");
            sb.append("\n");
        }
        return sb.toString();
    }

    public class StatInfo{
        private long total;
        private long succ;
        private long fail;
        private long id;
        private volatile String statusDesc = "";
        private volatile boolean terminated = false;
        public StatInfo(){
            this.id = idGenerator.incrementAndGet();
        }
        public long getTotal() {
            return total;
        }

        public void setTotal(long total) {
            this.total = total;
        }

        public long getSucc() {
            return succ;
        }

        public void setSucc(long succ) {
            this.succ = succ;
        }

        public long getFail() {
            return fail;
        }

        public void setFail(long fail) {
            this.fail = fail;
        }

        public void addSucc(int i) {
            this.succ += i;
        }

        public void addFail(int i) {
            this.fail += i;
        }

        public long getId() {
            return id;
        }

        public void setId(long id) {
            this.id = id;
        }

        public String getStatusDesc() {
            return statusDesc;
        }

        public void setStatusDesc(String statusDesc) {
            this.statusDesc = statusDesc;
        }

        @Override
        public String toString() {
            return "StatInfo ==> {" +
                    ", id=" + id +
                    ", statusDesc='" + statusDesc +
                    ", total=" + total +
                    ", succ=" + succ +
                    ", fail=" + fail +
                    ", terminated=" + terminated +
                    '}';
        }

        public boolean isTerminated() {
            return terminated;
        }
        public void setTerminated(boolean terminated) {
            this.terminated = terminated;
        }
    }

    public synchronized boolean terminate(String taskId) {
        assert taskId != null : "";
        for (StatInfo statInfo : scrollMaps.values()) {
            if (taskId.trim().equals(String.valueOf(statInfo.id))) {
                statInfo.setTerminated(true); //线程可见就行
                statInfo.setStatusDesc("be terminated");
                return true;
            }
        }
        return false;
    }

    public synchronized void refreshTaskList() {
        Iterator<String> iterator = scrollMaps.keySet().iterator();
        while (iterator.hasNext()) {
            String sid = iterator.next();
            StatInfo statInfo = scrollMaps.get(sid);
            iterator.remove();
        }
    }

    public class SearchResultVo2 extends SearchResultVo{
        private String scrollId;

        public String getScrollId() {
            return scrollId;
        }

        public void setScrollId(String scrollId) {
            this.scrollId = scrollId;
        }
    }

    public class RetainDetailParseHandler2 extends ParseHandler {

        @Override
        public SearchResultVo parseData(JSONObject json) {

            SearchResultVo2 resultVo = new SearchResultVo2();

            List<SearchResultDetailVO> list = new ArrayList<SearchResultDetailVO>();

            if(json == null) {
                return resultVo;
            }

            resultVo.setOriginalData(json);

            resultVo.setResults(list);

            JSONObject hits = json.getJSONObject(HITS_NAME);

            if(hits == null) {
                return resultVo;
            }

            Integer total = hits.getInteger(TOTAL_NAME);

            if(total != null) {
                resultVo.setTotal(total);
            }

            String scrollId = json.getString("_scroll_id");

            if(scrollId != null) {
                resultVo.setScrollId(scrollId);
            }

            JSONArray results = hits.getJSONArray(HITS_NAME);

            if(results == null) {
                return resultVo;
            }

            for(Object obj : results) {
                JSONObject jb = (JSONObject)obj;
                SearchResultDetailVO detailVo = new SearchResultDetailVO();
                detailVo.setIndex(jb.getString(INDEX_NAME));
                detailVo.setType(jb.getString(TYPE_NAME));
                detailVo.setId(jb.getString(ID_NAME));
                detailVo.setScore(jb.getFloat(SCORE_NAME));
                detailVo.setVersion(jb.getLong(VERSION_NAME));
                String fields = jb.getString(SOURCE_NAME);
                if(fields == null) {
                    fields = jb.getString(FIELDS_NAME);
                }
                detailVo.setResult(fields);
                list.add(detailVo);
            }

            return resultVo;
        }

    }

    class QueryAndDeleteTask implements Runnable {

        String clusterName;
        String indexName;
        Integer maxNum;
        String conds;
        CustomUser customUser;

        public QueryAndDeleteTask(String clusterName, String indexName, Integer maxNum, String conds, CustomUser customUser){
            this.clusterName = clusterName;
            this.indexName = indexName;
            this.maxNum = maxNum;
            this.conds = conds;
            this.customUser = customUser;
        }

        @Override
        public void run() {

            try {
                query(clusterName,indexName,maxNum,conds,customUser,new QueryDocListener(){

                    @Override
                    public void onQuery(List<SearchResultDetailVO> results, StatInfo statInfo) {
                        if (results == null || results.isEmpty()) {
                            return;
                        }

                        try {
                            String delete = jestService.deleteBulk(
                                    clusterName,results.get(0).getIndex(), results.get(0).getType(),results).getJsonString();
                            assert !StringUtils.isBlank(delete) : "删除文档失败,原因是"+delete+" 未返回";
                            JSONObject delResJson = JSONObject.parseObject(delete);

                            BulkRespHandler bulkRespHandler = new BulkRespHandler(delResJson);
                            if (bulkRespHandler.isSucc()) {
                                statInfo.addSucc(bulkRespHandler.getSuccessItems().size());
                            }else{
                                statInfo.addFail(bulkRespHandler.getFailItems().size());
                            }

                        } catch (Exception e) {
                            statInfo.addFail(results.size());
                            throw new RuntimeException(e);
                        }
                    }
                });
            }catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    class BulkRespHandler{

        JSONObject bulkResp;
        private List<BulkResultItem> successItems = new ArrayList<BulkResultItem>();
        private List<BulkResultItem> failItems = new ArrayList<BulkResultItem>();
        boolean succ = false;

        public BulkRespHandler(JSONObject bulkResp) {
            this.bulkResp = bulkResp;
            assert bulkResp != null :"删除文档失败,原因是bulk请求未返回响应";

            Boolean errors = bulkResp.getBoolean("errors");
            assert errors != null : "删除文档失败,原因是bulk响应中没有包含errors节点";
            if (errors) {
                throw new RuntimeException(bulkResp.toString());
            }else{
                this.succ = true;
            }

            if (bulkResp != null && bulkResp.containsKey(ParseHandler.ITEMS_NAME)) {
                for (Object obj : bulkResp.getJSONArray(ParseHandler.ITEMS_NAME)) {
                    JSONObject jso = (JSONObject)obj;
                    for (String key : jso.keySet()) {
                        JSONObject item = jso.getJSONObject(key);
                        if (!item.containsKey(ParseHandler.ERROR_NAME)) { //重复删除的结果是成功,因为服务端不返回error,只是状态码为404,而不是200
                            successItems.add(new BulkResultItem(key, item));
                        } else {
                            failItems.add(new BulkResultItem(key,item));
                        }
                    }
                }
            }
        }

        public boolean isSucc() {
            return succ;
        }

        public List<BulkResultItem> getSuccessItems() {
            return successItems;
        }

        public List<BulkResultItem> getFailItems() {
            return failItems;
        }
    }
}
