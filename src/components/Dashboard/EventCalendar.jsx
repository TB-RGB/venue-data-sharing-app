import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Whisper, Popover } from "rsuite";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import 'rsuite/Calendar/styles/index.css';
import { parseISO, format, isValid, setHours, setMinutes, setSeconds } from "date-fns";

const EventCalendar = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const { showReports, loading } = useSelector((store) => store.events);
  const venue = useSelector((store) => store.venue);

  useEffect(() => {
    if (venue.id) {
      dispatch({ type: "FETCH_SHOW_REPORTS", payload: venue.id });
    }
  }, [venue.id]);

  const handleClick = useCallback(event=>{
    dispatch({type: 'FETCH_SHOW_DETAILS', payload: event.id })
    history.push(`/eventDetails/${event.id}`)
    }, [])



  const formatEvents = showReports.map(report => {
    const showDate = parseISO(report.show_date);
    const [hours, minutes, seconds] = report.door_time.split(':').map(Number);
    const start = setSeconds(setMinutes(setHours(showDate, hours), minutes), seconds);

    return {
      ...report,
      start: isValid(start) ? start : null,
      end: isValid(start) ? start : null,
      title: `${report.band_name} at ${report.venue_name}`,
    };
  }).filter(event => event.start !== null);

  const renderEventPopover = (events) => (
    <Popover title="Events">
      {events.map((event, index) => (
        <p key={index}>{event.band_name} - {format(event.start, 'h:mm a')}</p>
      ))}
    </Popover>
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ width: '90%' }}>
    <Calendar
      bordered
      renderCell={(date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const events = formatEvents.filter(event => 
          event.start && format(event.start, 'yyyy-MM-dd') === formattedDate
        );
        
        return (
          <div style={{ height: '100%' }}>
           
            {events.length > 0 && (
              <Whisper
                placement="top"
                trigger="hover"
                speaker={renderEventPopover(events)}
              >
                <div style={{ 
                  fontSize: '1em', 
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap',
                  fontFamily: 'Hack', 
                }}
                onClick={()=>handleClick(events[0])}
                >
                  {events[0].band_name}
                  {events.length > 1 && ` +${events.length - 1}`}
                </div>
              </Whisper>
            )}
          </div>
        );
      }}
    />
    </div>
  );
};

export default EventCalendar;