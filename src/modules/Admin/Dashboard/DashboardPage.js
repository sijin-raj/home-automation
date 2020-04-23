import PropTypes from 'prop-types';
import React from 'react';
import AdminCommonLayout from '../../../_components/admin-common-layout/AdminCommonLayout';

const DashboardPage = () => {
  return <AdminCommonLayout />;
};

DashboardPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
    footer: PropTypes.string.isRequired,
  }),
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default DashboardPage;
