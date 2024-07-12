package weiz.code.OperacionDeTransporte.domain.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;
import weiz.code.OperacionDeTransporte.api.models.responses.ManifiestoResponse;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "manifiestos")
public class ManifiestoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "man_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "man_titular_id", nullable = false)
    private TitularEntity titularEntity;

    @Column(name = "man_valor_del_viaje", nullable = false)
    private BigDecimal valorDelViaje;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "man_vehiculo_id", nullable = false)
    private VehiculoEntity vehiculoEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "man_conductor_id", nullable = false)
    private ConductorEntity conductorEntity;

    @Column(name = "man_fecha", nullable = false)
    private LocalDateTime fecha;

    @Column(name = "man_remitente", nullable = false)
    private String remitente;

    @Column(name = "man_destinatario", nullable = false)
    private String destinatario;

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            orphanRemoval = true,
            mappedBy = "manifiesto"
    )
    private Set<RemesaEntity> remesas;

    public static ManifiestoResponse entityToResponse(ManifiestoEntity entity) {
        ManifiestoResponse res = new ManifiestoResponse();
        BeanUtils.copyProperties(entity, res);
        res.setTitular(TitularEntity.entityToResponse(entity.getTitularEntity()));
        res.setVehiculo(VehiculoEntity.entityToResponse(entity.getVehiculoEntity()));
        res.setConductor(ConductorEntity.entityToResponse(entity.getConductorEntity()));
        res.setRemesas(entity.getRemesas().stream().map(RemesaEntity::entityToResponse).collect(Collectors.toSet()));
        return res;
    }

    @PrePersist
    @PreUpdate
    public void updateFks() {
        this.fecha = LocalDateTime.now();
        if (Objects.isNull(this.remesas)) this.remesas = new HashSet<>();
        this.remesas.forEach(rem -> rem.setManifiesto(this));
    }

    public void addRemesa(RemesaEntity remesa) {
        if (Objects.isNull(this.remesas)) this.remesas = new HashSet<>();
        this.remesas.add(remesa);
        this.remesas.forEach(rem -> rem.setManifiesto(this));
    }

    public void removeRemesa(Long id) {
        if (Objects.isNull(this.remesas)) this.remesas = new HashSet<>();
        this.remesas.forEach(rem -> {
            if (rem.getId().equals(id)) rem.setManifiesto(null);
        });
    }
}
