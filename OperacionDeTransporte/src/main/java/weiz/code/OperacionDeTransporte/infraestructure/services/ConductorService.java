package weiz.code.OperacionDeTransporte.infraestructure.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import weiz.code.OperacionDeTransporte.api.models.responses.ConductorResponse;
import weiz.code.OperacionDeTransporte.domain.entities.ConductorEntity;
import weiz.code.OperacionDeTransporte.domain.repositories.ConductorRepository;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IConductorService;
import weiz.code.OperacionDeTransporte.util.exceptions.IdNotFoundException;

import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@AllArgsConstructor
public class ConductorService implements IConductorService {
    private final ConductorRepository conductorRepository;

    @Override
    public ConductorResponse findById(Long id) {
        var res = conductorRepository.findById(id).orElseThrow(() -> new IdNotFoundException("Conductor"));
        return ConductorEntity.entityToResponse(res);
    }

    @Override
    public Set<ConductorResponse> readAll() {
        return conductorRepository.findAll().stream()
                .map(ConductorEntity::entityToResponse)
                .collect(Collectors.toSet());
    }
}
