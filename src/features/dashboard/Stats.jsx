import Stat from "./Stat";
import { HiOutlineBriefcase } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  //1.
  const numBookings = bookings.length;

  //2.
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  //3.
  const checkins = confirmedStays.length || 0;

  //4.
  // num checked in night / all available nights (num days * num cabins )
  const occupation =
    checkins &&
    confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
      (numDays * cabinCount);
  //   const occupation =
  //     confirmedStays?.reduce((acc, cur) => acc + cur.numNights, 0) /
  //     (numDays * cabinCount)
  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupency rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}

export default Stats;
