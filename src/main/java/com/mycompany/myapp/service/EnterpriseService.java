package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Enterprise;
import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link com.mycompany.myapp.domain.Enterprise}.
 */
public interface EnterpriseService {
    /**
     * Save a enterprise.
     *
     * @param enterprise the entity to save.
     * @return the persisted entity.
     */
    Enterprise save(Enterprise enterprise);

    /**
     * Updates a enterprise.
     *
     * @param enterprise the entity to update.
     * @return the persisted entity.
     */
    Enterprise update(Enterprise enterprise);

    /**
     * Partially updates a enterprise.
     *
     * @param enterprise the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Enterprise> partialUpdate(Enterprise enterprise);

    /**
     * Get all the enterprises.
     *
     * @return the list of entities.
     */
    List<Enterprise> findAll();

    /**
     * Get the "id" enterprise.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Enterprise> findOne(Long id);

    /**
     * Delete the "id" enterprise.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
