package weiz.code.OperacionDeTransporte.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import weiz.code.OperacionDeTransporte.domain.entities.ManifiestoEntity;

import java.util.Set;

public interface ManifiestoRepository extends JpaRepository<ManifiestoEntity, Long> {

}
