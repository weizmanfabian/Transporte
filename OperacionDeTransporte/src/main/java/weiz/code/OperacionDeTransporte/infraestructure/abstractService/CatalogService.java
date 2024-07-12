package weiz.code.OperacionDeTransporte.infraestructure.abstractService;

import org.springframework.data.domain.Page;
import weiz.code.OperacionDeTransporte.util.enums.SortType;

import java.util.Set;

public interface CatalogService<Res> {
    //Page<Res> readAll(Integer page, Integer size, SortType sortType);
    Set<Res> readAll();
}
