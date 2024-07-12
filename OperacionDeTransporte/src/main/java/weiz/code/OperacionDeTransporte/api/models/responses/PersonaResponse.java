package weiz.code.OperacionDeTransporte.api.models.responses;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public class PersonaResponse {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String telefono;
}
