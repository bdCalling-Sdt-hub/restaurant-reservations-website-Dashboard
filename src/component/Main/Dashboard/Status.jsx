import { IoIosTrendingUp } from "react-icons/io";

const Status = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Total User */}
      <div className="bg-[#4b1c2fd3] text-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold ">Total User</h3>
        <p className="text-5xl font-bold my-2">1,000</p>
        <p className=" text-sm flex items-center gap-2">+11.01% <IoIosTrendingUp /></p>
      </div>
      <div className="bg-[#4b1c2fd3] text-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold ">Total User</h3>
        <p className="text-5xl font-bold my-2">1,000</p>
        <p className=" text-sm flex items-center gap-2">+11.01% <IoIosTrendingUp /></p>
      </div>
      <div className="bg-[#4b1c2fd3] text-white p-4 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold ">Total User</h3>
        <p className="text-5xl font-bold my-2">1,000</p>
        <p className=" text-sm flex items-center gap-2">+11.01% <IoIosTrendingUp /></p>
      </div>
    </div>
  );
};

export default Status;
