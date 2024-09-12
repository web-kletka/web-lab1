package org.example;

import com.fastcgi.FCGIInterface;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import org.apache.log4j.Logger;
import org.example.common.Headers;

public class Server {
    private static final Logger logger = Logger.getLogger(Server.class);

    public void run() {
        logger.info("Server started");
        var fcgiInterface = new FCGIInterface();
        while (fcgiInterface.FCGIaccept() >= 0) {
            var httpResponse = getString();
            send(httpResponse);
        }
    }

    private String getString() {
        var content = """
                       <html>
                           <head><title>Java FastCGI Hello World</title></head>
                           <body><h1>eeee boy!</h1></body>
                       </html>""";
        return makeResponse(content, Headers.HEADER_200);
    }

    private static String readRequestBody() throws IOException {
        FCGIInterface.request.inStream.fill();
        var contentLength = FCGIInterface.request.inStream.available();
        var buffer = ByteBuffer.allocate(contentLength);
        var readBytes =
                FCGIInterface.request.inStream.read(buffer.array(), 0,
                        contentLength);
        var requestBodyRaw = new byte[readBytes];
        buffer.get(requestBodyRaw);
        buffer.clear();

        return new String(requestBodyRaw, StandardCharsets.UTF_8);
    }
    private String makeResponse(String content, Headers header){
        return header.getHeader().formatted(content.getBytes(StandardCharsets.UTF_8).length, content);
    }

    private void send(String httpResponse){
        System.out.println(httpResponse);
    }
}