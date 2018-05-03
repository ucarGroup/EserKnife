package com.ucar.eser.core.util.async;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;

/**
 * Created by wangzhen on 15-10-22.
 */
public abstract class KeyCallable<V> implements Callable<V> {
	
    protected Logger LOGGER = LoggerFactory.getLogger(this.getClass());
    
    private final String key;

    private volatile boolean cancelled = false;

    public KeyCallable(String key) {
        this.key = key;
    }

    public abstract V execute();

    @Override
    public V call() throws Exception {
        if (!cancelled) {
            V v = execute();
            return v;
        }
        return null;
    }

    public void cancel() {
        this.cancelled = true;
    }

    public String getKey() {
        return key;
    }

    public boolean isCancelled() {
        return cancelled;
    }
}
