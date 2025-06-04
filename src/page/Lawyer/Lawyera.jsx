import React, { useState } from "react";
import { Table, Modal, Pagination, ConfigProvider, Form, Input, Button, message } from "antd";
import { FaInfoCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import moment from "moment";

const CustomerBookings = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Sample data for customer bookings
    const demoBookings = [
        {
            key: "1",
            userName: "John Doe",
            email: "johndoe@example.com",
            restaurantName: "The Gourmet Spot",
            bookingDateTime: "2025-06-10T19:00:00",
            numberOfSeats: 4,
            bookingAmount: "$100",
            bookingStatus: "Confirmed",
        },
        {
            key: "2",
            userName: "Jane Smith",
            email: "janesmith@example.com",
            restaurantName: "Bistro 101",
            bookingDateTime: "2025-06-11T18:30:00",
            numberOfSeats: 2,
            bookingAmount: "$50",
            bookingStatus: "Pending",
        },
        {
            key: "3",
            userName: "Michael Johnson",
            email: "michaelj@example.com",
            restaurantName: "Spice Lounge",
            bookingDateTime: "2025-06-12T20:00:00",
            numberOfSeats: 6,
            bookingAmount: "$150",
            bookingStatus: "Cancelled",
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
            title: "Customer User Name",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "E-Mail",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Restaurant Name",
            dataIndex: "restaurantName",
            key: "restaurantName",
        },
        {
            title: "Booking Date & Time",
            dataIndex: "bookingDateTime",
            key: "bookingDateTime",
            render: (text) => moment(text).format("DD MMM YYYY, hh:mm A"), // Format the date
        },
        {
            title: "Number of Seats",
            dataIndex: "numberOfSeats",
            key: "numberOfSeats",
        },
        {
            title: "Booking Amount",
            dataIndex: "bookingAmount",
            key: "bookingAmount",
        },
        {
            title: "Booking Status",
            dataIndex: "bookingStatus",
            key: "bookingStatus",
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
        setSelectedBooking(record);
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setSelectedBooking(null);
        setIsModalVisible(false);
    };

    const handleDelete = async (item) => {
        // Delete logic (e.g., API call)
        console.log("Deleting booking:", item);
        message.success(`Booking for ${item.userName} has been deleted!`);
    };

    const handleOpenAddModal = () => {
        setIsAddModalVisible(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalVisible(false);
        form.resetFields(); // Reset form fields after closing
    };

    const handleAddBooking = async (values) => {
        console.log("Adding new booking:", values);
        message.success("New booking added!");
        handleCloseAddModal();
    };

    const paginatedData = demoBookings.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="py-10 text-base">
            {/* Header with Add Button */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl font-semibold mb-4 text-[#4b1c2f]">Booking List</h2>

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
                    total={demoBookings.length}
                    onChange={setCurrentPage}
                    showSizeChanger={false}
                />
            </div>

            {/* Booking Details Modal */}
            <Modal
                open={isModalVisible}
                onCancel={handleCloseModal}
                footer={null}
                title="Booking Details"
            >
                {selectedBooking && (
                    <div className="text-gray-700">
                        <p className="my-5 flex items-center justify-between"><strong>Customer Name:</strong> {selectedBooking.userName}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Email:</strong> {selectedBooking.email}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Restaurant:</strong> {selectedBooking.restaurantName}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Booking Date:</strong> {moment(selectedBooking.bookingDateTime).format("DD MMM YYYY, hh:mm A")}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Number of Seats:</strong> {selectedBooking.numberOfSeats}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Booking Amount:</strong> {selectedBooking.bookingAmount}</p>
                        <p className="my-5 flex items-center justify-between"><strong>Status:</strong> {selectedBooking.bookingStatus}</p>
                    </div>
                )}
            </Modal>

            {/* Add Booking Modal */}
            <Modal
                open={isAddModalVisible}
                onCancel={handleCloseAddModal}
                footer={null}
                title="Add New Booking"
            >
                <Form form={form} layout="vertical" onFinish={handleAddBooking}>
                    <Form.Item
                        label="Customer Name"
                        name="customerName"
                        rules={[{ required: true, message: "Please enter customer name" }]}
                    >
                        <Input placeholder="Enter customer name" />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: "Please enter email" }, { type: "email", message: "Enter a valid email" }]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        label="Restaurant Name"
                        name="restaurantName"
                        rules={[{ required: true, message: "Please enter restaurant name" }]}
                    >
                        <Input placeholder="Enter restaurant name" />
                    </Form.Item>
                    <Form.Item
                        label="Booking Date & Time"
                        name="bookingDateTime"
                        rules={[{ required: true, message: "Please select booking date & time" }]}
                    >
                        <Input placeholder="Enter booking date & time" />
                    </Form.Item>
                    <Form.Item
                        label="Number of Seats"
                        name="numberOfSeats"
                        rules={[{ required: true, message: "Please enter number of seats" }]}
                    >
                        <Input type="number" placeholder="Enter number of seats" />
                    </Form.Item>
                    <Form.Item
                        label="Booking Amount"
                        name="bookingAmount"
                        rules={[{ required: true, message: "Please enter booking amount" }]}
                    >
                        <Input placeholder="Enter booking amount" />
                    </Form.Item>
                    <Form.Item
                        label="Booking Status"
                        name="bookingStatus"
                        rules={[{ required: true, message: "Please select booking status" }]}
                    >
                        <Input placeholder="Enter booking status" />
                    </Form.Item>
                    <div className="text-center mt-5">
                        <Button type="primary" htmlType="submit">Add Booking</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CustomerBookings;
