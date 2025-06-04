import React, { useState } from "react";
import { Table, Modal, Pagination, ConfigProvider, Form, Input, Button, message } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";

const AllDocument = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Sample data for API keys
    const demoApiKeys = [
        {
            key: "1",
            apiName: "Payment Gateway API",
            createdDate: "2025-06-10T10:00:00",
        },
        {
            key: "2",
            apiName: "User Management API",
            createdDate: "2025-05-15T14:30:00",
        },
        {
            key: "3",
            apiName: "Order Service API",
            createdDate: "2025-04-20T09:00:00",
        },
    ];

    const columns = [
        {
            title: "#SI",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "API Key Name",
            dataIndex: "apiName",
            key: "apiName",
        },
        {
            title: "Created Date",
            dataIndex: "createdDate",
            key: "createdDate",
            render: (text) => moment(text).format("DD MMM YYYY, hh:mm A"), // Format the date
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <div className="flex gap-3">
                    <FaInfoCircle
                        className="text-xl cursor-pointer hover:text-blue-500"
                        onClick={() => showDetails(record)}
                    />
                    <MdDeleteForever
                        className="text-2xl cursor-pointer text-red-600 hover:text-red-500"
                        onClick={() => handleDelete(record)}
                    />
                </div>
            ),
        },
    ];

    const showDetails = (record) => {
        setSelectedKey(record);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedKey(null);
        setIsModalVisible(false);
    };

    const handleDelete = async (item) => {
        // Delete logic (e.g., API call)
        console.log("Deleting API Key:", item);
        message.success(`API Key "${item.apiName}" has been deleted!`);
    };

    const handleOpenAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalVisible(false);
        form.resetFields(); // Reset form fields after closing
    };

    const handleAddApiKey = async (values) => {
        console.log("Adding new API Key:", values);
        message.success("New API Key added!");
        handleCloseAddModal();
    };

    const paginatedData = demoApiKeys.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="py-10 text-base">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-semibold mb-4 text-[#4b1c2f]">API Keys Management</h2>
                <button
                    onClick={handleOpenAddModal}
                    className="bg-[#4b1c2f] text-white text-xl py-2 px-8 rounded"
                >
                    Add API Key
                </button>
            </div>

            {/* Table with Ant Design ConfigProvider */}
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: "#4b1c2f",
                            headerColor: "#fff",
                            headerBorderRadius: 5,
                        },
                    },
                }}
            >
                <Table
                    pagination={false} // Disabled default pagination to use custom
                    scroll={{ x: "max-content" }}
                    columns={columns}
                    dataSource={paginatedData}
                    rowKey="key"
                    bordered
                    className="shadow-md"
                />
            </ConfigProvider>

            {/* Custom Pagination */}
            <div className="flex justify-center mt-5">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={demoApiKeys.length}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                />
            </div>

            {/* API Key Details Modal */}
            <Modal
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                title="API Key Details"
            >
                {selectedKey && (
                    <div className="text-gray-700">
                        <p className="my-5 flex items-center justify-between"><strong>API Key Name:</strong> {selectedKey.apiName}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Created Date:</strong> {moment(selectedKey.createdDate).format("DD MMM YYYY, hh:mm A")}</p>
                    </div>
                )}
            </Modal>

            {/* Add API Key Modal */}
            <Modal
                open={isAddModalVisible}
                onCancel={handleCloseAddModal}
                footer={null}
                title="Add New API Key"
            >
                <Form form={form} layout="vertical" onFinish={handleAddApiKey}>
                    <Form.Item
                        label="API Key Name"
                        name="apiName"
                        rules={[{ required: true, message: "Please enter API key name" }]}
                    >
                        <Input placeholder="Enter API key name" />
                    </Form.Item>
                    <Form.Item
                        label="API Key Link"
                        name="apiName"
                        rules={[{ required: true, message: "Please enter API key Link" }]}
                    >
                        <Input placeholder="Enter API key Link" />
                    </Form.Item>
                    <div className="text-center mt-5">
                        <button className="bg-[#4b1c2f] text-white text-xl py-2 px-8 rounded" htmlType="submit">Add API Key</button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AllDocument;
