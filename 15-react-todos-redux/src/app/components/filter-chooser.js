import React from 'react';
const FilterChooser = ({ filter, setVisibilityFilter }) => (
  <select className="status-filter form-control col-lg-3" value={filter} onChange={e => setVisibilityFilter(e.target.value)}>
    <option value="all">All</option>
    <option value="active">Active</option>
    <option value="completed">Completed</option>
    <option value="canceled">Canceled</option>
  </select >);

export default FilterChooser;
