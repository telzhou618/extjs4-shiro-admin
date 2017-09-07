package com.vacomall.controller;

import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.vacomall.bean.Rest;
import com.vacomall.entity.SysUser;
import com.vacomall.service.ISysUserService;
import com.vacomall.util.BaseUtil;

/**
 * 用户控制器
 * @author jameszhou
 *
 */
@RestController
@RequestMapping("/user")
public class UserController extends AdminController{

	@Autowired private ISysUserService sysUserService;
	
	/**
	 * JSON分页数据
	 * @param start
	 * @param size
	 * @param search
	 * @param sort
	 * @param order
	 * @param model
	 * @return
	 */
	@RequiresPermissions("user:list")
	@RequestMapping("/list")
	public Map<String, Object> list (
			@RequestParam(value="page",defaultValue="1") Integer page,
			@RequestParam(value="limit",defaultValue="10") Integer size,
			String search,
			String sort,
			String order) {
		
		EntityWrapper<SysUser> ew = new EntityWrapper<SysUser>();
		if(StringUtils.isNotBlank(search)){
			ew.like("userName", search);
		}
		if(StringUtils.isNotBlank(sort)){
			ew.orderBy(sort, (StringUtils.isNotBlank(order) && order.toLowerCase().equals("asc")) ? true : false);
		}
		Page<SysUser> pageData = sysUserService.selectPage(new Page<SysUser>(page, size),ew);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", pageData.getRecords());
		map.put("total",pageData.getTotal());
		return map;
	}
	
	/**
	 * 执行新增用户
	 * @param sysUser
	 * @return
	 */
	@RequiresPermissions("user:add")
	@RequestMapping("/add")
	public Rest add(SysUser sysUser,String confPassword, String[] rids){
		if(!confPassword.equals(sysUser.getPassword())){
			return Rest.failure("两次输入的密码不一致");
		}
		if(sysUserService.selectCount(new EntityWrapper<SysUser>().eq("userName", sysUser.getUserName())) > 0){
			return Rest.failure("用户名["+sysUser.getUserName()+"]已存在");
		}
		sysUser.setCreateTime(new Date());
		sysUser.setPassword(BaseUtil.md51024Pwd(sysUser.getPassword(), sysUser.getUserName()));
		sysUserService.addUser(sysUser, rids);
		return Rest.ok();
	}
	
	/**
	 * 执行编辑用户
	 * @param id
	 * @param model
	 * @return
	 * @throws InterruptedException 
	 */
	@RequiresPermissions("user:edit")
	@RequestMapping("/edit")
	public Rest edit(SysUser sysUser,String[] rids){
		sysUserService.updateUser(sysUser, rids);
		return Rest.ok();
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequiresPermissions("user:delete")
	@RequestMapping("/delete")
	public Rest delete(@RequestParam("ids") String[] ids){
		if(ArrayUtils.isEmpty(ids)){
			return Rest.failure("客户端传入对象id为空");
		}
		sysUserService.deleteBatchIds(Arrays.asList(ids));
		return Rest.ok();
	}
	
	@RequiresPermissions("user:restpwd")
	@RequestMapping("/repwd")
	public Rest repwd(String id,String pwd){
		if(StringUtils.isBlank(id)){
			return Rest.failure("客户端传入对象id为空");
		}
		if(StringUtils.isBlank(pwd)){
			return Rest.failure("新密码不能为空");
		}
		SysUser sysUser =sysUserService.selectById(id);
		if(sysUser== null){
			return Rest.failure("用户不存在");
		}
		sysUser.setPassword(BaseUtil.md51024Pwd(pwd, sysUser.getUserName()));
		sysUserService.updateById(sysUser);
		return Rest.ok();
	}
	
	/**
	 * 获取当前用户
	 * @return
	 */
	@RequestMapping("/get/curuser")
	public Rest getCurUser(){
		
		Subject subject = SecurityUtils.getSubject();
		if(subject != null){
			SysUser sysUser = (SysUser) subject.getPrincipal();
			return Rest.okData(sysUser);
		}
		return Rest.failure("登录过期");
	}
}
