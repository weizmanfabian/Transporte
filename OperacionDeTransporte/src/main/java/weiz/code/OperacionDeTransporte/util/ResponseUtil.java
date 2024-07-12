package weiz.code.OperacionDeTransporte.util;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

/**
 * Clase de utilidad para manejar respuestas HTTP comunes.
 */
public class ResponseUtil {

    /**
     * Crea una ResponseEntity basada en el contenido de una página.
     * Si la página está vacía, devuelve una respuesta de 'No Content' (204).
     * De lo contrario, devuelve una respuesta 'OK' (200) con el contenido de la página.
     *
     * @param <T> El tipo de elementos contenidos en la página.
     * @param response La página de elementos a evaluar para la respuesta.
     * @return Una ResponseEntity representando el estado adecuado y el contenido de la página.
     */
    public static <T> ResponseEntity<Page<T>> handlePageResponse(Page<T> response) {
        // Utiliza un operador ternario para evaluar si la página está vacía y construir la respuesta.
        return response.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(response);
    }


}
