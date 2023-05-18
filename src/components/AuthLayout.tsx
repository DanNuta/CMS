import { Suspense } from "react";
import { useOutlet, useLoaderData, Await } from "react-router-dom";

import { UserContextProvider } from "@/context";
import { UserProps } from "@/types";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const { userPromise } = useLoaderData() as any;

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<h1>Error</h1>}
        children={(user: UserProps) => {
          return (
            <UserContextProvider userData={user}>{outlet}</UserContextProvider>
          );
        }}
      />
    </Suspense>
  );
};
