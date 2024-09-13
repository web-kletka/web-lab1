package org.example.common.enums;

import lombok.Getter;

public enum Headers {
    HEADER_100(""),
    HEADER_200("HTTP/1.1 200 OK\n" +
            "Content-Type: application/json\n" +
            "Content-Length: %d\n" +
            "\n" +
            "\n" +
            "\n" +
            "%s" +
            "\n"),
    HEADER_300(""),
    HEADER_400("HTTP/1.1 400 Bad\n" +
            "Content-Type: application/json\n" +
            "Content-Length: %d\n" +
            "\n" +
            "\n" +
            "\n" +
            "%s" +
            "\n"),
    HEADER_500("HTTP/1.1 500 Bad\n" +
            "Content-Type: application/json\n" +
            "Content-Length: %d\n" +
            "\n" +
            "\n" +
            "\n" +
            "%s" +
            "\n");

    @Getter
    String header;

    Headers(String header) {
        this.header = header;
    }

}
