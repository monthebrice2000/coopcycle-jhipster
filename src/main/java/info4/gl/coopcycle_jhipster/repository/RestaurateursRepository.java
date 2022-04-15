package info4.gl.coopcycle_jhipster.repository;

import info4.gl.coopcycle_jhipster.domain.Restaurateurs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Restaurateurs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurateursRepository extends JpaRepository<Restaurateurs, Long> {}
