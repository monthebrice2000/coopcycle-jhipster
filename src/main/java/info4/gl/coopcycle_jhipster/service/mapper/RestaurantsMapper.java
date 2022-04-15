package info4.gl.coopcycle_jhipster.service.mapper;

import info4.gl.coopcycle_jhipster.domain.Restaurants;
import info4.gl.coopcycle_jhipster.domain.Restaurateurs;
import info4.gl.coopcycle_jhipster.service.dto.RestaurantsDTO;
import info4.gl.coopcycle_jhipster.service.dto.RestaurateursDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Restaurants} and its DTO {@link RestaurantsDTO}.
 */
@Mapper(componentModel = "spring")
public interface RestaurantsMapper extends EntityMapper<RestaurantsDTO, Restaurants> {
    @Mapping(target = "restaurateur", source = "restaurateur", qualifiedByName = "restaurateursId")
    RestaurantsDTO toDto(Restaurants s);

    @Named("restaurateursId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RestaurateursDTO toDtoRestaurateursId(Restaurateurs restaurateurs);
}
