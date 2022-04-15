package info4.gl.coopcycle_jhipster.repository;

import info4.gl.coopcycle_jhipster.domain.Livreurs;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Livreurs entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LivreursRepository extends JpaRepository<Livreurs, Long> {}
