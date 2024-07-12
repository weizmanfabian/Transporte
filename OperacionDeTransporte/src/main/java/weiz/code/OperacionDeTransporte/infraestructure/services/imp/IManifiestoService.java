package weiz.code.OperacionDeTransporte.infraestructure.services.imp;

import weiz.code.OperacionDeTransporte.api.models.requests.ManifiestoRequest;
import weiz.code.OperacionDeTransporte.api.models.requests.RemesaRequest;
import weiz.code.OperacionDeTransporte.api.models.responses.ManifiestoResponse;
import weiz.code.OperacionDeTransporte.infraestructure.abstractService.CatalogService;
import weiz.code.OperacionDeTransporte.infraestructure.abstractService.CrudService;

import java.util.Set;

public interface IManifiestoService extends CatalogService<ManifiestoResponse>, CrudService<ManifiestoRequest, ManifiestoResponse, Long> {
    void removeRemesa(Long manifiestoId, Long remesaId);

    Long addRemesa(Long manifiestoId, RemesaRequest remesaRequest);
}
