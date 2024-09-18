package org.example.common.enums;

import lombok.Getter;

public enum JSON {
    RESULT_JSON("""
            {
                "got": %b,
                "time": "%s",
                "date": "%s"
            }
            """),
    ERROR_JSON("""
            {
                "error": "%s"
            }
            """);

    @Getter
    String json;

    private JSON(String json) {
        this.json = json;
    }

}
