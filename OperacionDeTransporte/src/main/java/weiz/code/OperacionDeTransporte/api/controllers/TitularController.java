package weiz.code.OperacionDeTransporte.api.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weiz.code.OperacionDeTransporte.api.models.responses.TitularResponse;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.ITitularService;

import java.util.Set;

@RestController
@RequestMapping("/titulares")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TitularController {
    private final ITitularService titularService;

    @GetMapping
    public ResponseEntity<Set<TitularResponse>> readAll() {
        ResponseEntity.ok();
        Set<TitularResponse> response = titularService.readAll();
        return response.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(response);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<TitularResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(titularService.findById(id));
    }
}
