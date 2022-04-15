package info4.gl.coopcycle_jhipster.service.mapper;

import info4.gl.coopcycle_jhipster.domain.Cooperatives;
import info4.gl.coopcycle_jhipster.domain.Livreurs;
import info4.gl.coopcycle_jhipster.domain.Restaurateurs;
import info4.gl.coopcycle_jhipster.service.dto.CooperativesDTO;
import info4.gl.coopcycle_jhipster.service.dto.LivreursDTO;
import info4.gl.coopcycle_jhipster.service.dto.RestaurateursDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Livreurs} and its DTO {@link LivreursDTO}.
 */
@Mapper(componentModel = "spring")
public interface LivreursMapper extends EntityMapper<LivreursDTO, Livreurs> {
    @Mapping(target = "restaurateur", source = "restaurateur", qualifiedByName = "restaurateursId")
    @Mapping(target = "cooperative", source = "cooperative", qualifiedByName = "cooperativesId")
    LivreursDTO toDto(Livreurs s);

    @Named("restaurateursId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RestaurateursDTO toDtoRestaurateursId(Restaurateurs restaurateurs);

    @Named("cooperativesId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CooperativesDTO toDtoCooperativesId(Cooperatives cooperatives);
}
