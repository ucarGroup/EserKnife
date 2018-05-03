package com.ucar.eser.core.util;


import com.ucar.eser.core.jest.vo.EsClusterDetail;

import java.util.List;
import java.util.Random;

public class BalanceUtil {
    /**
     * 使用“随机”的负载算法，生成URL
     * @return
     */
    public static String getRandomHost(EsClusterDetail mc){

        List<String> list = mc.getUrls();
        if(list.size() > 0){
            Random random = new Random();
            int size = random.nextInt(list.size());
            return list.get(size);
        }

        return null ;
    }
}
