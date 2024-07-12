package weiz.code.OperacionDeTransporte.api.models.responses;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

//contemple los datos que vienen en la clase padre con esta anotación @EqualsAndHashCode(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse extends BaseErrorResponse{
    private String message;
}
