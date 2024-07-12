package weiz.code.OperacionDeTransporte.infraestructure.services.imp;

import weiz.code.OperacionDeTransporte.api.models.responses.ConductorResponse;
import weiz.code.OperacionDeTransporte.infraestructure.abstractService.CatalogService;

public interface IConductorService extends CatalogService<ConductorResponse> {
    ConductorResponse findById(Long id);
}
