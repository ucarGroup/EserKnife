package com.ucar.eser.core.jest.service.impl;

import com.ucar.eser.core.jest.JestManager;
import com.ucar.eser.core.jest.common.JestLocalHttpClient;
import com.ucar.eser.core.jest.service.JestService;
import com.ucar.eser.core.jest.vo.SearchResultDetailVO;
import io.searchbox.client.JestResult;
import io.searchbox.cluster.*;
import io.searchbox.core.Bulk;
import io.searchbox.core.Delete;
import io.searchbox.core.Search;
import io.searchbox.core.SearchScroll;
import io.searchbox.indices.DeleteIndex;
import io.searchbox.indices.Stats;
import io.searchbox.indices.aliases.GetAliases;
import io.searchbox.indices.mapping.GetMapping;
import io.searchbox.indices.mapping.PutMapping;
import io.searchbox.indices.settings.UpdateSettings;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 *
 * Created by wangjiulin on 2017/10/27.
 */
@Service
public class JestServiceImpl  implements JestService{

    private static final Logger LOGGER = LoggerFactory.getLogger(JestServiceImpl.class);

    @Override
    public JestResult addType(String clustName, String indexName, String typeName, String json) {
        JestResult result = null ;
        try {
            PutMapping putMapping = new PutMapping.Builder(indexName,typeName,json).build();
            result = JestManager.getJestClient(clustName).execute(putMapping);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("putMapping失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult delIndex(String clustName, String indexName) {
        JestResult result = null ;
        try {
            DeleteIndex deleteIndex =new DeleteIndex.Builder(indexName).build();
            result = JestManager.getJestClient(clustName).execute(deleteIndex);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("delIndex失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult settingUpdate(String clustName, String indexName, String json) {
        JestResult result = null ;
        try {
           UpdateSettings updateSettings = new UpdateSettings.Builder(json).addIndex(indexName).build();
            result = JestManager.getJestClient(clustName).execute(updateSettings);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("settingUpdate失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult httpProxy(String clustName, String url, String methodName, String queryParam) throws Exception {
        JestResult result;
        try {
            JestLocalHttpClient jestLocalHttpClient = new JestLocalHttpClient.Builder(url,methodName,queryParam).build();
            result = JestManager.getJestClient(clustName).execute(jestLocalHttpClient);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("jestLocalHttpClient失败:",e);
            throw new Exception(e);
        }
        return result ;
    }

    @Override
    public JestResult deleteBulk(String clustName, String indexName, String Type, List<SearchResultDetailVO> results) {
        JestResult result = null ;
        try {
            Bulk.Builder bulkBulder = new Bulk.Builder().defaultIndex(indexName).defaultType(Type);
            if(CollectionUtils.isNotEmpty(results)){
                for (SearchResultDetailVO resultDetailVO:results){
                    bulkBulder.addAction(new Delete.Builder(resultDetailVO.getId()).index(indexName).type(Type).build());
                }
            }
            result = JestManager.getJestClient(clustName).execute(bulkBulder.build());
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("deleteBulk失败:",e);
        }
        return result ;

    }

    @Override
    public JestResult searchScroll(String clustName, String scroll, String scrollId) {
        JestResult result = null ;
        SearchScroll searchScroll = new SearchScroll.Builder(scrollId,scroll).build();
        try {
            result = JestManager.getJestClient(clustName).execute(searchScroll);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("searchScroll失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult getMapping(String clustName, String indexName) {
        JestResult result = null ;
        GetMapping getMapping = new GetMapping.Builder().addIndex(indexName).build();
        try {
            result = JestManager.getJestClient(clustName).execute(getMapping);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("getMapping失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult querySearch(String clustName,String query,String indexName) {
        JestResult result = null ;
        try {
            Search querySearch = new Search.Builder(query).addIndex(indexName).setParameter("scroll","1m").build();
            result = JestManager.getJestClient(clustName).execute(querySearch);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("querySearch失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult clusterStats(String clustName, String name) {
        JestResult result = null ;
        State clusterStatsName = new State.Builder().withMetadata().indices(name).build();
        try {
            result = JestManager.getJestClient(clustName).execute(clusterStatsName);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("clusterStatsName失败:",e);
        }
        return result ;
    }


    @Override
    public JestResult nodesStats(String clustName, String nodeId) {
        JestResult result = null ;
        NodesStats nodeStatsId = new NodesStats.Builder().addNode(nodeId).build();
        try {
            result = JestManager.getJestClient(clustName).execute(nodeStatsId);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("nodeStatsId失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult getClusterState(String clusterName) {
        JestResult result = null ;
        State clusterState = new State.Builder().withMasterNode().withRoutingTable().withBlocks().build();
        try {
            result = JestManager.getJestClient(clusterName).execute(clusterState);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("clusterState失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult getStats(String clustName) {
        JestResult result = null ;
        Stats getStats = new Stats.Builder().build();
        try {
            result = JestManager.getJestClient(clustName).execute(getStats);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("getStats失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult getStatsDocsAndStore(String clustName) {
        JestResult result = null ;
        Stats getStats = new Stats.Builder().docs(true).store(true).build();
        try {
            result = JestManager.getJestClient(clustName).execute(getStats);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("getStatsDocsAndStore失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult getSetting(String clustName) {
        JestResult result = null ;
        GetSettings getSettings = new GetSettings.Builder().build();
        try {
            result = JestManager.getJestClient(clustName).execute(getSettings);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("getSettings失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult getAliases(String clustName) {
        JestResult result = null ;
        GetAliases getAliases = new GetAliases.Builder().build();
        try {
            result = JestManager.getJestClient(clustName).execute(getAliases);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("getAliases失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult getNoteSomInfo(String clustName, Integer flag) {
        JestResult result = null ;
        NodesInfo nodesInfo;
        try {
            switch (flag){
                case 1:
                    nodesInfo = new NodesInfo.Builder().withOs().withJvm().build();
                    result = JestManager.getJestClient(clustName).execute(nodesInfo);
                    break;
                case 2:
                    nodesInfo = new NodesInfo.Builder().withHttp().build();
                    result = JestManager.getJestClient(clustName).execute(nodesInfo);
                    break;
                default:
                   break;
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("查询nodes os jvm等信息失败:",e);
        }
        return result ;
    }

    @Override
    public JestResult health(String clustName) {
        Health health = new Health.Builder().build();
        JestResult result = null ;
        try {
            result = JestManager.getJestClient(clustName).execute(health);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("health:",e);
        }
        return result ;
    }

    @Override
    public JestResult nodesStats(String clustName,Integer flag) {
        JestResult result = null ;
        try {
            NodesStats nodesStats;
            if(flag != null && flag == 1){
                nodesStats= new NodesStats.Builder().withJvm().withOs().withFs().withProcess().build();
            }else{
                nodesStats= new NodesStats.Builder().withJvm().withOs().withIndices().withThreadPool().build();
            }
            result = JestManager.getJestClient(clustName).execute(nodesStats);
        } catch (Exception e) {
            e.printStackTrace();
            LOGGER.error("nodesStats:",e);
        }
        return result ;
    }

}
