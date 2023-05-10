import { useQueries } from "@tanstack/react-query";

import { ChartLine, ChartPie } from "../../../../components";
import { getData } from "../../../../api";

const urls = ["http://localhost:3001/posts", "http://localhost:3000/users"];

export const Dashboard: React.FC = () => {
  const queries = useQueries({
    queries: urls.map((item, i) => {
      return {
        queryKey: ["data", i],
        queryFn: () => getData(item),
      };
    }),
  });

  const posts = queries[0].data;
  const users = queries[1].data;

  return (
    <div className="chart">
      <div className="pie-chart">
        {users && <h1>Numarul de utilizator: {users.length}</h1>}
        <ChartPie data={users} />
      </div>

      <div className="line-chart">
        {posts && <h1>Numarul de postari: {posts.length}</h1>}
        <ChartLine data={posts} />
      </div>
    </div>
  );
};
