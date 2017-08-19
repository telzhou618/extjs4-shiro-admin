package com.vacomall.component;


import org.apache.log4j.Logger;
import org.apache.shiro.authz.UnauthorizedException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.vacomall.bean.Rest;

/**
 * 全局异常处理器
 * Created by Gaojun.Zhou 2017年6月8日
 */
@ResponseBody
@ControllerAdvice
public class ExceptionAdvice {
	
	public static final Logger logger = Logger.getLogger(ExceptionAdvice.class);
	
    /**
     * 404 - Not Found
     */
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(NoHandlerFoundException.class)
    public Rest handleNoHandlerFoundException(NoHandlerFoundException  e) {
        logger.error("资源不存在", e);
        return Rest.failure("404");
    }
   
    /**
     * 405 - ForbidAccessException
     */
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(UnauthorizedException.class)
    public Rest unauthorizedException(UnauthorizedException e) {
    	logger.error("无访问权限", e);
    	return Rest.failure("无访问权限");
    }
    /**
     * 500 - Internal Server Error
     */
    @ResponseStatus(HttpStatus.OK)
    @ExceptionHandler(Exception.class)
    public Rest handleException(Exception e) {
        logger.error("服务运行异常,"+e.getMessage(), e);
        return Rest.failure(e.getMessage());
    }
}
