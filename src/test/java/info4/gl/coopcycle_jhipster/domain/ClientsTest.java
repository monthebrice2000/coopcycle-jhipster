package info4.gl.coopcycle_jhipster.domain;

import static org.assertj.core.api.Assertions.assertThat;

import info4.gl.coopcycle_jhipster.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClientsTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clients.class);
        Clients clients1 = new Clients();
        clients1.setId(1L);
        Clients clients2 = new Clients();
        clients2.setId(clients1.getId());
        assertThat(clients1).isEqualTo(clients2);
        clients2.setId(2L);
        assertThat(clients1).isNotEqualTo(clients2);
        clients1.setId(null);
        assertThat(clients1).isNotEqualTo(clients2);
    }
}
