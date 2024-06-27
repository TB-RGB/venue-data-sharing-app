import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Whisper, Popover, Badge } from "rsuite";
import 'rsuite/Calendar/styles/index.css';
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";
import isValid from "date-fns/isValid";

const EventCalendar = () => {
  const dispatch = useDispatch();
  const { showReports, loading } = useSelector((store) => store.events);
  const venue = useSelector((store) => store.venue);

  useEffect(() => {
    if (venue.id) {
      dispatch({ type: "FETCH_SHOW_REPORTS", payload: venue.id });
    }
  }, [venue.id]);

  if (loading) return <div>Loading...</div>;

  const formatEvents = showReports.map(report => {
    const start = parseISO(`${report.show_date}T${report.door_time}`);
    return {
      ...report,
      start: isValid(start) ? start : null,
      end: isValid(start) ? start : null,
      title: `${report.band_name} at ${report.venue_name}`,
    };
  }).filter(event => event.start !== null);

  return (
    <Calendar
      data={formatEvents}
      renderCell={date => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const events = formatEvents.filter(event => 
          event.start && format(event.start, 'yyyy-MM-dd') === formattedDate
        );
        return (
          <div>
            {events.map((event, index) => (
              <div key={index}>{event.title}</div>
            ))}
          </div>
        );
      }}
    />
  );
};

export default EventCalendar;
