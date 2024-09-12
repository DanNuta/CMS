import { Suspense } from "react";
import { useOutlet, useLoaderData, Await } from "react-router-dom";

import { UserContextProvider } from "@/context";

export const AuthLayout = () => {
  const outlet = useOutlet();
  const  userPromise = useLoaderData();

  return (
    <Suspense>
      <Await
        resolve={userPromise}
        errorElement={<h1>Error</h1>}
        children={() => {
          return (
            <UserContextProvider >{outlet}</UserContextProvider>
          );
        }}
      />
    </Suspense>
  );
};
