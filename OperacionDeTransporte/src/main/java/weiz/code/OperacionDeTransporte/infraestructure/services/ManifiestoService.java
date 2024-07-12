package weiz.code.OperacionDeTransporte.infraestructure.services;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import weiz.code.OperacionDeTransporte.api.models.requests.ManifiestoRequest;
import weiz.code.OperacionDeTransporte.api.models.requests.RemesaRequest;
import weiz.code.OperacionDeTransporte.api.models.responses.ManifiestoResponse;
import weiz.code.OperacionDeTransporte.domain.entities.ManifiestoEntity;
import weiz.code.OperacionDeTransporte.domain.entities.RemesaEntity;
import weiz.code.OperacionDeTransporte.domain.repositories.*;
import weiz.code.OperacionDeTransporte.infraestructure.helpers.ManifiestoHelper;
import weiz.code.OperacionDeTransporte.infraestructure.services.imp.IManifiestoService;
import weiz.code.OperacionDeTransporte.util.exceptions.IdNotFoundException;

import java.lang.reflect.InvocationTargetException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Transactional
@Service
@Slf4j
@AllArgsConstructor
public class ManifiestoService implements IManifiestoService {

    private final ConductorRepository conductorRepository;
    private final TitularRepository titularRepository;
    private final VehiculoRepository vehiculoRepository;
    private final ManifiestoRepository manifiestoRepository;
    private final ManifiestoHelper manifiestoHelper;
    private final RemesaRepository remesaRepository;

    @Override
    public Set<ManifiestoResponse> readAll() {
        return manifiestoRepository.findAll().stream()
                .map(ManifiestoEntity::entityToResponse)
                .collect(Collectors.toSet());
    }


    @Override
    public ManifiestoResponse create(ManifiestoRequest request) {
        var titular = titularRepository.findById(request.getIdTitular()).orElseThrow(() -> new IdNotFoundException("Titular"));
        var vehiculo = vehiculoRepository.findById(request.getIdVehiculo()).orElseThrow(() -> new IdNotFoundException("Vehículo"));
        var conductor = conductorRepository.findById(request.getIdConductor()).orElseThrow(() -> new IdNotFoundException("Conductor"));
        var manifiestoPrePersist = ManifiestoEntity.builder()
                .valorDelViaje(request.getValorDelViaje())
                .titularEntity(titular)
                .vehiculoEntity(vehiculo)
                .conductorEntity(conductor)
                .remitente(request.getRemitente())
                .destinatario(request.getDestinatario())
                .build();
        var remesas = manifiestoHelper.createRemesas(request.getRemesas());
        manifiestoPrePersist.setRemesas(remesas);
        var manifiestoPersisted = manifiestoRepository.save(manifiestoPrePersist);
        return ManifiestoEntity.entityToResponse(manifiestoPersisted);
    }


    @Override
    public ManifiestoResponse read(Long id) {
        var res = manifiestoRepository.findById(id).orElseThrow(() -> new IdNotFoundException("Manifiesto"));
        return ManifiestoEntity.entityToResponse(res);
    }

    @Override
    public ManifiestoResponse update(ManifiestoRequest request, Long id) throws InvocationTargetException, IllegalAccessException {
        var manifiestoPreUpdate = manifiestoRepository.findById(id).orElseThrow(() -> new IdNotFoundException("Manifiesto"));
        var titular = titularRepository.findById(request.getIdTitular()).orElseThrow(() -> new IdNotFoundException("Titular"));
        var vehiculo = vehiculoRepository.findById(request.getIdVehiculo()).orElseThrow(() -> new IdNotFoundException("Vehículo"));
        var conductor = conductorRepository.findById(request.getIdConductor()).orElseThrow(() -> new IdNotFoundException("Conductor"));

        // Actualizar o agregar remesas
        Set<RemesaEntity> updatedRemesas = new HashSet<>();
        for (RemesaRequest rem : request.getRemesas()) {
            if (rem.getId() != null) {
                var remesaEntity = manifiestoPreUpdate.getRemesas().stream()
                        .filter(r -> r.getId().equals(rem.getId()))
                        .findFirst()
                        .orElse(new RemesaEntity());

                BeanUtils.copyProperties(rem, remesaEntity);
                updatedRemesas.add(remesaEntity);
            } else {
                var remesaEntity = new RemesaEntity();
                BeanUtils.copyProperties(rem, remesaEntity);
                updatedRemesas.add(remesaEntity);
            }
        }

        manifiestoPreUpdate.getRemesas().clear();
        manifiestoPreUpdate.getRemesas().addAll(updatedRemesas);

        manifiestoPreUpdate.setTitularEntity(titular);
        manifiestoPreUpdate.setVehiculoEntity(vehiculo);
        manifiestoPreUpdate.setConductorEntity(conductor);
        manifiestoPreUpdate.setValorDelViaje(request.getValorDelViaje());

        var manifiestoUpdated = manifiestoRepository.save(manifiestoPreUpdate);


        return ManifiestoEntity.entityToResponse(manifiestoUpdated);
    }


    @Override
    public void delete(Long id) {
        var manifiestoToDelete = manifiestoRepository.findById(id).orElseThrow(() -> new IdNotFoundException("Manifiesto"));
        manifiestoRepository.deleteById(id);
    }

    @Override
    public List<ManifiestoResponse> createMultiple(List<ManifiestoRequest> list) {
        return List.of();
    }

    @Override
    public void removeRemesa(Long manifiestoId, Long remesaId) {
        var manifiesto = manifiestoRepository.findById(manifiestoId).orElseThrow(() -> new IdNotFoundException("Manifiesto"));
        manifiesto.removeRemesa(remesaId);
        manifiestoRepository.save(manifiesto);
    }

    @Override
    public Long addRemesa(Long manifiestoId, RemesaRequest remesaRequest) {
        var manifiesto = manifiestoRepository.findById(manifiestoId).orElseThrow(() -> new IdNotFoundException("Manifiesto"));
        var remesa = manifiestoHelper.persistirRemesa(remesaRequest);
        manifiesto.addRemesa(remesa);
        this.manifiestoRepository.save(manifiesto);
        return remesa.getId();
    }


}
