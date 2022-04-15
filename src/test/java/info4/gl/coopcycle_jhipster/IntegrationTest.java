package info4.gl.coopcycle_jhipster;

import info4.gl.coopcycle_jhipster.CoopcycleJhipsterApp;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Base composite annotation for integration tests.
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(classes = CoopcycleJhipsterApp.class)
public @interface IntegrationTest {
}
