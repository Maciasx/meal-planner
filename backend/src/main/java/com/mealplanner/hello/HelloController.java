package com.mealplanner.hello;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;

/**
 * Przykładowy endpoint — do usunięcia, gdy pojawi się prawdziwa funkcjonalność.
 * Wszystkie endpointy REST są pod prefiksem /api (frontend proxuje /api na backend).
 */
@RestController
@RequestMapping("/api/hello")
public class HelloController {

    @GetMapping
    public HelloResponse hello(@RequestParam(defaultValue = "świecie") String name) {
        return new HelloResponse("Cześć, " + name + "!", Instant.now());
    }

    public record HelloResponse(String message, Instant timestamp) {
    }
}
