import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Papa from "papaparse";
import "../styles/dashboard.css";
import { CircularProgress } from "@mui/material";
import ChartByYear from "./ChartByYear";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [manufacturerData, setManufacturerData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [typeDistribution, setTypeDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCSVData = async () => {
      const filePath = process.env.REACT_APP_CSV_FILE_PATH;

      try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);

            // Calculate Vehicle Types
            const typeCounts = results.data.reduce((acc, row) => {
              acc[row["Electric Vehicle Type"]] =
                (acc[row["Electric Vehicle Type"]] || 0) + 1;
              return acc;
            }, {});
            setTypeDistribution(
              Object.entries(typeCounts).map(([name, value]) => ({
                name,
                value,
              }))
            );

            // Vehicles per manufacturer
            const manufacturerCount = results.data.reduce((acc, vehicle) => {
              acc[vehicle.Make] = (acc[vehicle.Make] || 0) + 1;
              return acc;
            }, {});
            setManufacturerData(
              Object.entries(manufacturerCount).map(([name, count]) => ({
                name,
                count,
              }))
            );

            // Vehicle model distribution
            const modelCount = results.data.reduce((acc, vehicle) => {
              acc[vehicle.Model] = (acc[vehicle.Model] || 0) + 1;
              return acc;
            }, {});
            setModelData(
              Object.entries(modelCount).map(([name, value]) => ({
                name,
                value,
              }))
            );

            setLoading(false);
          },
          error: (error) => {
            console.error("Parsing error:", error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV:", error);
        setLoading(false);
      }
    };

    fetchCSVData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <CircularProgress />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Electric Vehicle Population Dashboard</h1>

      <div className="charts-container">
        {/* Bar Chart: Vehicles per Manufacturer */}
        <div className="chart">
          <h2>Vehicles per Manufacturer</h2>
          <BarChart
            width={500}
            height={300}
            data={manufacturerData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Pie Chart: Vehicle Types */}
        <div className="chart">
          <h2>Vehicle Type Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={typeDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {typeDistribution.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Pie Chart: Vehicle Model Distribution */}
        <div className="chart">
          <h2>Vehicle Model Distribution</h2>
          <PieChart width={400} height={400}>
            <Pie
              data={modelData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              dataKey="value"
              label
            >
              {modelData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Bar Chart: Electric Vehicles by Year */}
        <div className="chart">
          <ChartByYear data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
