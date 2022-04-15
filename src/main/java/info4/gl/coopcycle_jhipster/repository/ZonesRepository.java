package info4.gl.coopcycle_jhipster.repository;

import info4.gl.coopcycle_jhipster.domain.Zones;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Zones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZonesRepository extends JpaRepository<Zones, Long> {}
