package weiz.code.OperacionDeTransporte.infraestructure.helpers;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import weiz.code.OperacionDeTransporte.api.models.requests.RemesaRequest;
import weiz.code.OperacionDeTransporte.domain.entities.RemesaEntity;
import weiz.code.OperacionDeTransporte.domain.repositories.RemesaRepository;

import java.util.HashSet;
import java.util.Set;

@Transactional
@Component
@AllArgsConstructor
public class ManifiestoHelper {
    private final RemesaRepository remesaRepository;

    public Set<RemesaEntity> createRemesas(Set<RemesaRequest> remesas) {
        var response = new HashSet<RemesaEntity>(remesas.size());
        remesas.forEach(rem -> {
            response.add(persistirRemesa(rem));
        });
        return response;
    }

    public RemesaEntity persistirRemesa(RemesaRequest remesaRequest) {
        var remesaPrePresist = RemesaEntity.builder()
                .tipoDeMercancia(remesaRequest.getTipoDeMercancia())
                .caracteristicas(remesaRequest.getCaracteristicas())
                .peso(remesaRequest.getPeso())
                .unidadDeMedida(remesaRequest.getUnidadDeMedida())
                .volumen(remesaRequest.getVolumen())
                .empaque(remesaRequest.getEmpaque())
                .build();
        return remesaRepository.save(remesaPrePresist);
    }

}
