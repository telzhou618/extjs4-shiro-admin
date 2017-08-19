package com.vacomall.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.vacomall.bean.Rest;
import com.vacomall.entity.SysRole;
import com.vacomall.entity.SysRoleMenu;
import com.vacomall.entity.SysUserRole;
import com.vacomall.service.ISysRoleMenuService;
import com.vacomall.service.ISysRoleService;
import com.vacomall.service.ISysUserRoleService;

/**
 * 角色控制器
 * @author jameszhou
 *
 */
@RestController
@RequestMapping("/role")
public class RoleController extends AdminController{

	@Autowired private ISysRoleService sysRoleService;
	@Autowired private ISysRoleMenuService sysRoleMenuService;
	@Autowired private ISysUserRoleService sysUserRoleService;
	
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
	@RequiresPermissions("role:list")
	@RequestMapping("/list")
	public Map<String, Object> list (
			@RequestParam(value="page",defaultValue="1") Integer page,
			@RequestParam(value="limit",defaultValue="10") Integer size,
			String search,
			String sort,
			String order,
			Model model) {
		
		EntityWrapper<SysRole> ew = new EntityWrapper<SysRole>();
		if(StringUtils.isNotBlank(search)){
			ew.like("roleName", search);
		}
		if(StringUtils.isNotBlank(sort)){
			ew.orderBy(sort, (StringUtils.isNotBlank(order) && order.toLowerCase().equals("asc")) ? true : false);
		}
		Page<SysRole> pageData = sysRoleService.selectPage(new Page<SysRole>(page, size),ew);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("data", pageData.getRecords());
		map.put("total",pageData.getTotal());
		return map;
	}
	
	/**
	 * 新增
	 * @param sysRole
	 * @return
	 */
	@RequiresPermissions("role:add")
	@RequestMapping("/add")
	public Rest add(SysRole sysRole){
		sysRole.setCreateTime(new Date());
		sysRoleService.insert(sysRole);
		return Rest.ok();
	}
	
	/**
	 * 编辑
	 * @param id
	 * @param model
	 * @return
	 * @throws InterruptedException 
	 */
	@RequiresPermissions("role:edit")
	@RequestMapping("/edit")
	public Rest edit(SysRole sysRole){
		sysRoleService.updateById(sysRole);
		return Rest.ok();
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequiresPermissions("role:delete")
	@RequestMapping("/delete")
	public Rest delete(@RequestParam("ids") String[] ids){
		if(ArrayUtils.isEmpty(ids)){
			return Rest.failure("客户端传入对象id为空");
		}
		sysRoleService.deleteBatchIds(Arrays.asList(ids));
		return Rest.ok();
	}
	
	/**
	 * 获取指定角色的权限
	 */
	@RequestMapping("/menulist")
	public List<Map<String, Object>> menulist(String rid){
		if(StringUtils.isBlank(rid)){
			throw new RuntimeException("客户端传入的角色ID为空");
		}
		List<Object> list = sysRoleMenuService.selectObjs(new EntityWrapper<SysRoleMenu>().setSqlSelect("menuId").eq("roleId", rid));
		return sysRoleMenuService.selectAuthByRidAndPid("0",list);
	}
	
	/**
	 * 执行分配权限
	 * @param rid
	 * @param menuIds
	 * @return
	 */
	@RequiresPermissions("role:auth")
	@RequestMapping("/doAuth")
	public Rest doAuth(String rid, String[] menuIds){
		sysRoleMenuService.updateAuth(rid,menuIds);
		return Rest.ok();
	}
	
	/**
	 * 获取当前用户的的角色
	 * @param uid
	 * @return
	 */
	@RequestMapping("/treelist")
	public List<Map<String, Object>> treelist(String uid){
		
		List<Object> roleIdList = new ArrayList<Object>();
		if(StringUtils.isNotBlank(uid)){
			roleIdList = sysUserRoleService.selectObjs(new EntityWrapper<SysUserRole>().setSqlSelect("roleId").eq("userId",uid));
		}
		
		List<Map<String, Object>> list = sysRoleService.selectMaps(new EntityWrapper<SysRole>().orderBy("createTime"));
		
		for(Map<String, Object> map : list){
			map.put("checked",roleIdList.contains(MapUtils.getString(map, "id")) ? true : false);
			map.put("leaf",true);
		}
		
		return list;
	}
 }
