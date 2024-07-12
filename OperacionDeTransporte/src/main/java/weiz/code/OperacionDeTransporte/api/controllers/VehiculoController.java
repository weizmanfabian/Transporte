package weiz.code.OperacionDeTransporte.api.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weiz.code.OperacionDeTransporte.api.models.responses.VehiculoResponse;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IVehiculoService;

import java.util.Set;

@RestController
@RequestMapping("/vehiculos")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class VehiculoController {
    private final IVehiculoService vehiculoService;

    @GetMapping
    public ResponseEntity<Set<VehiculoResponse>> readAll() {
        ResponseEntity.ok();
        Set<VehiculoResponse> response = vehiculoService.readAll();
        return response.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(response);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<VehiculoResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(vehiculoService.findById(id));
    }
}
