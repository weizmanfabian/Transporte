package weiz.code.OperacionDeTransporte.api.controllers;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import weiz.code.OperacionDeTransporte.api.models.requests.ManifiestoRequest;
import weiz.code.OperacionDeTransporte.api.models.responses.ManifiestoResponse;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IManifiestoService;

import java.lang.reflect.InvocationTargetException;
import java.util.Set;

@RestController
@RequestMapping("/manifiestos")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ManifiestoController {
    private final IManifiestoService manifiestoService;

    @GetMapping
    public ResponseEntity<Set<ManifiestoResponse>> readAll() {
        ResponseEntity.ok();
        Set<ManifiestoResponse> response = manifiestoService.readAll();
        return response.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(response);
    }

    @GetMapping(path = "{id}")
    public ResponseEntity<ManifiestoResponse> get(@PathVariable Long id) {
        return ResponseEntity.ok(manifiestoService.read(id));
    }

    @PostMapping
    public ResponseEntity<ManifiestoResponse> post(@Valid @RequestBody ManifiestoRequest request) {
        return ResponseEntity.ok(manifiestoService.create(request));
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<ManifiestoResponse> put(@Valid @RequestBody ManifiestoRequest request, @PathVariable Long id) throws InvocationTargetException, IllegalAccessException {
        return ResponseEntity.ok(manifiestoService.update(request, id));
    }

    @DeleteMapping(path = "{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        manifiestoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
