package weiz.code.OperacionDeTransporte.infraestructure.services.imp;

import weiz.code.OperacionDeTransporte.api.models.responses.TitularResponse;
import weiz.code.OperacionDeTransporte.infraestructure.abstractService.CatalogService;

public interface ITitularService extends CatalogService<TitularResponse> {
    TitularResponse findById (Long id);
}
