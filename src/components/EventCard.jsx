import { Link } from 'react-router';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const EventCard = ({ event }) => {
  const { _id, title, eventType, thumbnail, location, eventDate } = event;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-base-200">
      <figure className="h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </figure>
      <div className="card-body p-5">
        <div className="badge badge-secondary badge-outline mb-2">{eventType}</div>
        
        <h2 className="card-title font-serif text-xl mb-1">{title}</h2>
        
        <div className="flex items-center text-gray-500 text-sm mb-1">
          <FaMapMarkerAlt className="mr-2 text-primary" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <FaCalendarAlt className="mr-2 text-primary" />
          <span>{new Date(eventDate).toLocaleDateString()}</span>
        </div>

        <div className="card-actions justify-end mt-auto">
          <Link to={`/event/${_id}`} className="btn btn-primary btn-sm w-full">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;