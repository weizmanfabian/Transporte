package weiz.code.OperacionDeTransporte.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import weiz.code.OperacionDeTransporte.api.models.responses.RemesaResponse;
import weiz.code.OperacionDeTransporte.util.enums.UnidadDeMedidaEnum;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "remesas")
public class RemesaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rem_id")
    private Long id;

    @Column(name = "rem_tipo_de_mercancia", nullable = false)
    private String tipoDeMercancia;

    @Column(name = "rem_caracteristicas")
    private String caracteristicas;

    @Column(name = "rem_peso", nullable = false)
    private BigDecimal peso;

    @Enumerated(EnumType.STRING)
    @Column(name = "rem_unidad_de_medida", nullable = false)
    private UnidadDeMedidaEnum unidadDeMedida;

    @Column(name = "rem_volumen", nullable = false)
    private String volumen;

    @Column(name = "rem_empaque", nullable = false)
    private String empaque;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rem_manifiesto_id")
    private ManifiestoEntity manifiesto;

    public static RemesaResponse entityToResponse(RemesaEntity entity) {
        RemesaResponse res = new RemesaResponse();
        BeanUtils.copyProperties(entity, res);
        return res;
    }
}
