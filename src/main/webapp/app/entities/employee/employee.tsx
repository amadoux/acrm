import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, TextFormat, getPaginationState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities, reset } from './employee.reducer';

export const Employee = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );
  const [sorting, setSorting] = useState(false);

  const employeeList = useAppSelector(state => state.employee.entities);
  const loading = useAppSelector(state => state.employee.loading);
  const links = useAppSelector(state => state.employee.links);
  const updateSuccess = useAppSelector(state => state.employee.updateSuccess);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  };

  const resetAll = () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    dispatch(getEntities({}));
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      resetAll();
    }
  }, [updateSuccess]);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if ((window as any).pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1,
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    dispatch(reset());
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
    setSorting(true);
  };

  const handleSyncList = () => {
    resetAll();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="employee-heading" data-cy="EmployeeHeading">
        <Translate contentKey="acrmApp.employee.home.title">Employees</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="acrmApp.employee.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/employee/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="acrmApp.employee.home.createLabel">Create new Employee</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          dataLength={employeeList ? employeeList.length : 0}
          next={handleLoadMore}
          hasMore={paginationState.activePage - 1 < links.next}
          loader={<div className="loader">Loading ...</div>}
        >
          {employeeList && employeeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="acrmApp.employee.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                  </th>
                  <th className="hand" onClick={sort('firstName')}>
                    <Translate contentKey="acrmApp.employee.firstName">First Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('firstName')} />
                  </th>
                  <th className="hand" onClick={sort('lastName')}>
                    <Translate contentKey="acrmApp.employee.lastName">Last Name</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('lastName')} />
                  </th>
                  <th className="hand" onClick={sort('email')}>
                    <Translate contentKey="acrmApp.employee.email">Email</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('email')} />
                  </th>
                  <th className="hand" onClick={sort('phoneNumber')}>
                    <Translate contentKey="acrmApp.employee.phoneNumber">Phone Number</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('phoneNumber')} />
                  </th>
                  <th className="hand" onClick={sort('identityCard')}>
                    <Translate contentKey="acrmApp.employee.identityCard">Identity Card</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('identityCard')} />
                  </th>
                  <th className="hand" onClick={sort('dateInspiration')}>
                    <Translate contentKey="acrmApp.employee.dateInspiration">Date Inspiration</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('dateInspiration')} />
                  </th>
                  <th className="hand" onClick={sort('nationality')}>
                    <Translate contentKey="acrmApp.employee.nationality">Nationality</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('nationality')} />
                  </th>
                  <th className="hand" onClick={sort('uploadIdentityCard')}>
                    <Translate contentKey="acrmApp.employee.uploadIdentityCard">Upload Identity Card</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('uploadIdentityCard')} />
                  </th>
                  <th className="hand" onClick={sort('typeEmployed')}>
                    <Translate contentKey="acrmApp.employee.typeEmployed">Type Employed</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('typeEmployed')} />
                  </th>
                  <th className="hand" onClick={sort('cityAgency')}>
                    <Translate contentKey="acrmApp.employee.cityAgency">City Agency</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('cityAgency')} />
                  </th>
                  <th className="hand" onClick={sort('residenceCity')}>
                    <Translate contentKey="acrmApp.employee.residenceCity">Residence City</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('residenceCity')} />
                  </th>
                  <th className="hand" onClick={sort('address')}>
                    <Translate contentKey="acrmApp.employee.address">Address</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('address')} />
                  </th>
                  <th className="hand" onClick={sort('socialSecurityNumber')}>
                    <Translate contentKey="acrmApp.employee.socialSecurityNumber">Social Security Number</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('socialSecurityNumber')} />
                  </th>
                  <th className="hand" onClick={sort('birthDate')}>
                    <Translate contentKey="acrmApp.employee.birthDate">Birth Date</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('birthDate')} />
                  </th>
                  <th className="hand" onClick={sort('birthPlace')}>
                    <Translate contentKey="acrmApp.employee.birthPlace">Birth Place</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('birthPlace')} />
                  </th>
                  <th className="hand" onClick={sort('entryDate')}>
                    <Translate contentKey="acrmApp.employee.entryDate">Entry Date</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('entryDate')} />
                  </th>
                  <th className="hand" onClick={sort('releaseDate')}>
                    <Translate contentKey="acrmApp.employee.releaseDate">Release Date</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('releaseDate')} />
                  </th>
                  <th className="hand" onClick={sort('workstation')}>
                    <Translate contentKey="acrmApp.employee.workstation">Workstation</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('workstation')} />
                  </th>
                  <th className="hand" onClick={sort('descriptionWorkstation')}>
                    <Translate contentKey="acrmApp.employee.descriptionWorkstation">Description Workstation</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('descriptionWorkstation')} />
                  </th>
                  <th className="hand" onClick={sort('level')}>
                    <Translate contentKey="acrmApp.employee.level">Level</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('level')} />
                  </th>
                  <th className="hand" onClick={sort('coefficient')}>
                    <Translate contentKey="acrmApp.employee.coefficient">Coefficient</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('coefficient')} />
                  </th>
                  <th className="hand" onClick={sort('numberHours')}>
                    <Translate contentKey="acrmApp.employee.numberHours">Number Hours</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('numberHours')} />
                  </th>
                  <th className="hand" onClick={sort('averageHourlyCost')}>
                    <Translate contentKey="acrmApp.employee.averageHourlyCost">Average Hourly Cost</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('averageHourlyCost')} />
                  </th>
                  <th className="hand" onClick={sort('monthlyGrossAmount')}>
                    <Translate contentKey="acrmApp.employee.monthlyGrossAmount">Monthly Gross Amount</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('monthlyGrossAmount')} />
                  </th>
                  <th className="hand" onClick={sort('commissionAmount')}>
                    <Translate contentKey="acrmApp.employee.commissionAmount">Commission Amount</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('commissionAmount')} />
                  </th>
                  <th className="hand" onClick={sort('contractType')}>
                    <Translate contentKey="acrmApp.employee.contractType">Contract Type</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('contractType')} />
                  </th>
                  <th className="hand" onClick={sort('salaryType')}>
                    <Translate contentKey="acrmApp.employee.salaryType">Salary Type</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('salaryType')} />
                  </th>
                  <th className="hand" onClick={sort('hireDate')}>
                    <Translate contentKey="acrmApp.employee.hireDate">Hire Date</Translate>{' '}
                    <FontAwesomeIcon icon={getSortIconByFieldName('hireDate')} />
                  </th>
                  <th>
                    <Translate contentKey="acrmApp.employee.enterprise">Enterprise</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="acrmApp.employee.manager">Manager</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="acrmApp.employee.department">Department</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {employeeList.map((employee, i) => (
                  <tr key={`entity-${i}`} data-cy="entityTable">
                    <td>
                      <Button tag={Link} to={`/employee/${employee.id}`} color="link" size="sm">
                        {employee.id}
                      </Button>
                    </td>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.identityCard}</td>
                    <td>
                      {employee.dateInspiration ? (
                        <TextFormat type="date" value={employee.dateInspiration} format={APP_DATE_FORMAT} />
                      ) : null}
                    </td>
                    <td>
                      <Translate contentKey={`acrmApp.Pays.${employee.nationality}`} />
                    </td>
                    <td>
                      {employee.uploadIdentityCard ? (
                        <div>
                          {employee.uploadIdentityCardContentType ? (
                            <a onClick={openFile(employee.uploadIdentityCardContentType, employee.uploadIdentityCard)}>
                              <Translate contentKey="entity.action.open">Open</Translate>
                              &nbsp;
                            </a>
                          ) : null}
                          <span>
                            {employee.uploadIdentityCardContentType}, {byteSize(employee.uploadIdentityCard)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>
                      <Translate contentKey={`acrmApp.TypeEmployed.${employee.typeEmployed}`} />
                    </td>
                    <td>{employee.cityAgency}</td>
                    <td>{employee.residenceCity}</td>
                    <td>{employee.address}</td>
                    <td>{employee.socialSecurityNumber}</td>
                    <td>{employee.birthDate ? <TextFormat type="date" value={employee.birthDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>{employee.birthPlace}</td>
                    <td>{employee.entryDate ? <TextFormat type="date" value={employee.entryDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>
                      {employee.releaseDate ? <TextFormat type="date" value={employee.releaseDate} format={APP_DATE_FORMAT} /> : null}
                    </td>
                    <td>{employee.workstation}</td>
                    <td>{employee.descriptionWorkstation}</td>
                    <td>
                      <Translate contentKey={`acrmApp.Level.${employee.level}`} />
                    </td>
                    <td>{employee.coefficient}</td>
                    <td>{employee.numberHours}</td>
                    <td>{employee.averageHourlyCost}</td>
                    <td>{employee.monthlyGrossAmount}</td>
                    <td>{employee.commissionAmount}</td>
                    <td>
                      <Translate contentKey={`acrmApp.ContractType.${employee.contractType}`} />
                    </td>
                    <td>
                      <Translate contentKey={`acrmApp.SalaryType.${employee.salaryType}`} />
                    </td>
                    <td>{employee.hireDate ? <TextFormat type="date" value={employee.hireDate} format={APP_DATE_FORMAT} /> : null}</td>
                    <td>
                      {employee.enterprise ? (
                        <Link to={`/enterprise/${employee.enterprise.id}`}>{employee.enterprise.compagnyName}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{employee.manager ? <Link to={`/employee/${employee.manager.id}`}>{employee.manager.email}</Link> : ''}</td>
                    <td>{employee.department ? <Link to={`/department/${employee.department.id}`}>{employee.department.id}</Link> : ''}</td>
                    <td className="text-end">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/employee/${employee.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`/employee/${employee.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button
                          onClick={() => (window.location.href = `/employee/${employee.id}/delete`)}
                          color="danger"
                          size="sm"
                          data-cy="entityDeleteButton"
                        >
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="acrmApp.employee.home.notFound">No Employees found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Employee;
