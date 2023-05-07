import { Bar } from "recharts";

export const Dashboard = () => {
  const el = {
    labels: ["Red", "Blue", "Yellow"],
    dataset: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
      },
    ],
  };

  return (
    <div>
      <Bar data={el} />
    </div>
  );
};
