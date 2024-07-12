package weiz.code.OperacionDeTransporte.api.models.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
public class ManifiestoResponse {
    private Long id;
    private TitularResponse titular;
    private BigDecimal valorDelViaje;
    private VehiculoResponse vehiculo;
    private ConductorResponse conductor;
    private String remitente;
    private String destinatario;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime fecha;
    private Set<RemesaResponse> remesas;
}
