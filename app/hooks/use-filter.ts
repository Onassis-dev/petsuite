import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

export const useFilter = () => {
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 400);

  return { filter, setFilter, debouncedFilter };
};
