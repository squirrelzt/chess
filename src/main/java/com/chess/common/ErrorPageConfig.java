package com.chess.common;

import org.springframework.boot.web.server.ConfigurableWebServerFactory;
import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;

/**
 * 类名称: ErrorPageConfig
 * 类描述: 错误页面配置类
 * @author squirrel
 * @date 2019-06-03
 */
@Configuration
public class ErrorPageConfig {

    @Bean
    public WebServerFactoryCustomizer<ConfigurableWebServerFactory> webServerFactoryCustomizer() {
        return (factory -> {
            ErrorPage errorPage404 = new ErrorPage(HttpStatus.NOT_FOUND, "/index.html");
            factory.addErrorPages(errorPage404);
            ErrorPage unauthorizedPage401 = new ErrorPage(HttpStatus.UNAUTHORIZED, "/index.html");
            factory.addErrorPages(unauthorizedPage401);
        });
    }
}
