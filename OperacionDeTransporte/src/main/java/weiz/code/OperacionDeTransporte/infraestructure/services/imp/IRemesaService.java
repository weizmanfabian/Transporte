package weiz.code.OperacionDeTransporte.infraestructure.services.imp;

import weiz.code.OperacionDeTransporte.api.models.requests.RemesaRequest;
import weiz.code.OperacionDeTransporte.api.models.responses.RemesaResponse;
import weiz.code.OperacionDeTransporte.infraestructure.abstractService.CatalogService;
import weiz.code.OperacionDeTransporte.infraestructure.abstractService.CrudService;

public interface IRemesaService extends CatalogService<RemesaResponse>, CrudService<RemesaRequest, RemesaResponse, Long> {
}
