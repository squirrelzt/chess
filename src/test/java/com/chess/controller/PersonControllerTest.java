package com.chess.controller;

import com.chess.vo.request.LoginRequestVO;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import org.json.JSONObject;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.util.Assert;
import org.springframework.web.context.WebApplicationContext;

import java.net.URI;

@SpringBootTest
public class PersonControllerTest {
    @Autowired
    protected WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    public void logins() throws Exception {
        LoginRequestVO vo = new LoginRequestVO();
        vo.setUsername("zhangsan");
        vo.setPassword("123456");
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectWriter objectWriter = objectMapper.writer().withDefaultPrettyPrinter();
        String requestBodyJson = objectWriter.writeValueAsString(vo);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/logins")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJson))
//                .param("username", "zhangsan")
//                .param("password", "123456"))
                .andReturn();
        System.out.println(result);
        Assert.isTrue(result.getResponse().getStatus() == 200, "请求失败,返回码=" + result.getResponse().getStatus() + ", 返回信息=" + result.getResponse().getErrorMessage());
        System.out.println(result.getResponse().getContentAsString());
    }

    @Test
    public void queryPersonById() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.get(URI.create("/queryPersonById"))
                .contentType(MediaType.APPLICATION_JSON)
                .param("id", "1"))
                .andReturn();
        System.out.println(result);
        Assert.isTrue(result.getResponse().getStatus() == 200, "请求失败");
        System.out.println(result.getResponse().getContentAsString());
    }
}
