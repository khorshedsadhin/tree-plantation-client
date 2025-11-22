import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import EventCard from '../../components/EventCard';

const JoinedEvents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['joined-events'],
    queryFn: async () => {
      const res = await axiosSecure.get('/joined-events');
      return res.data;
    }
  });

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">My Joined Events</h2>
      
      {events.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <p className="text-xl mb-4">You haven't joined any events yet.</p>
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

export default JoinedEvents;