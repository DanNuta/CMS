import {
  LineChart,
  Line,
  Pie,
  PieChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import { PostProps, UserProps } from "../types";

interface LineChartProps {
  data?: PostProps[];
}

interface PieChartProps {
  data?: UserProps[];
}

export const ChartPie: React.FC<PieChartProps> = ({ data }) => {
  const currentData = [
    {
      name: "moderator",
      value: 0,
    },
    {
      name: "administrator",
      value: 0,
    },
  ];

  const colors = ["#FF6384", "rgba(0,210,255,1)"];

  data?.forEach((d) => {
    currentData.forEach((c) => {
      d.rol === c.name ? (c.value = c.value + 1) : c.value + 1;
    });
  });

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={currentData}
        dataKey={"value"}
        fill="red"
        cx={200}
        cy={200}
        innerRadius={40}
        label
      >
        {currentData.map((item, index) => {
          return (
            <Cell
              key={`cell-${item.name}`}
              fill={colors[index % colors.length]}
            />
          );
        })}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export const ChartLine: React.FC<LineChartProps> = ({ data }) => {
  const days = [
    {
      name: "Monday",
      react: 0,
    },
    {
      name: "Tuesday",
      react: 0,
    },

    {
      name: "Wednesday",
      react: 0,
    },

    {
      name: "Thursday",
      react: 0,
    },

    {
      name: "Friday",
      react: 0,
    },
    {
      name: "Saturday",
      react: 0,
    },
    {
      name: "Sunday",
      react: 0,
    },
  ];

  const totalPosts = data?.map((item) => item.date?.split(" ")[1]);

  totalPosts?.forEach((item) => {
    days.forEach((d) => (item === d.name ? (d.react = d.react + 1) : d));
  });

  return (
    <LineChart width={700} height={300} data={days}>
      <Line
        type="monotone"
        dataKey="react"
        stroke="rgba(0,210,255,1)"
        strokeWidth={3}
      ></Line>
      <CartesianGrid stroke="#DDD"></CartesianGrid>
      <XAxis dataKey="name"></XAxis>
      <YAxis></YAxis>
      <Tooltip></Tooltip>
    </LineChart>
  );
};
