import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  const quaryClint = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleteing } = useMutation({
    mutationFn: deleteBookingAPI,

    onSuccess: () => {
      toast.success("Booking successfully deleted");
      quaryClint.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteBooking, isDeleteing };
}
