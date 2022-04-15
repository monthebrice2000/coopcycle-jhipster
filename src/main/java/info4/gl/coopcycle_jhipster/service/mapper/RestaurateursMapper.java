package info4.gl.coopcycle_jhipster.service.mapper;

import info4.gl.coopcycle_jhipster.domain.Cooperatives;
import info4.gl.coopcycle_jhipster.domain.Restaurateurs;
import info4.gl.coopcycle_jhipster.service.dto.CooperativesDTO;
import info4.gl.coopcycle_jhipster.service.dto.RestaurateursDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Restaurateurs} and its DTO {@link RestaurateursDTO}.
 */
@Mapper(componentModel = "spring")
public interface RestaurateursMapper extends EntityMapper<RestaurateursDTO, Restaurateurs> {
    @Mapping(target = "cooperative", source = "cooperative", qualifiedByName = "cooperativesId")
    RestaurateursDTO toDto(Restaurateurs s);

    @Named("cooperativesId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CooperativesDTO toDtoCooperativesId(Cooperatives cooperatives);
}
