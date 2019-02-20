import React from 'react';
import PropTypes from 'prop-types';
import { Table, Modal } from 'antd';
import { DropOption, withUrlSort } from '@/components';

const { Column } = Table;
const { confirm } = Modal;

const List = ({
    sort, onEditItem, onDeleteItem, ...tableProps
}) => {
    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record);
        } else if (e.key === '2') {
            confirm({
                title: '确定删除记录吗?',
                onOk() {
                    onDeleteItem(record.id);
                },
            });
        }
    };

    return (
        <Table
            {...tableProps}
            bordered
            simple
            scroll=\{{ x: 800 }}
            rowKey={record => record.id}
        >
            <Column
                title="IP地址"
                dataIndex="ipAddress"
                key="ipAddress"
                sorter="true"
                sortOrder={sort.ipAddress}
            />
            <Column
                title="优先级"
                dataIndex="ipPriority"
                key="ipPriority"
                sorter="true"
                sortOrder={sort.ipPriority}
            />
            <Column
                title="操作"
                dataIndex="operation"
                key="operation"
                width="100px"
                fixed="right"
                render={(text, record) => (
                    <DropOption
                        onMenuClick={e => handleMenuClick(record, e)}
                        menuOptions={[{ key: '1', name: '修改' },
                            { key: '2', name: '删除' }]}
                    />
                )}
            />
        </Table>
    );
};

List.propTypes = {
    sort: PropTypes.object.isRequired,
    tableProps: PropTypes.object,
    onEditItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
};

List.defaultProps = {
    tableProps: {},
};

export default withUrlSort(List);
