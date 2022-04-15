package info4.gl.coopcycle_jhipster.repository;

import info4.gl.coopcycle_jhipster.domain.Cooperatives;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Cooperatives entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CooperativesRepository extends JpaRepository<Cooperatives, Long> {}
