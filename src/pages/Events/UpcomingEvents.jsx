import EventCard from '../../components/EventCard';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/UseAxiosPublic';

const UpcomingEvents = () => {
  const axiosPublic = useAxiosPublic();

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: async () => {
      const res = await axiosPublic.get('/events/upcoming');
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-error">Error loading events.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">Upcoming Events</h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Join one of our upcoming social initiatives. Be the change you want to see in your community.
        </p>
      </div>

      {events.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p>No upcoming events found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;