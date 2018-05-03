package com.ucar.eser.admin.service.schedule;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;

/**
 *
 * job父类，包含一个抽象函方法，将实现推迟到具体的子类
 * Created by wangzhen on 2015/10/22
 */
public abstract class EsBaseCenterJob implements Job, Serializable {
    private static final long serialVersionUID = -6605766126594260961L;
    protected Logger LOGGER = LoggerFactory.getLogger(this.getClass());

    // 抽象方法，由子类实现，即具体的业务逻辑
    public abstract void action(JobExecutionContext context);

    /**
     * 统计时间
     *
     * @throws JobExecutionException
     */
    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        long start = System.currentTimeMillis();
        this.action(context);
        long end = System.currentTimeMillis();
        LOGGER.info("job: {}, trigger: {}, cost: {} ms", context.getJobDetail().getKey(),
                context.getTrigger().getKey(), (end - start));
    }
}
