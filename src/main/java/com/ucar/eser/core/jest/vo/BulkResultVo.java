package com.ucar.eser.core.jest.vo;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.ucar.eser.core.jest.result.ParseHandler;
import com.ucar.eser.core.util.exception.ElasticSearchException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BulkResultVo implements Serializable {
    private static final Logger LOGGER = LoggerFactory.getLogger(BulkResultVo.class);
    //总执行结果
    public boolean isSuccess =  false;
    //原始json串
    private String jsonString;
    //返回结果json对象
    private JSONObject jsonObject;
    //失败的条目
    private List<BulkResultItem> failItems = new ArrayList<BulkResultItem>();
    //成功条目
    private List<BulkResultItem> successItems = new ArrayList<BulkResultItem>();

    private Map<String,BulkResultItem> successMap = new HashMap<String,BulkResultItem>();

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean isSuccess) {
        this.isSuccess = isSuccess;
    }

    public String getJsonString() {
        return jsonString;
    }

    public void setJsonString(String jsonString) {
        this.jsonString = jsonString;
    }

    public JSONObject getJsonObject() {
        return jsonObject;
    }

    public void setJsonObject(JSONObject jsonObject) {
        this.jsonObject = jsonObject;
    }

    public List<BulkResultItem> getFailItems() {
        if(isSuccess || failItems.size() > 0) {
            return failItems;
        }

        if (jsonObject != null && jsonObject.containsKey(ParseHandler.ITEMS_NAME)) {
            for (Object obj : jsonObject.getJSONArray(ParseHandler.ITEMS_NAME)) {
                JSONObject jso = (JSONObject)obj;
                for (String key : jso.keySet()) {
                    JSONObject item = jso.getJSONObject(key);
                    if (item.containsKey(ParseHandler.ERROR_NAME)) {
                        failItems.add(new BulkResultItem(key,item));
                    }
                }
            }
        }

        return failItems;
    }

    public List<BulkResultItem> getSuccessItems() {
        if(successItems.size() > 0) {
            return successItems;
        }

        if (jsonObject != null && jsonObject.containsKey(ParseHandler.ITEMS_NAME)) {
            for (Object obj : jsonObject.getJSONArray(ParseHandler.ITEMS_NAME)) {
                JSONObject jso = (JSONObject)obj;
                for (String key : jso.keySet()) {
                    JSONObject item = jso.getJSONObject(key);
                    if (!item.containsKey(ParseHandler.ERROR_NAME)) {
                        BulkResultItem itemVo = new BulkResultItem(key,item);
                        successItems.add(itemVo);
                        //冗余一份，便于查询
                        String itemKey = itemVo.getIndex()+"|"+itemVo.getType()+"|"+itemVo.getId()+"|"+itemVo.getAction();
                        successMap.put(itemKey, itemVo);
                    }
                }
            }
        }

        return successItems;
    }

    /**
     *
     * Description: 校验是否有失败的操作
     * Created on 2017-1-3 下午9:45:47
     * @author  孔增（kongzeng@zuche.com）
     */
    public void checkFailed() {
        if (jsonObject != null && jsonObject.containsKey(ParseHandler.ITEMS_NAME)) {
            for (Object obj : jsonObject.getJSONArray(ParseHandler.ITEMS_NAME)) {
                JSONObject jso = (JSONObject)obj;
                for (String key : jso.keySet()) {
                    JSONObject item = jso.getJSONObject(key);
                    JSONObject shards = item.getJSONObject(ParseHandler.SHARD_NAME);
                    if(shards == null) {
                        continue;
                    }
                    Integer failed = shards.getIntValue(ParseHandler.FAILED_NAME);
                    if(failed > 0) {
                        throw new ElasticSearchException(item.toJSONString());
                    }
                }
            }
        }

    }


    /**
     * 获取已成功执行的操作,并封装成对外同步对象
     * @param vo
     * @param contents
     * @return
     */
    public List<EsSynDetailVo> getESSynVoList(BatchDocVo vo, List<BatchContentVo> contents){

        List<EsSynDetailVo> syncList = new ArrayList<EsSynDetailVo>();

        try {
            getSuccessItems();
        } catch (Exception e) {
            LOGGER.error("获取成功数据异常！");
            return syncList;
        }

        for(BatchContentVo bcv : contents) {
            try {
                String index = bcv.getIndex() == null ? vo.getIndex():bcv.getIndex();
                String type = bcv.getType() == null ? vo.getType():bcv.getType();
                String key =  index+"|"+type+"|"+bcv.getId()+"|"+bcv.getBatchActionEnum().getName();
                BulkResultItem itemVo = successMap.get(key);
                if(itemVo == null) {
                    continue;
                }
                String content = null;
                if(bcv.isRetainNullValue()) {
                    content = JSONObject.toJSONString(bcv.getContent(), SerializerFeature.WriteMapNullValue);
                }else {
                    content = JSONObject.toJSONString(bcv.getContent());
                }
                EsSynDetailVo svo = new EsSynDetailVo(itemVo.getRealAction(), index, type, itemVo.getId(), content);
                syncList.add(svo);
            } catch (Exception e) {
                LOGGER.error("拼装同步数据异常:"+bcv);
            }
        }
        return syncList;
    }
}
