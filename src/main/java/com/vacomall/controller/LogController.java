package com.vacomall.controller;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.vacomall.entity.SysLog;
import com.vacomall.service.ISysLogService;

/**
 * 日志
 * @author jameszhou
 *
 */
@RestController
@RequestMapping("/log")
public class LogController extends AdminController{

	@Autowired private ISysLogService sysLogService;
	
	/**
	 * JSON分页数据
	 * @param start
	 * @param size
	 * @param search
	 * @return
	 */
	@RequiresPermissions("log:list")
	@RequestMapping("/list")
	public Map<String, Object> list (
			@RequestParam(value="page",defaultValue="1") Integer page,
			@RequestParam(value="limit",defaultValue="50") Integer size,
			String search) {
		
		EntityWrapper<SysLog> ew = new EntityWrapper<SysLog>();
		if(StringUtils.isNotBlank(search)){
			ew.like("logTitle", search).or().like("userName", search)
			.or().like("logContent", search);
		}
		Page<SysLog> pageData = sysLogService.selectPage(new Page<SysLog>(page, size),ew);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", pageData.getRecords());
		map.put("total",pageData.getTotal());
		return map;
	}
}
