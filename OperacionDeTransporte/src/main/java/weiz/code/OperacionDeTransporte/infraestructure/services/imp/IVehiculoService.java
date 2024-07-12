package weiz.code.OperacionDeTransporte.infraestructure.services.imp;

import weiz.code.OperacionDeTransporte.api.models.responses.VehiculoResponse;
import weiz.code.OperacionDeTransporte.infraestructure.abstractService.CatalogService;

public interface IVehiculoService extends CatalogService<VehiculoResponse> {
    VehiculoResponse findById(Long id);
}
