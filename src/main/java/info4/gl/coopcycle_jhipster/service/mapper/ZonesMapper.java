package info4.gl.coopcycle_jhipster.service.mapper;

import info4.gl.coopcycle_jhipster.domain.Zones;
import info4.gl.coopcycle_jhipster.service.dto.ZonesDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Zones} and its DTO {@link ZonesDTO}.
 */
@Mapper(componentModel = "spring")
public interface ZonesMapper extends EntityMapper<ZonesDTO, Zones> {}
