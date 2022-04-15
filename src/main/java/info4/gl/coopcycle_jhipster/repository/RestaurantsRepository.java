package info4.gl.coopcycle_jhipster.repository;

import info4.gl.coopcycle_jhipster.domain.Restaurants;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Restaurants entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RestaurantsRepository extends JpaRepository<Restaurants, Long> {}
