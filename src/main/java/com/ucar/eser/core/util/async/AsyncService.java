package com.ucar.eser.core.util.async;

import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.Future;

/**
 * 异步服务类
 * Created by wangzhen on 15-10-22.
 */
public interface  AsyncService {

    /**
     * 提交任务
     *
     * @param callable  callable
     * @return 返回是否提交成功
     */
    boolean submitFuture(KeyCallable<?> callable);

    /**
     * @return futureMap
     */
    ConcurrentMap<String, Future<?>> getFutureMap();

    /**
     * 提交任务
     *
     * @param callable  callable
     * @return 返回是否提交成功
     */
    Future<?> submitFuture(Callable<?> callable);

}
