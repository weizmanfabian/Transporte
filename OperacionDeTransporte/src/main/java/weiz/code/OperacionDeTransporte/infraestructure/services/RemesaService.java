package weiz.code.OperacionDeTransporte.infraestructure.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import weiz.code.OperacionDeTransporte.api.models.requests.RemesaRequest;
import weiz.code.OperacionDeTransporte.api.models.responses.RemesaResponse;
import weiz.code.OperacionDeTransporte.domain.entities.RemesaEntity;
import weiz.code.OperacionDeTransporte.domain.repositories.RemesaRepository;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IRemesaService;
import weiz.code.OperacionDeTransporte.util.exceptions.IdNotFoundException;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@AllArgsConstructor
public class RemesaService implements IRemesaService {
    private final RemesaRepository remesaRepository;

    @Override
    public Set<RemesaResponse> readAll() {
        return remesaRepository.findAll().stream().map(RemesaEntity::entityToResponse).collect(Collectors.toSet());
    }

    @Override
    public RemesaResponse create(RemesaRequest request) {
        return null;
    }

    @Override
    public RemesaResponse read(Long id) {
        var res = remesaRepository.findById(id).orElseThrow(() -> new IdNotFoundException("Remesa"));
        return RemesaEntity.entityToResponse(res);
    }

    @Override
    public RemesaResponse update(RemesaRequest request, Long id) throws InvocationTargetException, IllegalAccessException {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public List<RemesaResponse> createMultiple(List<RemesaRequest> list) {
        return List.of();
    }
}
