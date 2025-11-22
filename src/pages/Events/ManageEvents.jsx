import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure'

const ManageEvents = () => {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], refetch, isLoading } = useQuery({
    queryKey: ['my-events'],
    queryFn: async () => {
      const res = await axiosSecure.get('/my-events');
      return res.data;
    }
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/events/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire('Deleted!', 'Your event has been deleted.', 'success');
        }
      }
    });
  };

  if (isLoading) return <div className="text-center mt-20"><span className="loading loading-dots loading-lg text-primary"></span></div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-serif font-bold text-primary mb-8 text-center">Manage My Events</h2>
      
      {events.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <p className="text-xl mb-4">You haven't created any events yet.</p>
          <Link to="/create-event" className="btn btn-primary">Create Your First Event</Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl border border-base-200">
          <table className="table w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Event</th>
                <th>Category</th>
                <th>Date</th>
                <th>Location</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={event.thumbnail} alt={event.title} />
                        </div>
                      </div>
                      <div className="font-bold">{event.title}</div>
                    </div>
                  </td>
                  <td><div className="badge badge-ghost badge-sm">{event.eventType}</div></td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td className="text-sm text-gray-500">{event.location}</td>
                  <th>
                    <div className="flex justify-center gap-2">
                      <Link to={`/update-event/${event._id}`} className="btn btn-ghost btn-xs text-warning">
                        <FaEdit size={18} />
                      </Link>
                      <button onClick={() => handleDelete(event._id)} className="btn btn-ghost btn-xs text-error">
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;