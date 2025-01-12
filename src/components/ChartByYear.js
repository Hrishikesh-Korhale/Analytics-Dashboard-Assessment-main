import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartByYear = ({ data }) => {
  // Aggregate data by year
  const dataByYear = data.reduce((acc, vehicle) => {
    const year = vehicle["Model Year"]; // Adjust column name as needed
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Convert aggregated data into a chart-friendly format
  const chartData = Object.entries(dataByYear).map(([year, count]) => ({
    year,
    count,
  }));

  return (
    <div className="chart-container">
      <h2>Electric Vehicles by Year</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4a90e2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartByYear;
