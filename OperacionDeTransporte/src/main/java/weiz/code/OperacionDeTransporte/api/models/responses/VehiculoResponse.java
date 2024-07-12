package weiz.code.OperacionDeTransporte.api.models.responses;

import jakarta.persistence.*;
import lombok.*;
import weiz.code.OperacionDeTransporte.util.enums.MarcaVehiculoEnum;
import weiz.code.OperacionDeTransporte.util.enums.TipoDeVehiculo;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Builder
public class VehiculoResponse {
    private Long id;
    private String nombre;
    private MarcaVehiculoEnum marca;
    private Integer modelo;
    private Integer numeroDeRuedas;
    private TipoDeVehiculo tipoDeVehiculo;
}
