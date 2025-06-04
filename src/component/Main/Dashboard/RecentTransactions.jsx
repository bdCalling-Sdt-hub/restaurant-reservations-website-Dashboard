import { ConfigProvider, Table, Pagination, Space, message, Modal, Button } from "antd";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// Mock API Data (Replace with your actual hooks in a real scenario)
const mockRecentUsers = [
  {
    id: 1,
    fullName: "John Doe",
    email: "johndoe@example.com",
    role: "Admin",
    createdAt: "2022-05-01",
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "janesmith@example.com",
    role: "User",
    createdAt: "2023-01-20",
  },
  {
    id: 3,
    fullName: "Mark Lee",
    email: "marklee@example.com",
    role: "User",
    createdAt: "2023-03-15",
  },
  {
    id: 4,
    fullName: "Sara Connor",
    email: "saraconnor@example.com",
    role: "Moderator",
    createdAt: "2022-11-10",
  },
  // Add more mock users as needed
];

// Mock API Response Hook
const useGetDashboardStatusQuery = () => ({
  data: { recentUsers: mockRecentUsers },
  isLoading: false,
});

// Mock Block/Unblock Mutation Hooks
const useBlockUserMutation = () => [async (id) => {
  message.success(`User with ID ${id} has been blocked.`);
}];

const useUnBlockUserMutation = () => [async (id) => {
  message.success(`User with ID ${id} has been unblocked.`);
}];

const RecentTransactions = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [pageSize, setPageSize] = useState(6); // Items per page
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user details

  // Using mocked query hook to get user data
  const { data: userData, isLoading } = useGetDashboardStatusQuery();
  const recentUsers = userData?.recentUsers.slice(0, 8);

  // Mocked Mutation Hooks for Block/Unblock
  const [userBlock] = useBlockUserMutation();
  const [userUnBlock] = useUnBlockUserMutation();

  // Handle User Blocking
  const handleUserRemove = async (id) => {
    try {
      const res = await userBlock(id);
      if (res) {
        message.success(res);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  // Handle User Unblocking
  const handleUserUnBlock = async (id) => {
    try {
      const res = await userUnBlock(id);
      if (res) {
        message.success(res);
      }
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  // Open Modal with User Details
  const viewDetails = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Close Modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: "#SL",
      dataIndex: "si",
      key: "si",
      align: "center",
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      align: "center",
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle" className="flex flex-row justify-center">
          <button onClick={() => viewDetails(record)}>
            <HiOutlineDotsHorizontal className="text-2xl" />
          </button>
        </Space>
      ),
    },
  ];

  const filteredData = recentUsers?.filter((user) => {
    const matchesText =
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchText.toLowerCase());
    const matchesDate = selectedDate
      ? user.date === selectedDate.format("YYYY-MM-DD")
      : true;

    return matchesText && matchesDate;
  });

  // Paginate the filtered data
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const dataSource = paginatedData?.map((user, index) => ({
    key: user.id,
    si: (currentPage - 1) * pageSize + index + 1, // Correct the serial number based on page
    userName: `${user?.fullName}`,
    email: user.email,
    role: user.role,
    joinDate: user.createdAt.split(",")[0],
  }));

  return (
    <div className="w-full col-span-full md:col-span-6 bg-white rounded-lg">
      <div className="flex items-center justify-between flex-wrap mt-10 mb-5">
        <h1 className="text-2xl flex items-center">User Approvals</h1>
      </div>

      {/* Table */}
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
          columns={columns}
          dataSource={dataSource}
          pagination={false} // Disable pagination in the table to handle it manually
          scroll={{ x: 500 }}
          className="text-center"
        />
      </ConfigProvider>

      {/* Custom Pagination Component */}
      <div className="flex justify-center my-10">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData?.length}
          onChange={(page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          }}
          showSizeChanger
          pageSizeOptions={[10, 20, 50, 100]}
          style={{ display: "flex", justifyContent: "center", width: "100%" }} // Custom style for centering
        />
      </div>

      {/* User Details Modal */}
      <Modal
        // title="User Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[]}
      >
        {selectedUser && (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-10">User Details</h2>
            <p className="flex items-center justify-between my-5"><strong>Name:</strong> {selectedUser.userName}</p>
            <p className="flex items-center justify-between my-5"><strong>Email:</strong> {selectedUser.email}</p>
            <p className="flex items-center justify-between my-5"><strong>Role:</strong> {selectedUser.role}</p>
            <p className="flex items-center justify-between my-5"><strong>Join Date:</strong> {selectedUser.joinDate}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecentTransactions;
