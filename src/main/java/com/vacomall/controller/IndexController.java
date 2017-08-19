package com.vacomall.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.vacomall.util.CookieUtils;

/**
 * 首页控制器
 * 
 * @author jameszhou
 *
 */
@Controller
public class IndexController extends AdminController {
	
	//定义主题
	public static final String[]  themes =  {"neptune","classic","access","gray"};
	
	//访问首页
	@RequestMapping(value = { "index", "", "/","neptune","classic","access","gray"})
	public String index(HttpServletRequest request,@RequestParam(defaultValue="false") Boolean debug,Model model) {
		
		String uri = request.getRequestURI();
		uri = uri.replaceAll("/", "");
		String theme = "neptune";
		
		String ckTheme= CookieUtils.getCookieValue(request, "theme");
		
		if(StringUtils.isNotBlank(uri) && ArrayUtils.contains(themes, uri)){
			theme = uri;
		}else if(StringUtils.isNotBlank(ckTheme)){
			theme  = ckTheme;
		}
		model.addAttribute("theme",theme);
		return debug ? "index-debug" : "index";
	}
}
