import { Pagination } from "antd";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { useGetAllNotificationQuery } from "../../../redux/features/setting/settingApi";
import moment from "moment";

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data: allNotification } = useGetAllNotificationQuery();
  console.log(allNotification?.notifications);

  // Sample data if no notifications are available
  const demoNotifications = [
    {
      id: "1",
      message: "Your profile has been updated successfully.",
      createdAt: "2025-06-04T12:00:00",
    },
    {
      id: "2",
      message: "New comments on your post.",
      createdAt: "2025-06-03T09:30:00",
    },
    {
      id: "3",
      message: "Your subscription will expire soon.",
      createdAt: "2025-06-02T15:45:00",
    },
    {
      id: "4",
      message: "You have a new message from support.",
      createdAt: "2025-06-01T14:00:00",
    },
  ];

  const pageSize = 10;

  // Pagination Logic
  const paginatedNotifications = (allNotification?.notifications || demoNotifications).slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <Link to={"/"} className="text-2xl flex items-center mb-4"><FaAngleLeft /> Notification</Link>

      <div className="space-y-4">
        {paginatedNotifications?.map((item) => (
          <div key={item.id} className="border border-[#4b1c2fdc] hover:bg-[#4b1c2f5e] cursor-pointer rounded-md p-4 flex items-center space-x-4">
            <div className="text-[#4b1c2f] border border-[#4b1c2f] rounded-full p-2">
              <span className=" bg-[#4b1c2f] p-1.5 rounded-full absolute ml-4 z-20"></span>
              <IoMdNotificationsOutline size={30} className="relative" />
            </div>
            <div>
              <p className="font-semibold">{item?.message}</p>
              <p className="text-gray-500">{moment(item?.createdAt).fromNow()}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Centering the Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={currentPage}
          total={(allNotification?.notifications || demoNotifications).length}
          pageSize={pageSize}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Notification;
