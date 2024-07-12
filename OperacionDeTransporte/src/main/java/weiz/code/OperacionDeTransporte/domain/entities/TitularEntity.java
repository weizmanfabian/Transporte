package weiz.code.OperacionDeTransporte.domain.entities;


import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;
import weiz.code.OperacionDeTransporte.api.models.responses.TitularResponse;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "titulares")
public class TitularEntity {
    @Id
    @Column(name = "tit_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long titId;

    @Column(name = "tit_nombre")
    private String nombre;
    @Column(name = "tit_apellido")
    private String apellido;
    @Column(name = "tit_email")
    private String email;
    @Column(name = "tit_telefono")
    private String telefono;

    public static TitularResponse entityToResponse(TitularEntity entity) {
        TitularResponse res = new TitularResponse();
        BeanUtils.copyProperties(entity, res);
        res.setId(entity.getTitId());
        return res;
    }
}
