package weiz.code.OperacionDeTransporte.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import weiz.code.OperacionDeTransporte.domain.entities.TitularEntity;

public interface TitularRepository extends JpaRepository<TitularEntity, Long> {
}
