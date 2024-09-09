package weiz.code.OperacionDeTransporte.api.controllers.error_handler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//status code 403

/**
 * Controlador de asesoramiento para manejar excepciones específicas relacionadas con ForbiddenCustomerException.
 * Este controlador se centra en las situaciones donde se requiere devolver un estado HTTP 403 Forbidden, Acceso no autorizado
 */
@RestControllerAdvice
@ResponseStatus(HttpStatus.FORBIDDEN) // Define el estado HTTP por defecto para los métodos de este controlador.
public class ForbiddenCustomerController {


}
