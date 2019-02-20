import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import queryString from 'query-string';
import { crypto } from '@/utils';
import { Row, Button, Card, Modal } from 'antd';
import Filter from './Filter';
import List from './List';
import MyModal from './Modal';

const { confirm } = Modal;

@connect(({ {{generateName}}, loading }) => ({ {{generateName}}, loading }))
class {{firstLettertoUpperCase generateName}} extends React.PureComponent {
    static propTypes = {
        location: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        {{generateName}}: PropTypes.object,
        loading: PropTypes.object.isRequired,
    };

    static defaultProps = {
        {{generateName}}: {},
    };

    constructor(props) {
        super(props);
        this.dialogs = [];
        this.dialogContainer = document.getElementById('dialog-root');

        this.state = {
            modalVisible: false,
            modalType: 'create',
        };
    }

    handleAddClick = () => {
        this.setState(() => ({ modalVisible: true, modalType: 'create' }));
    };

    handleEditClick = (item) => {
        const { dispatch } = this.props;
        this.setState(() => ({ modalVisible: true, modalType: 'update' }));
        dispatch({
            type: '{{generateName}}/updateState',
            payload: {
                currentItem: item,
            },
        });
    };

    handleDeleteClick = () => {
        const { {{generateName}}: { selectedRowKeys }, dispatch, location } = this.props;
        const queryParams = crypto.decrypt(queryString.parse(location.search).params);
        confirm({
            title: `确定删除${selectedRowKeys.length}条记录吗?`,
            onOk() {
                dispatch({
                    type: '{{generateName}}/delete',
                    payload: {
                        resetQuery: {
                            ...queryParams,
                        }, // 确保更新后搜索条件不变
                    },
                });
            },
        });
    };

    handleSingleDelete = (item) => {
        const { dispatch, location } = this.props;
        const queryParams = crypto.decrypt(queryString.parse(location.search).params);
        dispatch({
            type: '{{generateName}}/deleteSingle',
            payload: {
                deleteItem: item,
                resetQuery: {
                    ...queryParams,
                }, // 确保更新后搜索条件不变
            },
        });
    };

    generateDialogs = () => {
        const { dispatch, {{generateName}}: { currentItem }, loading, tenantList } = this.props;
        const { modalVisible, modalType } = this.state;
        const queryParams = crypto.decrypt(queryString.parse(location.search).params);
        this.dialogs = [];
        if (modalVisible) {
            const modalProps = {
                tenantList,
                isCreateMode: modalType === 'create',
                item: modalType === 'create' ? {} : currentItem,
                visible: modalVisible,
                maskClosable: false,
                confirmLoading: loading.effects[modalType === 'create' ? '{{generateName}}/create' : '{{generateName}}/update'],
                title: `${modalType === 'create' ? '增加' : '修改'}`,
                wrapClassName: 'vertical-center-modal',
                onOk: (data) => {
                    dispatch({
                        type: `{{generateName}}/${modalType}`,
                        payload: {
                            ...data,
                            resetQuery: {
                                ...queryParams,
                            }, // 确保更新后搜索条件不变
                        },
                    }).then(() => modalProps.onCancel());
                },
                onCancel: () => {
                    this.setState(() => ({ modalVisible: false }));
                },
            };
            this.dialogs.push(<MyModal key="createModal" {...modalProps} />);
        }
    };

    render() {
        const { location, dispatch, {{generateName}}, loading, tenantList } = this.props;
        const { list, pagination, selectedRowKeys } = {{generateName}};
        const { size } = pagination;
        const { pathname } = location;
        const queryParams = crypto.decrypt(queryString.parse(location.search).params);
        const isRemovable = selectedRowKeys.length !== 0;

        const filterProps = {
            filter: {
                tenantList,
                ...queryParams,
            },
            onSearch: (value) => {
                dispatch(routerRedux.push({
                    pathname,
                    search: `params=${crypto.encrypt({
                        ...value,
                        current: 1,
                        size,
                    })}`,
                }));
            },
        };

        // reset dialogs
        this.generateDialogs();

        const listProps = {
            pagination,
            location,
            onEditItem: this.handleEditClick,
            onDeleteItem: this.handleSingleDelete,
            dataSource: list,
            loading: loading.effects['{{generateName}}/query'],
            onChange: (page, filters, sorter) => {
                // 与后端接口兼容
                const sorterOrder = (sorter.order === 'descend') ? 'desc' : 'asc';
                dispatch(routerRedux.push({
                    pathname,
                    search: `params=${crypto.encrypt({
                        ...queryParams,
                        current: page.current,
                        size: page.pageSize,
                        /* eslint-disable comma-spacing */
                        sort: sorter.field ? `${sorter.field},${sorterOrder}` : '',
                    })}`,
                }));
            },
            rowSelection: {
                selectedRowKeys,
                onChange: (keys) => {
                    dispatch({
                        type: '{{generateName}}/updateState',
                        payload: {
                            selectedRowKeys: keys,
                        },
                    });
                },
            },
        };

        return (
            <React.Fragment>
                <Card hoverable={false} title="查询条件" bordered={false}>
                    <Filter {...filterProps} />
                </Card>

                <Card
                    hoverable={false}
                    title="列表"
                    bordered={false}
                    style=\{{ marginTop: '10px' }}
                    extra={(
                        <span className="tableListOperator">
                            <Button type="primary" icon="plus" onClick={this.handleAddClick}>新增</Button>
                            { selectedRowKeys.length > 0 && <Button type="danger" icon="delete" disabled={!isRemovable} onClick={this.handleDeleteClick}>删除</Button> }
                        </span>
                    )}
                >
                    <Row style=\{{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
                        <List {...listProps} />
                    </Row>
                </Card>

                {/* create dialog using portal */}
                {ReactDOM.createPortal(this.dialogs, this.dialogContainer)}
            </React.Fragment>
        );
    }
}
export default {{firstLettertoUpperCase generateName}};
