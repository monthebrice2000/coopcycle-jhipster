package info4.gl.coopcycle_jhipster.repository;

import info4.gl.coopcycle_jhipster.domain.Clients;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Clients entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClientsRepository extends JpaRepository<Clients, Long> {}
