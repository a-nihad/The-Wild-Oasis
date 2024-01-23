import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [serchParams] = useSearchParams();
  const numDays = serchParams.get("last") ? Number(serchParams.get("last")) : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isStaysLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  const confirmedStays =
    stays?.filter(
      (stay) => stay.status === "checked-in" || stay.status === "checked-out"
    ) || {};

  return { isStaysLoading, stays, confirmedStays, numDays };
}
