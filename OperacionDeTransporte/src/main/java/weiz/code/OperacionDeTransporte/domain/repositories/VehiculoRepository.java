package weiz.code.OperacionDeTransporte.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import weiz.code.OperacionDeTransporte.domain.entities.VehiculoEntity;

public interface VehiculoRepository extends JpaRepository<VehiculoEntity, Long> {
}
