package com.vacomall.service;

import com.vacomall.entity.SysUserRole;

import java.util.Set;

import com.baomidou.mybatisplus.service.IService;

/**
 * <p>
 * 用户角色关联表 服务类
 * </p>
 *
 * @author GaoJun.Zhou
 * @since 2017-06-30
 */
public interface ISysUserRoleService extends IService<SysUserRole> {

	Set<String> findRolesByUid(String id);
	
}
