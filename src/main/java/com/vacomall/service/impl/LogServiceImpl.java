package com.vacomall.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.vacomall.entity.SysLog;
import com.vacomall.mapper.SysLogMapper;
import com.vacomall.service.ISysLogService;

/**
 * <p>
 * 日志 服务实现类
 * </p>
 *
 * @author GaoJun.Zhou
 * @since 2017-06-30
 */
@Service
public class LogServiceImpl extends ServiceImpl<SysLogMapper, SysLog> implements ISysLogService {

}
