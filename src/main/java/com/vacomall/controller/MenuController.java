package com.vacomall.controller;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.MapUtils;
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
import com.vacomall.bean.Rest;
import com.vacomall.entity.SysMenu;
import com.vacomall.entity.SysUser;
import com.vacomall.service.ISysMenuService;

/**
 * 用户控制器
 * @author jameszhou
 *
 */
@RestController
@RequestMapping("/menu")
public class MenuController extends AdminController{

	@Autowired private ISysMenuService sysMenuService;
	/**
	 * 
	 * @param pid
	 * @return
	 */
	@RequiresPermissions("menu:list")
	@RequestMapping("/list")
	public List<Map<String, Object>> list (@RequestParam(name="node",defaultValue="0") String pid) {
		if(pid.equals("root")){
			pid = "0";
		}
		List<Map<String, Object>> list = sysMenuService.selectMaps(new EntityWrapper<SysMenu>().eq("pid", pid).orderBy("code"));
		if(!list.isEmpty()){
			for(Map<String, Object> map : list){
				map.put("leaf", MapUtils.getIntValue(map, "deep",0)<3 ? false : true);
				map.remove("iconCls");
			}
		}
		return list;
	}
	
	/**
	 * 执行新增用户
	 * @param sysMenu
	 * @return
	 */
	@RequiresPermissions("menu:add")
	@RequestMapping("/add")
	public Rest add(SysMenu sysMenu){
		String pid = sysMenu.getPid();
		if(StringUtils.isBlank(pid) || pid.equals("0")){
			sysMenu.setDeep(1);
		}else{
			sysMenu.setDeep(sysMenuService.selectOne(new EntityWrapper<SysMenu>().eq("id",pid)).getDeep()+1);
		}
		sysMenuService.insert(sysMenu);
		return Rest.ok();
	}
	
	/**
	 * 执行编辑用户
	 * @param id
	 * @param model
	 * @return
	 * @throws InterruptedException 
	 */
	@RequiresPermissions("menu:edit")
	@RequestMapping("/edit")
	public Rest edit(SysMenu sysMenu){
		sysMenuService.updateById(sysMenu);
		return Rest.ok();
	}
	
	/**
	 * 删除
	 * @param id
	 * @return
	 */
	@RequiresPermissions("menu:delete")
	@RequestMapping("/delete")
	public Rest delete(@RequestParam("ids") String[] ids){
		if(ArrayUtils.isEmpty(ids)){
			return Rest.failure("客户端传入对象id为空");
		}
		sysMenuService.deleteBatchIds(Arrays.asList(ids));
		return Rest.ok();
	}
	
	/**
	 * 加载当前用户的菜单
	 * @return
	 */
	@RequestMapping("/leftmenus")
	public Rest leftmenus(){
		Subject subject = SecurityUtils.getSubject();
		if(subject != null){
			SysUser sysUser = (SysUser) subject.getPrincipal();
			List<Map<String, Object>> list = sysMenuService.selectMenuByUid(sysUser.getId(),"0");
			return Rest.okData(list);
		}else{
			return Rest.failure("会话过期");
		}
	}
	
	/**
	 * 获取全部菜单数据
	 * @return
	 */
	@RequestMapping("/treelist")
	public List<Map<String, Object>> treelist(){
		List<Map<String, Object>> list = sysMenuService.selectMenuByPid("0");
		return list;
	}
}
