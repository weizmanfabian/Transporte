package weiz.code.OperacionDeTransporte.infraestructure.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import weiz.code.OperacionDeTransporte.api.models.responses.TitularResponse;
import weiz.code.OperacionDeTransporte.domain.entities.TitularEntity;
import weiz.code.OperacionDeTransporte.domain.repositories.TitularRepository;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.ITitularService;
import weiz.code.OperacionDeTransporte.util.exceptions.IdNotFoundException;

import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@AllArgsConstructor
public class TitularService implements ITitularService {
    private final TitularRepository titularRepository;

    @Override
    public TitularResponse findById(Long id) {
        var res = titularRepository.findById(id).orElseThrow(() -> new IdNotFoundException("Titular"));
        return TitularEntity.entityToResponse(res);
    }

    @Override
    public Set<TitularResponse> readAll() {
        return titularRepository.findAll().stream()
                .map(TitularEntity::entityToResponse)
                .collect(Collectors.toSet());
    }
}
