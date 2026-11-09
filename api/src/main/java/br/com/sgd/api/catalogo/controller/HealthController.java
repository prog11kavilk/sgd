package br.com.sgd.api.catalogo.controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    public record HealthResponse(String status) {}

    @GetMapping
    public HealthResponse health() {
        return new HealthResponse("UP");
    }
}