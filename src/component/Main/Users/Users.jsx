import { useEffect, useState } from "react";
import {
  ConfigProvider,
  Form,
  Input,
  DatePicker,
  Card,
  Button,
  Modal,
} from "antd";
import moment from "moment";
import { IoIosSearch } from "react-icons/io";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GoInfo } from "react-icons/go";

const { Item } = Form;

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const demoUsers = [
    {
      id: 1,
      fullName: "Anika Alam",
      accountID: "1234567890",
      email: "abc@gmail.com",
      phoneNumber: "+880 18456229",
      address_line1: "1234 Elm Street",
      createdAt: "2025-05-02T00:00:00Z",
      imageUrl: "https://via.placeholder.com/150",
      status: "Active",
      gender: "Female",
    },
    {
      id: 2,
      fullName: "Anika Alam",
      accountID: "1234567890",
      email: "abc@gmail.com",
      phoneNumber: "+880 18456229",
      address_line1: "1234 Elm Street",
      createdAt: "2025-05-02T00:00:00Z",
      imageUrl: "https://via.placeholder.com/150",
      status: "Active",
      gender: "Female",
    },
    {
      id: 3,
      fullName: "Anika Alam",
      accountID: "1234567890",
      email: "abc@gmail.com",
      phoneNumber: "+880 18456229",
      address_line1: "1234 Elm Street",
      createdAt: "2025-05-02T00:00:00Z",
      imageUrl: "https://via.placeholder.com/150",
      status: "Active",
      gender: "Female",
    },
    {
      id: 4,
      fullName: "Anika Alam",
      accountID: "1234567890",
      email: "abc@gmail.com",
      phoneNumber: "+880 18456229",
      address_line1: "1234 Elm Street",
      createdAt: "2025-05-02T00:00:00Z",
      imageUrl: "https://via.placeholder.com/150",
      status: "Active",
      gender: "Female",
    },
    // Add more users if needed
  ];

  useEffect(() => {
    setDataSource(demoUsers);
  }, []);

  useEffect(() => {
    if (searchText.trim() === "") {
      setDataSource(demoUsers);
    } else {
      setDataSource(
        demoUsers.filter(
          (user) =>
            user.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchText.toLowerCase()) ||
            String(user.phoneNumber)?.includes(searchText)
        )
      );
    }
  }, [searchText]);

  useEffect(() => {
    if (!selectedDate) {
      setDataSource(demoUsers);
    } else {
      const formattedDate = selectedDate.format("YYYY-MM-DD");
      setDataSource(
        demoUsers.filter(
          (user) => moment(user.createdAt).format("YYYY-MM-DD") === formattedDate
        )
      );
    }
  }, [selectedDate]);

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleBlock = () => {
    alert(`Blocked user: ${selectedUser.fullName}`);
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className="md:flex justify-between items-center py-6 mb-4">
        <Link to={"/collaborator"} className="text-2xl flex items-center">
          <FaAngleLeft /> Collaborator List
        </Link>
        <Form layout="inline" className="flex space-x-4">
          <Item name="date">
            <DatePicker
              className="rounded-md border border-[#92b8c0]"
              onChange={(date) => setSelectedDate(date)}
              placeholder="Select Date"
            />
          </Item>
          <Item name="username">
            <Input
              className="rounded-md w-[70%] md:w-full border border-[#92b8c0]"
              placeholder="User Name"
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Item>
          <Item>
            <button className="size-8 rounded-full flex justify-center items-center bg-[#92b8c0] text-black">
              <IoIosSearch className="size-5" />
            </button>
          </Item>
        </Form>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Card: {
              bodyStyle: {
                padding: 16,
              },
            },
          },
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataSource?.map((user) => (
            <div
              key={user.id}
              className="border border-[#4b1c2f] shadow-[0_3px_10px_#4b1c2f60] p-4 rounded-lg flex items-start gap-4"
            >
              <img
                src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?semt=ais_items_boosted&w=740"
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1 grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm text-gray-500">User Name</p>
                  <p className="font-medium">{user.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joining Date</p>
                  <p className="font-medium">
                    {moment(user.createdAt).format("D MMM, YYYY")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Telephone Number</p>
                  <p className="font-medium">{user.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div className="col-span-2 flex justify-end mt-2">
                  <Button
                    danger
                    type="default"
                    onClick={() => showModal(user)}
                  >
                    Block
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ConfigProvider>

      <Modal
        title="User Details"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Go Back
          </Button>,
          <Button key="submit" type="primary" danger onClick={handleBlock}>
            Block
          </Button>,
        ]}
      >
        {selectedUser && (
          <div className="space-y-2">
            <p><strong>Full Name:</strong> {selectedUser.fullName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone Number:</strong> {selectedUser.phoneNumber}</p>
            <p><strong>Account ID:</strong> {selectedUser.accountID}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>
            <p><strong>Address:</strong> {selectedUser.address_line1}</p>
            <p><strong>Joining Date:</strong> {moment(selectedUser.createdAt).format("D MMM, YYYY")}</p>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Users;
