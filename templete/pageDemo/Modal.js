import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const modal = ({
    item = {},
    onOk,
    isCreateMode,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
    },
    ...modalProps
}) => {
    const handleOk = () => {
        validateFields((errors) => {
            if (errors) {
                return;
            }
            const data = {
                ...getFieldsValue(),
            };
            onOk(data);
        });
    };

    const modalOpts = {
        ...modalProps,
        onOk: handleOk,
    };

    return (
        <Modal {...modalOpts}>
            <Form layout="horizontal">
                <FormItem label="租户" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('tenantName', {
                        initialValue: item.tenantName,
                        rules: [
                            {
                                required: true,
                                type: 'string',
                                message: '请输入租户',
                            },
                        ],
                    })(<Input placeholder="请输入租户" />)}
                </FormItem>
                <FormItem label="IP地址" hasFeedback {...formItemLayout}>
                    {getFieldDecorator('ipAddress', {
                        initialValue: item.ipAddress,
                        rules: [
                            {
                                required: true,
                                type: 'string',
                                message: '请输入正确IP地址',
                                pattern: /^(?:(?:25[0-5]|2[0-4]\d|(?:1\d{2}|[1-9]?\d)|\*)\.){3}(?:25[0-5]|2[0-4]\d|(?:1\d{2}|[1-9]?\d)|\*)$/,
                            },
                        ],
                    })(<Input />)}
                </FormItem>
            </Form>
        </Modal>
    );
};

modal.propTypes = {
    form: PropTypes.object.isRequired,
    item: PropTypes.object,
    onOk: PropTypes.func,
    isCreateMode: PropTypes.bool,
};

modal.defaultProps = {
    item: {},
    onOk: () => {},
    isCreateMode: true,
};

export default Form.create()(modal);
