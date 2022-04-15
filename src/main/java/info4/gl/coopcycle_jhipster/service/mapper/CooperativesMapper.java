package info4.gl.coopcycle_jhipster.service.mapper;

import info4.gl.coopcycle_jhipster.domain.Cooperatives;
import info4.gl.coopcycle_jhipster.domain.Zones;
import info4.gl.coopcycle_jhipster.service.dto.CooperativesDTO;
import info4.gl.coopcycle_jhipster.service.dto.ZonesDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Cooperatives} and its DTO {@link CooperativesDTO}.
 */
@Mapper(componentModel = "spring")
public interface CooperativesMapper extends EntityMapper<CooperativesDTO, Cooperatives> {
    @Mapping(target = "zone", source = "zone", qualifiedByName = "zonesId")
    CooperativesDTO toDto(Cooperatives s);

    @Named("zonesId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ZonesDTO toDtoZonesId(Zones zones);
}
