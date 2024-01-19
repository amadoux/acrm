package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.Enterprise;
import com.mycompany.myapp.repository.EnterpriseRepository;
import com.mycompany.myapp.service.EnterpriseService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link com.mycompany.myapp.domain.Enterprise}.
 */
@Service
@Transactional
public class EnterpriseServiceImpl implements EnterpriseService {

    private final Logger log = LoggerFactory.getLogger(EnterpriseServiceImpl.class);

    private final EnterpriseRepository enterpriseRepository;

    public EnterpriseServiceImpl(EnterpriseRepository enterpriseRepository) {
        this.enterpriseRepository = enterpriseRepository;
    }

    @Override
    public Enterprise save(Enterprise enterprise) {
        log.debug("Request to save Enterprise : {}", enterprise);
        return enterpriseRepository.save(enterprise);
    }

    @Override
    public Enterprise update(Enterprise enterprise) {
        log.debug("Request to update Enterprise : {}", enterprise);
        return enterpriseRepository.save(enterprise);
    }

    @Override
    public Optional<Enterprise> partialUpdate(Enterprise enterprise) {
        log.debug("Request to partially update Enterprise : {}", enterprise);

        return enterpriseRepository
            .findById(enterprise.getId())
            .map(existingEnterprise -> {
                if (enterprise.getCompanyName() != null) {
                    existingEnterprise.setCompanyName(enterprise.getCompanyName());
                }
                if (enterprise.getBusinessRegisterNumber() != null) {
                    existingEnterprise.setBusinessRegisterNumber(enterprise.getBusinessRegisterNumber());
                }
                if (enterprise.getUniqueIdentificationNumber() != null) {
                    existingEnterprise.setUniqueIdentificationNumber(enterprise.getUniqueIdentificationNumber());
                }
                if (enterprise.getBusinessDomicile() != null) {
                    existingEnterprise.setBusinessDomicile(enterprise.getBusinessDomicile());
                }
                if (enterprise.getEmail() != null) {
                    existingEnterprise.setEmail(enterprise.getEmail());
                }
                if (enterprise.getBusinessPhone() != null) {
                    existingEnterprise.setBusinessPhone(enterprise.getBusinessPhone());
                }
                if (enterprise.getCountry() != null) {
                    existingEnterprise.setCountry(enterprise.getCountry());
                }
                if (enterprise.getCity() != null) {
                    existingEnterprise.setCity(enterprise.getCity());
                }
                if (enterprise.getBusinessLogo() != null) {
                    existingEnterprise.setBusinessLogo(enterprise.getBusinessLogo());
                }
                if (enterprise.getBusinessLogoContentType() != null) {
                    existingEnterprise.setBusinessLogoContentType(enterprise.getBusinessLogoContentType());
                }
                if (enterprise.getMapLocator() != null) {
                    existingEnterprise.setMapLocator(enterprise.getMapLocator());
                }
                if (enterprise.getMapLocatorContentType() != null) {
                    existingEnterprise.setMapLocatorContentType(enterprise.getMapLocatorContentType());
                }

                return existingEnterprise;
            })
            .map(enterpriseRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Enterprise> findAll() {
        log.debug("Request to get all Enterprises");
        return enterpriseRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Enterprise> findOne(Long id) {
        log.debug("Request to get Enterprise : {}", id);
        return enterpriseRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Enterprise : {}", id);
        enterpriseRepository.deleteById(id);
    }
}
