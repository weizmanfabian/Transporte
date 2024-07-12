package weiz.code.OperacionDeTransporte.api.models.requests;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
public class ManifiestoRequest {
    @NotNull(message = "El titular es obligatorio")
    private Long idTitular;
    @DecimalMin(value = "0.0", inclusive = false, message = "El valor mínimo es 0")
    @NotNull(message = "El valor del viaje es obligatorio")
    private BigDecimal valorDelViaje;
    @NotNull(message = "El Vehiculo es obligatorio")
    private Long idVehiculo;
    @NotNull(message = "El Conductor es obligatorio")
    private Long idConductor;
    @NotBlank(message = "El remitente no puede estar vacío")
    private String remitente;
    @NotBlank(message = "El destinatario no puede estar vacío")
    private String destinatario;
    @Size(min = 1, message = "Mímino 1 Remesa por Manifiesto")
    private Set<RemesaRequest> remesas;
}
