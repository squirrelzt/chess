package com.chess.controller.websocket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import java.io.IOException;

import static com.chess.utils.WebSocketUtils.ONLINE_USER_SESSIONS;
import static com.chess.utils.WebSocketUtils.sendMessageAll;

@Slf4j
@Component
@ServerEndpoint(value = "/websocket/{userId}")
public class WebSocketServerEndpoint {

    @OnOpen
    public void openSession(@PathParam("userId") String userId, Session session) {
        ONLINE_USER_SESSIONS.put(userId, session);
        log.info("用户{}加入websocket", userId);
    }

    @OnMessage
    public void onMessage(@PathParam("userId") String userId, String message) {
        log.info("发送消息,userId={}", userId);
        sendMessageAll(message);
    }

    @OnClose
    public void onClose(@PathParam("userId") String userId, Session session) {
        //当前的Session 移除
        ONLINE_USER_SESSIONS.remove(userId);
        try {
            session.close();
        } catch (IOException e) {
            log.error("onClose error",e);
        }
    }

    @OnError
    public void onError(Session session, Throwable throwable) {
        try {
            session.close();
        } catch (IOException e) {
            log.error("onError exception", e);
        }
        log.error("Throwable msg " + throwable.getMessage());
    }
}
