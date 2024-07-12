package weiz.code.OperacionDeTransporte.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;
import weiz.code.OperacionDeTransporte.api.models.responses.VehiculoResponse;
import weiz.code.OperacionDeTransporte.util.enums.MarcaVehiculoEnum;
import weiz.code.OperacionDeTransporte.util.enums.TipoDeVehiculo;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "vehiculos")
public class VehiculoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "veh_id")
    private Long id;

    @Column(name = "veh_nombre")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "veh_marca")
    private MarcaVehiculoEnum marca;

    @Column(name = "veh_modelo")
    private Integer modelo;

    @Column(name = "veh_numero_de_ruedas")
    private Integer numeroDeRuedas;

    @Enumerated(EnumType.STRING)
    @Column(name = "veh_tipo_de_vehiculo")
    private TipoDeVehiculo tipoDeVehiculo;

    public static VehiculoResponse entityToResponse(VehiculoEntity entity) {
        VehiculoResponse res = new VehiculoResponse();
        BeanUtils.copyProperties(entity, res);
        return res;
    }
}
