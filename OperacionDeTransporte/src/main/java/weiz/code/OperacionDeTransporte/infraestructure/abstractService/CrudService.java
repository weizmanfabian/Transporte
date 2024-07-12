package weiz.code.OperacionDeTransporte.infraestructure.abstractService;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public interface CrudService<Req, Res, Id> {
    Res create(Req request);

    Res read(Id id);

    Res update(Req request, Id id) throws InvocationTargetException, IllegalAccessException;

    void delete(Id id);

    List<Res> createMultiple(List<Req> list);
}
