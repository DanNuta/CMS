import { useQueries } from "@tanstack/react-query";

import {
  ChartLine,
  ChartPie,
  ChartParent,
} from "@/features/dashboard/components";
import { getData } from "@/api";
import { UserProps, PostProps } from "@/types";

const urls = [
  import.meta.env.VITE_ENDPOINT_POSTS,
  import.meta.env.VITE_ENDPOINT_USERS,
];

export const Dashboard: React.FC = () => {
  const queries = useQueries({
    queries: urls.map((item, i) => {
      return {
        queryKey: ["data", i],
        queryFn: () => getData(item),
      };
    }),
  });

  const posts = queries[0].data as PostProps[];
  const users = queries[1].data as UserProps[];

  return (
    <div className="dashboard">
      <ChartParent dataLength={users?.length} title="User number">
        <ChartPie data={users} />
      </ChartParent>

      <ChartParent dataLength={posts?.length} title="The number of posts">
        <ChartLine data={posts} />
      </ChartParent>
    </div>
  );
};
