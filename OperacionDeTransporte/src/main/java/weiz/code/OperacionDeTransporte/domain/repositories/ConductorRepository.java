package weiz.code.OperacionDeTransporte.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import weiz.code.OperacionDeTransporte.domain.entities.ConductorEntity;

public interface ConductorRepository extends JpaRepository<ConductorEntity, Long> {
}
