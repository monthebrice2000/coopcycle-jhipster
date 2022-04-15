package info4.gl.coopcycle_jhipster.service.mapper;

import info4.gl.coopcycle_jhipster.domain.Clients;
import info4.gl.coopcycle_jhipster.domain.Restaurateurs;
import info4.gl.coopcycle_jhipster.service.dto.ClientsDTO;
import info4.gl.coopcycle_jhipster.service.dto.RestaurateursDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Clients} and its DTO {@link ClientsDTO}.
 */
@Mapper(componentModel = "spring")
public interface ClientsMapper extends EntityMapper<ClientsDTO, Clients> {
    @Mapping(target = "restaurateur", source = "restaurateur", qualifiedByName = "restaurateursId")
    ClientsDTO toDto(Clients s);

    @Named("restaurateursId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RestaurateursDTO toDtoRestaurateursId(Restaurateurs restaurateurs);
}
