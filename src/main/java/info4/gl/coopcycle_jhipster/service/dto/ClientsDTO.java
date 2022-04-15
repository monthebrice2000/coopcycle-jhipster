package info4.gl.coopcycle_jhipster.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link info4.gl.coopcycle_jhipster.domain.Clients} entity.
 */
public class ClientsDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 10, max = 255)
    private String nom;

    @NotNull
    @Size(min = 10, max = 255)
    private String prenom;

    private String email;

    @NotNull
    @Size(min = 10, max = 255)
    private String phoneNumber;

    private RestaurateursDTO restaurateur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public RestaurateursDTO getRestaurateur() {
        return restaurateur;
    }

    public void setRestaurateur(RestaurateursDTO restaurateur) {
        this.restaurateur = restaurateur;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClientsDTO)) {
            return false;
        }

        ClientsDTO clientsDTO = (ClientsDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, clientsDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClientsDTO{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", prenom='" + getPrenom() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", restaurateur=" + getRestaurateur() +
            "}";
    }
}
