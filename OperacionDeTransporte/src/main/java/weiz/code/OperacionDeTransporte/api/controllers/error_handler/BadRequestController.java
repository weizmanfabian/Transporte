package weiz.code.OperacionDeTransporte.api.controllers.error_handler;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import weiz.code.OperacionDeTransporte.api.models.responses.BaseErrorResponse;
import weiz.code.OperacionDeTransporte.api.models.responses.ErrorResponse;
import weiz.code.OperacionDeTransporte.api.models.responses.ErrorsResponse;
import weiz.code.OperacionDeTransporte.util.exceptions.IdNotFoundException;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

//status code 400

/**
 * Controlador de asesoramiento para manejar excepciones y devolver respuestas de error personalizadas.
 * Este controlador se centra en las situaciones donde se requiere devolver un estado HTTP 400 BAD_REQUEST.
 * Se utiliza para indicar que la solicitud enviada por el cliente (por ejemplo, un navegador o una aplicación cliente) no pudo ser entendida por el servidor debido a una sintaxis incorrecta.
 */
@RestControllerAdvice
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestController {

    @ExceptionHandler(IdNotFoundException.class)
    public BaseErrorResponse handleIdNotFoud(IdNotFoundException exception) {
        return ErrorResponse.builder()
                .message(exception.getMessage())
                .status(HttpStatus.BAD_REQUEST.name())
                .code(HttpStatus.BAD_REQUEST.value())
                .build();
    }


    /**
     * Maneja la excepción MethodArgumentNotValidException para errores de validación de campos en solicitudes.
     *
     * @param exception La excepción de argumento de método no válido capturada.
     * @return Una respuesta de error con detalles de campos específicos que fallaron en la validación.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public BaseErrorResponse handleMethodArgumentNotValid(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();
        // Agrega cada error de validación al mapa de errores.
        exception.getBindingResult().getFieldErrors().forEach(fieldError ->
                errors.put(fieldError.getField(), fieldError.getDefaultMessage()));

        return ErrorsResponse.builder()
                .errors(errors)
                .status(HttpStatus.BAD_REQUEST.name())
                .code(HttpStatus.BAD_REQUEST.value())
                .build();
    }

    /**
     * Maneja HttpMessageNotReadableException, que puede ocurrir por ejemplo, cuando un enum tiene un valor inválido.
     *
     * @param exception La excepción HttpMessageNotReadable capturada.
     * @return Una respuesta de error adecuada dependiendo del tipo de error de formato.
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public BaseErrorResponse handleHttpMessageNotReadable(HttpMessageNotReadableException exception) {
        if (exception.getCause() instanceof InvalidFormatException) {
            InvalidFormatException ife = (InvalidFormatException) exception.getCause();
            if (ife.getTargetType().isEnum()) {
                // Maneja específicamente el formato inválido para los enums.
                return handleInvalidEnumFormat(ife);
            }
        }
        // Responde con un mensaje de error general para otros tipos de errores de formato.
        return buildErrorResponse("Error en el formato del mensaje", HttpStatus.BAD_REQUEST);
    }

    /**
     * Construye una respuesta de error para un formato inválido específico de enums.
     *
     * @param ife La excepción de formato inválido.
     * @return Una respuesta de error con detalles sobre el campo enum inválido.
     */
    private BaseErrorResponse handleInvalidEnumFormat(InvalidFormatException ife) {
        Map<String, String> errors = new HashMap<>();
        String fieldName = ife.getPath().stream()
                .map(JsonMappingException.Reference::getFieldName)
                .collect(Collectors.joining("."));

        // Modifica el mensaje de error para incluir "@RequestParam Tipo de dato inválido"
        String errorMessage = "Tipo de dato inválido";
        errors.put(fieldName, errorMessage);

        return ErrorsResponse.builder()
                .errors(errors)
                .status(HttpStatus.BAD_REQUEST.name())
                .code(HttpStatus.BAD_REQUEST.value())
                .build();
    }

    /**
     * Método de ayuda para construir una respuesta de error genérica.
     *
     * @param message El mensaje de error.
     * @param status  El estado HTTP para la respuesta.
     * @return Una respuesta de error construida.
     */
    private ErrorResponse buildErrorResponse(String message, HttpStatus status) {
        return ErrorResponse.builder()
                .message(message)
                .status(status.name())
                .code(status.value())
                .build();
    }

    /**
     * Maneja MethodArgumentTypeMismatchException para errores en parámetros @RequestParam y @RequestHeader.
     *
     * @param exception La excepción capturada.
     * @return Una respuesta de error con detalles sobre el parámetro incorrecto.
     */

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public BaseErrorResponse handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException exception) {
        String paramName = exception.getName();
        String errorMessage = "Tipo de dato incorrecto";

        Map<String, String> errors = new HashMap<>();
        errors.put(paramName, errorMessage);

        return ErrorsResponse.builder()
                .errors(errors)
                .status(HttpStatus.BAD_REQUEST.name())
                .code(HttpStatus.BAD_REQUEST.value())
                .build();
    }
}