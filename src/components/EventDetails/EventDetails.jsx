import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { parseISO, setHours, setMinutes, setSeconds, format, isValid } from "date-fns";
import { ConfirmationModal } from "./ConfirmationModal";

const EventDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch();
  const history = useHistory();
  const details = useSelector((store) => store.details);
  const venue = useSelector(store => store.venue);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatShowDate = (date) => {
    if (!date) return "N/A";
    const parsedDate = parseISO(date);
    return isValid(parsedDate) ? format(parsedDate, "MMMM d, yyyy") : "Invalid Date";
  };

  const formatDoorTime = (event) => {
    if (!event || !event.door_time || !event.show_date) return "N/A";
    const parsedDate = parseISO(event.show_date);
    if (!isValid(parsedDate)) return "Invalid Date";

    const [hours, minutes, seconds] = event.door_time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return "Invalid Time";

    const doorTime = setSeconds(setMinutes(setHours(parsedDate, hours), minutes), seconds);
    return format(doorTime, "h:mm a");
  };

  if (!details || Object.keys(details).length === 0) {
    dispatch({type: 'FETCH_SHOW_DETAILS', payload: id })
    
  }

  const removeEvent = () => {
    dispatch({type: 'DROP_SHOW', payload: {eventId: details.id, venue_id: venue.id}});
    history.push('/dashboard');
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    removeEvent();
    setIsModalOpen(false);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <h1>Show Details</h1>
      <div>
        <h2>Event</h2>
        <h3>Band: {details.band_name || "N/A"}</h3>
        <h3>Hosted at: {details.venue_name || "N/A"}</h3>
        <h4>Date: {formatShowDate(details.show_date)}</h4>
        <h4>Door Time: {formatDoorTime(details)}</h4>
        <h4>Capacity: {details.capacity || "N/A"}</h4>
      </div>

      <div>
        <h2>Data</h2>
        <h3>Tickets</h3>
        <h4>Total Tickets Sold: {details.total_tickets_sold ?? "N/A"}</h4>
        <h4>Total Presale Tickets: {details.total_presale_sold ?? "N/A"}</h4>
        <h3>Drinks</h3>
        <h4>Beer Sold: {details.total_beer_sold ?? "N/A"}</h4>
        <h4>Liquor Sold: {details.total_liquor_sold ?? "N/A"}</h4>
        <h4>Other Drinks Sold: {details.total_other_sold ?? "N/A"}</h4>
      </div>

      <button onClick={handleDeleteClick}>Delete Event</button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this event? This action cannot be undone."
      />
    </>
  );
};

export default EventDetails;