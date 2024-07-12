package weiz.code.OperacionDeTransporte.api.models.requests;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class RemesaRequest {

    private Long id;

    @NotNull(message = "El tipo de mercancia es obligatorio")
    private String tipoDeMercancia;

    @NotBlank(message = "Las caracteristicas no pueden estar vacías")
    private String caracteristicas;

    @NotNull(message = "El peso es obligatorio")
    @DecimalMin(value = "0.0", inclusive = false, message = "El valor mínimo es 0")
    private BigDecimal peso;

    @NotNull(message = "La unidad de medida es obligatoria")
    private UnidadDeMedidaEnum unidadDeMedida;

    @NotNull(message = "El volumen es obligatorio")
    private String volumen;

    @NotNull(message = "El empaque es obligatorio")
    private String empaque;

}
