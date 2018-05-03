package com.ucar.eser.front.controller.indexmsg;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.google.common.base.Splitter;
import com.google.common.base.Throwables;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.ucar.eser.admin.service.datasource.DataSourceService;
import com.ucar.eser.core.bean.po.DataSourceInfo;
import com.ucar.eser.core.bean.vo.datasource.TableColAndTyInfo;
import com.ucar.eser.core.init.SpringInit;
import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.jest.service.JestService;
import com.ucar.eser.core.util.SqlParseUtil;
import com.ucar.eser.core.util.StringUtils;
import com.ucar.eser.core.util.http.SimpleHttpClient;
import io.searchbox.client.JestClient;
import io.searchbox.client.JestResult;
import io.searchbox.indices.CreateIndex;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

@Controller
@RequestMapping("/indexmsg/")
public class IndexMsgController {

    private static final Logger LOGGER = LoggerFactory.getLogger(IndexMsgController.class);

    @Autowired
    private JestService jestService;

    @Autowired
    private DataSourceService dataSourceService;


    @RequestMapping(value = "/indexManager")
    @ResponseBody
    public Object indexManager(@RequestParam("clusterName") String clusterName,
                           @RequestParam(value="data",required=false) String data,
                           @RequestParam("url") String url,
                           @RequestParam("method") String method) {
        String json =null;
        try {
            JestResult result = (JestResult) jestService.httpProxy(clusterName,url,method,data);
            if(result != null){
                json = result.getJsonString();
            }
        } catch (Exception e) {
            LOGGER.error("index manager error:",e);
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("msg:",e);
            return jsonObject;
        }
        return (Map<String, Map<String, String>>) JSON.parse(json);
    }




    @RequestMapping(value = "/delIndex")
    @ResponseBody
    public Object delIndex(
           @RequestParam("clusterName") String clusterName,
           @RequestParam("indexName") String indexName
    ){
        Map<String, Object> map = Maps.newHashMap();
        try {
            String respStr = jestService.delIndex(clusterName,indexName).getJsonString();
            if ("{\"acknowledged\":true}".equals(respStr)) {
                map.put("sucMsg", "删除索引 "+indexName+" 操作成功");
                map.put("code", "0");
            } else {
                map.put("errMsg", "删除索引失败,错误详情:\n"+ respStr);
                LOGGER.error("删除索引{}失败,详情:{}",indexName,respStr);
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("errMsg", "删除索引失败,错误详情:\n"+ Throwables.getStackTraceAsString(e));
        }
        return map;
    }

    @RequestMapping(value = "/settingIndex")
    @ResponseBody
    public Object settingIndex(
              @RequestParam("clusterName") String clusterName,
              @RequestParam("indexName") String indexName,
              @RequestParam("settings") String settings
    ){
        Map<String, Object> map = Maps.newHashMap();
        try {
            String settingsJson = new String(Base64.decodeBase64(settings.getBytes("UTF-8")),"UTF-8");
            String respStr = jestService.settingUpdate(clusterName,indexName,settingsJson).getJsonString();
            if ("{\"acknowledged\":true}".equals(respStr)) {
                map.put("code", "0");
                map.put("sucMsg", "更新 "+indexName+" 配置成功");
            } else {
                LOGGER.error("更新{}配置失败,详情:{}",indexName,respStr);
                map.put("errMsg", "更新配置失败,错误详情:\n"+ respStr);
            }
        } catch (Exception e) {
            e.printStackTrace();
            map.put("errMsg", "更新配置失败,错误详情:\n"+ Throwables.getStackTraceAsString(e));
        }
        return map;
    }

    @RequestMapping(value = "/addNewIndex")
    @ResponseBody
    public Object addNewIndex(@RequestParam("clusterName") String clusterName,
                             @RequestParam("indexName") String indexName,
                              @RequestParam("settings") String settings) {
        Map<String, Object> map = Maps.newHashMap();
        try {
            JestClient jestClient = JestManager.getJestClient(clusterName);
            /*IndicesExists indicesExists = new IndicesExists.Builder(indexName).build();
            JestResult jestResult = jestClient.execute(indicesExists);
            if(!jestResult.isSucceeded()){*/
                CreateIndex createIndex = new CreateIndex.Builder(indexName).settings(settings).build();
                JestResult result = jestClient.execute(createIndex);
                if(result.isSucceeded()){
                    map.put("success",true);
                }else{
                    map.put("errMsg", result.getErrorMessage());
                }
           /* }else{
                map.put("exist",true);
            }*/
        } catch (Exception e) {
            LOGGER.error("添加索引失败:",e);
            e.printStackTrace();
            map.put("errMsg", "添加失败,请联系管理员");
        }
        return map;
    }

    private String getReqBody(String mapping,
                              Integer shardNum,
                              Integer replicaNNum) {
        String settings =
                String.format("\"settings\":{\n" +
                        "\t\"number_of_shards\":%s,\n" +
                        "\t\"number_of_replicas\":%s\n" +
                        "}",shardNum,replicaNNum);

        String body;
        if (!StringUtils.isBlank(mapping)) {
            //加载目标索引的映射
            body = settings + "," + String.format("\"mappings\":%s",mapping);
        }else{
            body = settings;
        }
        return String.format("{%s,%s}", settings, body);
    }


    @RequestMapping(value = "/addNewCols")
    @ResponseBody
    public Object addNewCols(
          @RequestParam("clusterName") String clusterName,
          @RequestParam("indexName") String indexName,
          @RequestParam("typeName") String typeName,
          @RequestParam("newColsJson") String newColsJson) {
        Map<String, Object> map = Maps.newHashMap();
        try {
            //执行添加
            String respStr = jestService.addType(clusterName,indexName,typeName,newColsJson).getJsonString();
            if ("{\"acknowledged\":true}".equals(respStr)) {
                map.put("sucMsg", "添加字段成功");
                map.put("code", "0");
            } else {
                map.put("errMsg", "添加字段失败:"+respStr);

            }
        } catch (Exception e) {
            map.put("errMsg", "添加字段失败,请联系管理员");
            LOGGER.error("添加字段失败{}",e.getMessage());
        }
        return map;
    }


    @RequestMapping(value = "/reindex")
    @ResponseBody
    public Object reIndex(
            @RequestParam("clusterName") String clusterName,
            @RequestParam("newColsJson") String newColsJson) {
        String execute =null;
        try {
            JestResult result = (JestResult) jestService.httpProxy(clusterName,"/_reindex","POST",newColsJson);
            if(result != null){
               execute = result.getJsonString();
            }
        } catch (Exception e) {
            LOGGER.error("添加字段失败:",e);
        }
        return JSON.parse(execute);
    }



    @RequestMapping(value = "/importIndex")
    @ResponseBody
    public Object importIndex(@RequestParam("clusterName") String clusterName,
                              @RequestParam("clusterAddr") String clusterAddr,
                              @RequestParam("userpass") String userpass,
                              @RequestParam("indices") String indices
    ) {
        Map<String, Object> map = Maps.newHashMap();
        HashSet<String> succ = Sets.newHashSet();
        HashSet<String> fail = Sets.newHashSet();

        List<Map> indicesList = JSON.parseArray(indices, Map.class);

        for (Map eachIndex : indicesList) {
            String index_name = (String) eachIndex.get("index_name");
            Integer shard_num = Integer.valueOf((String) eachIndex.get("shard_num"));
            Integer replica_num = Integer.valueOf((String) eachIndex.get("replica_num"));
            String indexMapping = "";

            String url;
            String path4Mapping = "/"+index_name+"/_mapping";
            if (StringUtils.isBlank(userpass)) {
                url = "http://"+ clusterAddr + path4Mapping;
            }else{
                url = "http://"+ userpass + "@" + clusterAddr + path4Mapping;
            }

            try {
                String mappingResp = SimpleHttpClient.get(url);
                Map<String, JSONObject> mapping = (Map<String, JSONObject>) JSON.parse(mappingResp);
                if (mapping != null && mapping.get(index_name) != null && mapping.get(index_name).get("mappings") != null) {
                    indexMapping = mapping.get(index_name).get("mappings").toString();
                }

                if (!StringUtils.isBlank(indexMapping)) {
                    String reqBody = getReqBody(indexMapping,shard_num,replica_num);
                    JestResult re = (JestResult) jestService.httpProxy(clusterName,"/"+index_name,"PUT", reqBody);
                    String respStr = re.getJsonString();
                    if ("{\"acknowledged\":true}".equals(respStr)) {
                        createAliasIfNeed(clusterName,clusterAddr,userpass,index_name);
                        succ.add(index_name);
                    } else {
                        fail.add(index_name);
                        LOGGER.error("创建索引{}失败,详情:{}",index_name,respStr);
                    }
                }

            } catch (Exception e) {
                e.printStackTrace();
                map.put("errMsg", "添加失败,错误详情:\n"+ Throwables.getStackTraceAsString(e));
                fail.add(index_name);
            }
        }

        if (fail.size() > 0) {
            map.put("errMsg", String.format("%s个索引添加成功,%s个索引添加失败",succ.size(),fail.size()));
        }else{
            map.put("sucMsg", "成功添加"+succ.size()+"个索引");
            map.put("code", "0");
        }
        return map;
    }

    private void createAliasIfNeed(String clusterName, String clusterAddr, String userpass, String index_name) {
        String aliasGetUrl = "";
        if (StringUtils.isBlank(userpass)) {
            aliasGetUrl = "http://"+ clusterAddr + "/" + index_name + "/_aliases";
        }else{
            aliasGetUrl = "http://"+ userpass + "@" + clusterAddr + "/" + index_name + "/_aliases";
        }
        try {
            String aliasResp = SimpleHttpClient.get(aliasGetUrl);
            Map<String, JSONObject> aliasMap = (Map<String, JSONObject>) JSON.parse(aliasResp);
            if (aliasMap != null && aliasMap.get(index_name) != null && aliasMap.get(index_name).get("aliases") != null) {
                JSONObject aliases = (JSONObject) aliasMap.get(index_name).get("aliases");
                Object[] aliasTmps = aliases.entrySet().toArray();
                if (aliasTmps.length > 0) {
                    Map.Entry aliasEntry = (Map.Entry) aliasTmps[0];
                    String realAlias = (String) aliasEntry.getKey();
                    String aliasPutUrl = "/" + index_name + "/_aliases" + "/" + realAlias;
                    JestResult resp4PutAlias = (JestResult) jestService.httpProxy(clusterName,aliasPutUrl,"PUT",null);
                    if (!"{\"acknowledged\":true}".equals(resp4PutAlias.getJsonString())){
                        throw new Exception(String.format("索引 %s 已同步,但创建别名 %s 失败",index_name,realAlias));
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


    }


    @RequestMapping(value = "/getIndexList")
    @ResponseBody
    public Object getIndexList(@RequestParam("clusterName") String clusterName,
                               @RequestParam("clusterAddr") String clusterAddr,
                               @RequestParam("userpass") String userpass
    ) {
        Map<String, Object> map = Maps.newHashMap();

        String catIndices = "/_cat/indices/";
        String url;
        if (StringUtils.isBlank(userpass)) {
            url = "http://"+ clusterAddr + catIndices;
        }else{
            url = "http://"+ userpass + "@" + clusterAddr + catIndices;
        }

        try {
            String remoteIndexInfoJson = SimpleHttpClient.get(url);
            List<Map<String,String>> remoteMapping = parse2Index(remoteIndexInfoJson);

            JestResult respStr = (JestResult) jestService.httpProxy(clusterName,catIndices,"GET","");
            List<Map<String,String>> indexs = parse2Index(respStr.getJsonString());

            List<Map<String, String>> results = geDistinctIndices(remoteMapping, indexs);

            map.put("code", "0");
            map.put("sucMsg", results);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("errMsg", "添加失败,错误详情:\n"+ Throwables.getStackTraceAsString(e));
        }
        return map;
    }


    /**
     * 去掉本地不存在的索引
     * @param remoteMapping 地址
     * @param indexs s索引
     */
    private List<Map<String, String>> geDistinctIndices(List<Map<String, String>> remoteMapping, List<Map<String, String>> indexs) {
        List<Map<String,String>> results = Lists.newArrayList();
        for (Map<String, String> remoteMap : remoteMapping) {
            String remoteIndexname = remoteMap.get("index_name");
            boolean exist = false;
            for (Map<String, String> localIndex : indexs) {
                if (remoteIndexname.equals(localIndex.get("index_name"))) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                continue;
            }
            results.add(remoteMap);
        }
        return results;
    }

    private List<Map<String, String>> parse2Index(String remoteIndexInfoJson) {
        Pattern pattern = Pattern.compile("[ ]+");
        List<Map<String,String>> indexs = Lists.newArrayList();
        if (!StringUtils.isBlank(remoteIndexInfoJson)) {
            Iterable<String> iterator2= Splitter.on("\n").omitEmptyStrings().split(remoteIndexInfoJson);
            for(String eachLine: iterator2) {
                String[] splitCol = pattern.split(eachLine);
                Map<String,String> indexInfo = ImmutableMap.of(
                        "index_name",splitCol[2],
                        "shard_num",splitCol[3],
                        "replica_num",splitCol[4]
                );
                indexs.add(indexInfo);
            }
        }
        return indexs;
    }

    @RequestMapping(value = "/addNewType")
    @ResponseBody
    public Object addNewType(
          @RequestParam("clusterName") String clusterName,
          @RequestParam("indexName") String indexName,
          @RequestParam("typeName") String typeName,
          @RequestParam("newColsJson") String newColsJson) {
        Map<String, Object> map = Maps.newHashMap();
        try {
            String respStr = jestService.addType(clusterName,indexName,typeName,newColsJson).getJsonString();
            if ("{\"acknowledged\":true}".equals(respStr)) {
                map.put("sucMsg", "添加类型成功");
                map.put("code", "0");
            } else {
                map.put("errMsg", "添加类型失败:"+respStr);
            }
        } catch (Exception e) {
            LOGGER.error("添加类型失败:",e);
            map.put("errMsg", "添加类型失败,请联系管理员");
            e.printStackTrace();
        }
        return map;
    }

    @RequestMapping(value = "/getDataSource")
    @ResponseBody
    public Object getTabNames() {
        Map<String, Object> map = Maps.newHashMap();
        List<DataSourceInfo> dataSourceInfos = dataSourceService.getList();
        map.put("result",dataSourceInfos);
        return map;
    }

    @RequestMapping(value = "/getTabNamesByDs")
    @ResponseBody
    public Object getTabNamesByDs(@RequestParam("dsId") Long dsId) {
        DataSourceInfo dataSourceInfo = dataSourceService.getDataSourceInfo(dsId);
        Map<String, Object> map = Maps.newHashMap();
        List<Map<String, Object>> tabNames = Lists.newArrayList();
        if(dataSourceInfo != null){
            List<String> tables = DatabaseUtil.getTableNames(dataSourceInfo.getDataSourceUrl(),dataSourceInfo.getDataSourceUserName(),dataSourceInfo.getDataSourceUserPwd());
            for (String name:tables){
                Map<String, Object> reMap = Maps.newHashMap();
                reMap.put("name", name);
                tabNames.add(reMap);
            }
        }
        map.put("result", tabNames);
        return map;
    }

    @RequestMapping(value = "/getColInfoByTabname")
    @ResponseBody
    public Object getColInfoByTabname(@RequestParam(value="dsId",required=false) Long dsId,
                                  @RequestParam(value="tabName",required = false) String tabName,
                                      @RequestParam(value = "clusterName",required = false) String clusterName ) {
        Map<String, Object> map = Maps.newHashMap();
        List<Map<String,String>> dbColNames = Lists.newArrayList();
        if (!StringUtils.isBlank(tabName)) {
            DataSourceInfo dataSourceInfo = dataSourceService.getDataSourceInfo(dsId);
            if(dataSourceInfo != null){
                List<TableColAndTyInfo> tableColAndTyInfos = DatabaseUtil.getColumnNamesAndTypes(tabName,dataSourceInfo.getDataSourceUrl(),dataSourceInfo.getDataSourceUserName(),dataSourceInfo.getDataSourceUserPwd());
                if(CollectionUtils.isNotEmpty(tableColAndTyInfos)){

                    int versionFirst = getVersionFirst(clusterName);
                    for (TableColAndTyInfo tableCol: tableColAndTyInfos) {
                        Map<String,String> col = Maps.newHashMap();
                        col.put("db_colname",tableCol.getColumnName());
                        if(versionFirst >= 5 ){
                            col.put("db_colname_def","keyword");
                        }else{
                            col.put("db_colname_def",tableCol.getColumnType());
                        }
                        dbColNames.add(col);
                    }
                }
            }
            map.put("dbColNames", dbColNames);
        }else{
            map.put("dbColNames", Lists.newArrayList());

        }
        return map;
    }

    public  int getVersionFirst(String clusterName) {
        int versionFirst = 0;
        if(jestService == null) jestService = (JestService) SpringInit.getApplicationContext().getBean("jestServiceImpl");
        JestResult result = jestService.getNoteSomInfo(clusterName,2);
        JSONObject json = JSONObject.parseObject(result.getJsonString());
        if(json != null) {
            JSONObject nodes = (JSONObject) json.get("nodes");
            if (nodes != null) {
                Iterator<Map.Entry<String, Object>> nodeItor = nodes.entrySet().iterator();
                do {
                    Map.Entry<String, Object> entry = nodeItor.next();
                    JSONObject node = (JSONObject) entry.getValue();
                    String version = (String) node.get("version");
                    versionFirst = Integer.parseInt(version.split("\\.")[0]);
                } while (false);
            }
        }
        return versionFirst;
    }

    @RequestMapping(value = "/getDemoData")
    @ResponseBody
    public Object getColInfoByTabname() {

        Map<String, Object> map = Maps.newHashMap();
        List<Map<String,String>> demoDatas = Lists.newArrayList();
        Map<String,String> col1 = Maps.newHashMap();
        col1.put("demo_type","string");
        col1.put("demo_flag","1");
        col1.put("demo_remark","stirng 类型");
        demoDatas.add(col1);

        Map<String,String> col2 = Maps.newHashMap();
        col2.put("demo_type","long");
        col2.put("demo_flag","1");
        col2.put("demo_remark","long 类型");
        demoDatas.add(col2);

        Map<String,String> col3 = Maps.newHashMap();
        col3.put("demo_type","date");
        col3.put("demo_flag","1");
        col3.put("demo_remark","date 类型");
        demoDatas.add(col3);
        map.put("result", demoDatas);
        return map;
    }


    @RequestMapping(value = "/parseSql")
    @ResponseBody
    public Object parseSql(@RequestParam("sql") String sql,@RequestParam("clusterName") String clusterName){
        Map<String, Object> map = Maps.newHashMap();
        int versionFirst = getVersionFirst(clusterName);
        Map<String, Object> sqlMap = SqlParseUtil.parseTnameAndColsFromSql(sql,versionFirst);
        map.put("sucMsg", sqlMap);
        map.put("code", "0");
        return map;
    }

}

