package weiz.code.OperacionDeTransporte.api.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weiz.code.OperacionDeTransporte.api.models.responses.ConductorResponse;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IConductorService;

import java.util.Set;

@RestController
@RequestMapping("/conductores")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ConductorController {
    private final IConductorService conductorService;

    @GetMapping
    public ResponseEntity<Set<ConductorResponse>> readAll() {
        ResponseEntity.ok();
        Set<ConductorResponse> response = conductorService.readAll();
        return response.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(response);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<ConductorResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(conductorService.findById(id));
    }
}
