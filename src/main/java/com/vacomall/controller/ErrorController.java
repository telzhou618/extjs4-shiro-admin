package com.vacomall.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/error")
public class ErrorController extends AdminController{

	/**
	 * 错误页面
	 * @return
	 */
	@RequestMapping("/{page}")
	public String page(@PathVariable("page") String page){
		return "error/" + page;
	}
	
}
