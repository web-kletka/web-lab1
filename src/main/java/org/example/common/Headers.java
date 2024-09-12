package org.example.common;

import lombok.Getter;

public enum Headers {
    HEADER_100(""),
    HEADER_200("HTTP/1.1 200 OK\n" +
            "Content-Type: text/html\n" +
            "Content-Length: %d\n" +
            "\n" +
            "\n" +
            "\n" +
            "%s" +
            "\n"),
    HEADER_300(""),
    HEADER_400(""),
    HEADER_500("");

    @Getter
    String header;

    Headers(String header) {
        this.header = header;
    }

}
