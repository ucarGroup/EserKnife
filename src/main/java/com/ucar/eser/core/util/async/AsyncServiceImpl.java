package com.ucar.eser.core.util.async;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.*;

/**
 *
 * Created by wangzhen on 15-10-22.
 */
@Service
public class AsyncServiceImpl implements AsyncService {
    private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    private final int INTERRUPT_TIMEOUT = 10000;

    private final ExecutorService threadPool = new ThreadPoolExecutor(10, 256,
            0L, TimeUnit.MILLISECONDS,
            new SynchronousQueue<Runnable>(),
            new NamedThreadFactory("async", true));

    private final ConcurrentMap<String, Future<?>> futureMap = new ConcurrentSkipListMap<String, Future<?>>();

    private final ExecutorService observeFuturePool = new ThreadPoolExecutor(2, 2,
            0L, TimeUnit.MILLISECONDS,
            new SynchronousQueue<Runnable>(),
            new NamedThreadFactory("future-observe", true));

    public AsyncServiceImpl() {
        startObserveFuture();
    }

    private void startObserveFuture() {
        observeFuturePool.execute(new Runnable() {
            @Override
            public void run() {
                while (true) {
                    try {
                        if (futureMap.isEmpty()) {
                            TimeUnit.MILLISECONDS.sleep(100);
                        }
                        for (Iterator<Map.Entry<String, Future<?>>> i = futureMap.entrySet().iterator(); i.hasNext(); ) {
                            Map.Entry<String, Future<?>> entry = i.next();
                            String key = entry.getKey();
                            Future<?> future = entry.getValue();
                            try {
                                future.get(INTERRUPT_TIMEOUT, TimeUnit.MILLISECONDS);
                            } catch (TimeoutException te) {
                                //超时中断
                                long begin = System.currentTimeMillis();
                                future.cancel(Boolean.TRUE);
                                long interruptTime = System.currentTimeMillis() - begin;
                                LOGGER.error("ERROR:future={},costTime={},interruptTime={}", key, INTERRUPT_TIMEOUT, interruptTime);
                            } catch (Exception e) {
                                LOGGER.error(e.getMessage(), e);
                            } finally {
                                i.remove();
                            }
                        }
                    } catch (Exception e) {
                        LOGGER.error(e.getMessage(), e);
                    }
                }
            }
        });
    }


    @Override
    public boolean submitFuture(KeyCallable<?> callable) {
        try {
            Future<?> future = threadPool.submit(callable);
            //key时间排序升序,先提交优先处理
            //忽略future溢出
            futureMap.put(callable.getKey(), future);
            return true;

        } catch (Exception e) {
            LOGGER.error(e.getMessage() + callable.getKey(), e);
            return false;
        }
    }

    @Override
    public ConcurrentMap<String, Future<?>> getFutureMap() {
        return futureMap;
    }

    @Override
    public Future<?> submitFuture(Callable<?> callable) {
        try {
            Future<?> future = threadPool.submit(callable);
            return future;
        } catch (Exception e) {
            LOGGER.error(e.getMessage(), e);
            return null;
        }
    }
}
