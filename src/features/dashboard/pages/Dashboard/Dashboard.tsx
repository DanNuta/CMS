import { useQueries } from "@tanstack/react-query";

import { ChartLine, ChartPie } from "../../../../components";
import { getData } from "../../../../api";

const urls = ["http://localhost:3001/posts", "http://localhost:3000/users"];

export const Dashboard: React.FC = () => {
  const queries = useQueries({
    queries: urls.map((item) => {
      return {
        queryKey: ["data", item],
        queryFn: () => getData(item),
      };
    }),
  });

  const posts = queries[0].data;
  const users = queries[1].data;

  return (
    <div>
      <div>
        <ChartPie data={users} />
      </div>

      <div>
        <ChartLine data={posts} />
      </div>
    </div>
  );
};
