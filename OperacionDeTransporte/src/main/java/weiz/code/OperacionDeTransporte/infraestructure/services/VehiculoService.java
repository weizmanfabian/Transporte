package weiz.code.OperacionDeTransporte.infraestructure.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import weiz.code.OperacionDeTransporte.api.models.responses.VehiculoResponse;
import weiz.code.OperacionDeTransporte.domain.entities.VehiculoEntity;
import weiz.code.OperacionDeTransporte.domain.repositories.VehiculoRepository;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IVehiculoService;
import weiz.code.OperacionDeTransporte.util.exceptions.IdNotFoundException;

import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@AllArgsConstructor
public class VehiculoService implements IVehiculoService {
    private final VehiculoRepository vehiculoRepository;

    @Override
    public Set<VehiculoResponse> readAll() {
        return vehiculoRepository.findAll().stream()
                .map(VehiculoEntity::entityToResponse)
                .collect(Collectors.toSet());
    }

    @Override
    public VehiculoResponse findById(Long id) {
        var res = vehiculoRepository.findById(id).orElseThrow(() -> new IdNotFoundException("Vehiculo"));
        return VehiculoEntity.entityToResponse(res);
    }
}
