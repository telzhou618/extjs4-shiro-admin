package com.vacomall.controller;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributesModelMap;

/**
 * 登录控制器
 * @author jameszhou
 *
 */
@Controller
public class LoginController extends AdminController{
	
	/**
	 * 登录页面
	 * @return
	 */
	@RequestMapping("/login")
	public String login(){
		return "login";
	}
	
	/**
	 * 执行登录
	 * @return
	 */
	@PostMapping("/doLogin")
	public String doLogin(String username,String password,RedirectAttributesModelMap model){
		
		Subject currentUser = SecurityUtils.getSubject();
		UsernamePasswordToken token = new UsernamePasswordToken(username, password);
		
		 if (!currentUser.isAuthenticated()) {
	          // token.setRememberMe(true);
	            try {
	                currentUser.login(token);
	            } catch (UnknownAccountException uae) {
	            	
	            	model.addFlashAttribute("error", "未知用户");
	            	return "redirect:/login";
	            } catch (IncorrectCredentialsException ice) {
	            	model.addFlashAttribute("error", "密码错误");
	            	return "redirect:/login";
	            } catch (LockedAccountException lae) {
	            	model.addFlashAttribute("error", "账号已锁定");
	            	return "redirect:/login";
	            }
	            // ... catch more exceptions here (maybe custom ones specific to your application?
	            catch (AuthenticationException ae) {
	                //unexpected condition?  error?
	            	model.addFlashAttribute("error", "服务器繁忙");
	            	return "redirect:/login";
	            }
	        }
		return "redirect:/";
	}
}
