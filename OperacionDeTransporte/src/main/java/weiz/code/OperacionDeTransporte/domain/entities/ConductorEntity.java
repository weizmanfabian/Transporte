package weiz.code.OperacionDeTransporte.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import weiz.code.OperacionDeTransporte.api.models.responses.ConductorResponse;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "conductores")
public class ConductorEntity {
    @Id
    @Column(name = "con_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conId;

    @Column(name = "con_nombre")
    private String nombre;
    @Column(name = "con_apellido")
    private String apellido;
    @Column(name = "con_email")
    private String email;
    @Column(name = "con_telefono")
    private String telefono;

    public static ConductorResponse entityToResponse(ConductorEntity entity) {
        ConductorResponse res = new ConductorResponse();
        BeanUtils.copyProperties(entity, res);
        res.setId(entity.getConId());
        return res;
    }
}
