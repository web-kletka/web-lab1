package org.example;

import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.apache.log4j.Logger;
import org.example.common.customException.ValidException;
import org.example.common.enums.Headers;
import org.example.common.enums.JSON;

public class Server {
    private static final Logger logger = Logger.getLogger(Server.class);

    public void run() {
        logger.info("Server started");
        var fcgiInterface = new FCGIInterface();
        String response = "";
        long startTime;
        while (fcgiInterface.FCGIaccept() >= 0) {
            startTime = System.currentTimeMillis();
            try {
                var request = readRequestBody();
                var params = new ParsParams(request);
                logger.info("Params: x = " + params.getX() + " y = " + params.getY() + " r = " + params.getR());
                var result = calculate(params.getX(), params.getY(), params.getR());
                logger.info("Result: " + result);
                var json = makeJson(result, String.valueOf(System.currentTimeMillis() - startTime), String.valueOf(new Date()), JSON.RESULT_JSON);
                response = makeResponse(json,Headers.HEADER_200);
            } catch (IOException | ValidException e) {
                var json = makeJson(e.getMessage(), JSON.ERROR_JSON);
                response = makeResponse(json, Headers.HEADER_500);
            }
            send(response);
        }
        logger.info("Server stopped");
    }

    private String readRequestBody() throws IOException {
        return System.getProperties().getProperty("QUERY_STRING");
    }

    private String makeResponse(String content, Headers header){
        return header.getHeader().formatted(content.getBytes(StandardCharsets.UTF_8).length + 2, content);
    }

    private String makeJson(Object content, String time, String date, JSON json){
        return json.getJson().formatted(content, time, date);
    }

    private String makeJson(Object content, JSON json){
        return json.getJson().formatted(content);
    }

    private void send(String httpResponse){
        System.out.println(httpResponse);
    }

    private boolean calculate(int x, Float y, Float r){

        if (x <= 0 && y <= 0)
                return false;
        if ((x <= 0 && y >= 0) && x * x + y * y > (r / 2) * (r / 2))
                return false;
        if ((x >= 0 && y >= 0) && x > r/2 || y > r)
                return false;
        if ((x >= 0 && y <= 0) && x - y > r / 2)
                return false;

        return true;
    }
}