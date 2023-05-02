import { StateProps } from "../types";

export function cleanDataFromState(
  stateFn: React.Dispatch<React.SetStateAction<StateProps | undefined>>
) {
  stateFn((prev) => {
    return {
      errorMsj: null,
      value: "",
    };
  });
}
