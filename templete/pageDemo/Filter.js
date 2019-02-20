import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import { Filter } from '@/components';

const FilterComponent = ({ filter, onSearch }) => {
    const { tenantName, ipAddress } = filter;

    const filterProps = {
        onSearch,
        items: [{
            label: '租户',
            value: tenantName,
            key: 'tenantName',
            child: <Input />,
        }, {
            label: 'IP地址',
            value: ipAddress,
            key: 'ipAddress',
            child: <Input />,
        }],
    };

    return (
        <Filter {...filterProps} />
    );
};

FilterComponent.propTypes = {
    filter: PropTypes.object,
    onSearch: PropTypes.func,
};

FilterComponent.defaultProps = {
    filter: {},
    onSearch: () => {},
};

export default FilterComponent;
