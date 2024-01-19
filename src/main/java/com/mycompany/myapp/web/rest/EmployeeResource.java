package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Employee;
import com.mycompany.myapp.repository.EmployeeRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Employee}.
 */
@RestController
@RequestMapping("/api/employees")
@Transactional
public class EmployeeResource {

    private final Logger log = LoggerFactory.getLogger(EmployeeResource.class);

    private static final String ENTITY_NAME = "employee";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EmployeeRepository employeeRepository;

    public EmployeeResource(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * {@code POST  /employees} : Create a new employee.
     *
     * @param employee the employee to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new employee, or with status {@code 400 (Bad Request)} if the employee has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<Employee> createEmployee(@Valid @RequestBody Employee employee) throws URISyntaxException {
        log.debug("REST request to save Employee : {}", employee);
        if (employee.getId() != null) {
            throw new BadRequestAlertException("A new employee cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Employee result = employeeRepository.save(employee);
        return ResponseEntity
            .created(new URI("/api/employees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /employees/:id} : Updates an existing employee.
     *
     * @param id the id of the employee to save.
     * @param employee the employee to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employee,
     * or with status {@code 400 (Bad Request)} if the employee is not valid,
     * or with status {@code 500 (Internal Server Error)} if the employee couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Employee employee
    ) throws URISyntaxException {
        log.debug("REST request to update Employee : {}, {}", id, employee);
        if (employee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, employee.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!employeeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Employee result = employeeRepository.save(employee);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employee.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /employees/:id} : Partial updates given fields of an existing employee, field will ignore if it is null
     *
     * @param id the id of the employee to save.
     * @param employee the employee to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated employee,
     * or with status {@code 400 (Bad Request)} if the employee is not valid,
     * or with status {@code 404 (Not Found)} if the employee is not found,
     * or with status {@code 500 (Internal Server Error)} if the employee couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Employee> partialUpdateEmployee(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Employee employee
    ) throws URISyntaxException {
        log.debug("REST request to partial update Employee partially : {}, {}", id, employee);
        if (employee.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, employee.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!employeeRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Employee> result = employeeRepository
            .findById(employee.getId())
            .map(existingEmployee -> {
                if (employee.getFirstName() != null) {
                    existingEmployee.setFirstName(employee.getFirstName());
                }
                if (employee.getLastName() != null) {
                    existingEmployee.setLastName(employee.getLastName());
                }
                if (employee.getEmail() != null) {
                    existingEmployee.setEmail(employee.getEmail());
                }
                if (employee.getPhoneNumber() != null) {
                    existingEmployee.setPhoneNumber(employee.getPhoneNumber());
                }
                if (employee.getIdentityCard() != null) {
                    existingEmployee.setIdentityCard(employee.getIdentityCard());
                }
                if (employee.getDateInspiration() != null) {
                    existingEmployee.setDateInspiration(employee.getDateInspiration());
                }
                if (employee.getNationality() != null) {
                    existingEmployee.setNationality(employee.getNationality());
                }
                if (employee.getUploadIdentityCard() != null) {
                    existingEmployee.setUploadIdentityCard(employee.getUploadIdentityCard());
                }
                if (employee.getUploadIdentityCardContentType() != null) {
                    existingEmployee.setUploadIdentityCardContentType(employee.getUploadIdentityCardContentType());
                }
                if (employee.getTypeEmployed() != null) {
                    existingEmployee.setTypeEmployed(employee.getTypeEmployed());
                }
                if (employee.getCityAgency() != null) {
                    existingEmployee.setCityAgency(employee.getCityAgency());
                }
                if (employee.getResidenceCity() != null) {
                    existingEmployee.setResidenceCity(employee.getResidenceCity());
                }
                if (employee.getAddress() != null) {
                    existingEmployee.setAddress(employee.getAddress());
                }
                if (employee.getSocialSecurityNumber() != null) {
                    existingEmployee.setSocialSecurityNumber(employee.getSocialSecurityNumber());
                }
                if (employee.getBirthDate() != null) {
                    existingEmployee.setBirthDate(employee.getBirthDate());
                }
                if (employee.getBirthPlace() != null) {
                    existingEmployee.setBirthPlace(employee.getBirthPlace());
                }
                if (employee.getEntryDate() != null) {
                    existingEmployee.setEntryDate(employee.getEntryDate());
                }
                if (employee.getReleaseDate() != null) {
                    existingEmployee.setReleaseDate(employee.getReleaseDate());
                }
                if (employee.getWorkstation() != null) {
                    existingEmployee.setWorkstation(employee.getWorkstation());
                }
                if (employee.getDescriptionWorkstation() != null) {
                    existingEmployee.setDescriptionWorkstation(employee.getDescriptionWorkstation());
                }
                if (employee.getLevel() != null) {
                    existingEmployee.setLevel(employee.getLevel());
                }
                if (employee.getCoefficient() != null) {
                    existingEmployee.setCoefficient(employee.getCoefficient());
                }
                if (employee.getNumberHours() != null) {
                    existingEmployee.setNumberHours(employee.getNumberHours());
                }
                if (employee.getAverageHourlyCost() != null) {
                    existingEmployee.setAverageHourlyCost(employee.getAverageHourlyCost());
                }
                if (employee.getMonthlyGrossAmount() != null) {
                    existingEmployee.setMonthlyGrossAmount(employee.getMonthlyGrossAmount());
                }
                if (employee.getCommissionAmount() != null) {
                    existingEmployee.setCommissionAmount(employee.getCommissionAmount());
                }
                if (employee.getContractType() != null) {
                    existingEmployee.setContractType(employee.getContractType());
                }
                if (employee.getSalaryType() != null) {
                    existingEmployee.setSalaryType(employee.getSalaryType());
                }
                if (employee.getHireDate() != null) {
                    existingEmployee.setHireDate(employee.getHireDate());
                }

                return existingEmployee;
            })
            .map(employeeRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, employee.getId().toString())
        );
    }

    /**
     * {@code GET  /employees} : get all the employees.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of employees in body.
     */
    @GetMapping("")
    public ResponseEntity<List<Employee>> getAllEmployees(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "filter", required = false) String filter
    ) {
        if ("jobhistory-is-null".equals(filter)) {
            log.debug("REST request to get all Employees where jobHistory is null");
            return new ResponseEntity<>(
                StreamSupport
                    .stream(employeeRepository.findAll().spliterator(), false)
                    .filter(employee -> employee.getJobHistory() == null)
                    .toList(),
                HttpStatus.OK
            );
        }
        log.debug("REST request to get a page of Employees");
        Page<Employee> page = employeeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /employees/:id} : get the "id" employee.
     *
     * @param id the id of the employee to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the employee, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployee(@PathVariable("id") Long id) {
        log.debug("REST request to get Employee : {}", id);
        Optional<Employee> employee = employeeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(employee);
    }

    /**
     * {@code DELETE  /employees/:id} : delete the "id" employee.
     *
     * @param id the id of the employee to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable("id") Long id) {
        log.debug("REST request to delete Employee : {}", id);
        employeeRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
