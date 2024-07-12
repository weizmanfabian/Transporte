package weiz.code.OperacionDeTransporte.api.controllers;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weiz.code.OperacionDeTransporte.api.models.responses.RemesaResponse;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IRemesaService;

import java.util.Set;

@RestController
@RequestMapping("/remesas")
@AllArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class RemesaController {
    private final IRemesaService remesaService;

    @GetMapping
    public ResponseEntity<Set<RemesaResponse>> readAll() {
        ResponseEntity.ok();
        Set<RemesaResponse> response = remesaService.readAll();
        return response.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(response);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<RemesaResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(remesaService.read(id));
    }
}
