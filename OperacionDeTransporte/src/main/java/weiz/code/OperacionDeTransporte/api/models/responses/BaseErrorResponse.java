package weiz.code.OperacionDeTransporte.api.models.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.io.Serializable;

//Se coloca la anotación @SuperBuilder porque esta clase no va a ser implementada sino heredada

@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseErrorResponse implements Serializable {
    private String status;
    private Integer code;
}
