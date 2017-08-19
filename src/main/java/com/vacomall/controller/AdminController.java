package com.vacomall.controller;

/**
 * 顶级控制器
 * @author jameszhou
 *
 */
public class AdminController {

	/**
	 * 重定向
	 * @param view
	 * @return
	 */
	public String redirectTo(String view){
		return "redirect:" + view;
	}
	
}
