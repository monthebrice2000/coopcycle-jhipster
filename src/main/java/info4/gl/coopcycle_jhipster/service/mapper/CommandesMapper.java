package info4.gl.coopcycle_jhipster.service.mapper;

import info4.gl.coopcycle_jhipster.domain.Clients;
import info4.gl.coopcycle_jhipster.domain.Commandes;
import info4.gl.coopcycle_jhipster.domain.Restaurants;
import info4.gl.coopcycle_jhipster.service.dto.ClientsDTO;
import info4.gl.coopcycle_jhipster.service.dto.CommandesDTO;
import info4.gl.coopcycle_jhipster.service.dto.RestaurantsDTO;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Commandes} and its DTO {@link CommandesDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommandesMapper extends EntityMapper<CommandesDTO, Commandes> {
    @Mapping(target = "client", source = "client", qualifiedByName = "clientsId")
    @Mapping(target = "restaurants", source = "restaurants", qualifiedByName = "restaurantsIdSet")
    CommandesDTO toDto(Commandes s);

    @Mapping(target = "removeRestaurant", ignore = true)
    Commandes toEntity(CommandesDTO commandesDTO);

    @Named("clientsId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    ClientsDTO toDtoClientsId(Clients clients);

    @Named("restaurantsId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RestaurantsDTO toDtoRestaurantsId(Restaurants restaurants);

    @Named("restaurantsIdSet")
    default Set<RestaurantsDTO> toDtoRestaurantsIdSet(Set<Restaurants> restaurants) {
        return restaurants.stream().map(this::toDtoRestaurantsId).collect(Collectors.toSet());
    }
}
