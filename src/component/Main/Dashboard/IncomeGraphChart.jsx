/* eslint-disable react/prop-types */
import { DatePicker } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import moment from "moment"; // Ensure to install moment.js if not already installed

// Demo data
const demoData = [
  { month: "Jan", income: 5000 },
  { month: "Feb", income: 4000 },
  { month: "Mar", income: 7000 },
  { month: "Apr", income: 8000 },
  { month: "May", income: 9000 },
  { month: "Jun", income: 10000 },
  { month: "Jul", income: 11000 },
  { month: "Aug", income: 10000 },
  { month: "Sep", income: 9000 },
  { month: "Oct", income: 14000 },
  { month: "Nov", income: 15000 },
  { month: "Dec", income: 16000 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="label font-semibold">{`Month: ${label}`}</p>
        <p className="intro">{`Total Income: $${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

const IncomeGraphChart = () => {
  // Using demoData for now as the actual data
  const data = { 
    totalAmountOfEarningInDifferentTime: {
      incomeData: demoData,
      year: "2025"
    }
  };

  return (
    <section className="w-full col-span-full md:col-span-4 bg-white rounded-lg border border-[#002831]">
      <div className="border-b border-[#4b1c2f]">
        <div className="flex justify-between items-center p-3">
          <h1 className="font-semibold">Income Ratio</h1>
          {/* DatePicker with static year for demo */}
          <DatePicker 
            picker="year" 
            defaultValue={moment("2025", "YYYY")} 
            onChange={(date) => console.log(date)} // Log the selected year
          />
        </div>
      </div>

      <ResponsiveContainer className="pr-4" width="100%" height={210}>
        <BarChart
          data={data.totalAmountOfEarningInDifferentTime.incomeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          className="md:mt-5 md:mb-5"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="income" barSize={20} fill="#4b1c2f" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default IncomeGraphChart;
