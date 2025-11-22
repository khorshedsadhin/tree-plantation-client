import { useState } from 'react';
import EventCard from '../../components/EventCard';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/UseAxiosPublic';
import { FaSearch, FaFilter } from 'react-icons/fa';

const UpcomingEvents = () => {
  const axiosPublic = useAxiosPublic();
  
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: ['upcomingEvents', search, filterType], 
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/upcoming?search=${search}&type=${filterType}`);
      return res.data;
    },

    placeholderData: keepPreviousData,
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

      <div className="bg-base-100 p-4 rounded-xl shadow-md border border-base-200 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center max-w-4xl mx-auto">
        
        <div className="w-full md:w-1/2 relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search events..." 
            className="input input-bordered w-full pl-10 focus:input-primary transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full md:w-1/3 relative">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <select 
            className="select select-bordered w-full pl-10 focus:select-primary transition-all"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Plantation">Tree Plantation</option>
            <option value="Cleanup">Road/Park Cleanup</option>
            <option value="Donation">Relief Donation</option>
            <option value="Social Awareness">Social Awareness</option>
          </select>
        </div>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl border border-base-300">
          <p className="text-xl text-base-content/60 mb-4">No events found matching your criteria.</p>
          <button 
            onClick={() => { setSearch(''); setFilterType(''); }}
            className="btn btn-link text-primary no-underline hover:underline"
          >
            Clear Filters
          </button>
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