import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { ConfirmationModal } from "./ConfirmationModal";
import ChartSection from "./ChartSection";

const EventDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const details = useSelector((store) => store.details);
  const venue = useSelector((store) => store.venue);
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(()=>{
    dispatch({ type: "FETCH_SHOW_DETAILS", payload: id });
  },[])

  const removeEvent = () => {
    dispatch({
      type: "DROP_SHOW",
      payload: { eventId: details.id, venue_id: venue.id },
    });
    history.push("/dashboard");
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
      <ChartSection deleteFn={handleDeleteClick}/>

      {/* <button className="btn" onClick={handleDeleteClick}>Delete Event</button> */}

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
