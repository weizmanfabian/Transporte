package weiz.code.OperacionDeTransporte.api.models.responses;

import lombok.*;
import weiz.code.OperacionDeTransporte.util.enums.UnidadDeMedidaEnum;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
public class RemesaResponse {
    private Long id;
    private String tipoDeMercancia;
    private String caracteristicas;
    private BigDecimal peso;
    private UnidadDeMedidaEnum unidadDeMedida;
    private String volumen;
    private String empaque;
}
