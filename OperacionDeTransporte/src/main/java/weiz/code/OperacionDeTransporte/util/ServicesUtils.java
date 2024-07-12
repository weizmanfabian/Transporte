package weiz.code.OperacionDeTransporte.util;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import weiz.code.OperacionDeTransporte.util.enums.SortType;

public class ServicesUtils {

    /**
     * Crea un PageRequest para la paginación y la ordenación.
     *
     * @param page          Número de página.
     * @param size          Tamaño de la página.
     * @param sortType      Tipo de ordenación.
     * @param nameFieldSort Campo por el que ordenar.
     * @return PageRequest configurado.
     */
    public static PageRequest createPageRequest(Integer page, Integer size, SortType sortType, String nameFieldSort, String FIELD_BY_SORT_DEFAULT) {
        nameFieldSort = (nameFieldSort != null) ? nameFieldSort : FIELD_BY_SORT_DEFAULT;
        return switch (sortType) {
            case LOWER -> PageRequest.of(page, size, Sort.by(nameFieldSort).ascending());
            case UPPER -> PageRequest.of(page, size, Sort.by(nameFieldSort).descending());
            case NONE -> PageRequest.of(page, size);
        };
    }
}
