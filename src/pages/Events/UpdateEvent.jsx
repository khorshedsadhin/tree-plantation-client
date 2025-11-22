import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    axiosPublic.get(`/events/${id}`).then(res => {
      const data = res.data;
      setValue("title", data.title);
      setValue("eventType", data.eventType);
      setValue("location", data.location);
      setValue("thumbnail", data.thumbnail);
      setValue("description", data.description);
      setValue("eventDate", new Date(data.eventDate));
    });
  }, [id, axiosPublic, setValue]);

  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating event...");
    try {
      const eventData = {
        ...data,
        eventDate: data.eventDate
      };

      const response = await axiosSecure.put(`/events/${id}`, eventData);

      if (response.data.modifiedCount > 0) {
        toast.success("Event updated successfully!", { id: toastId });
        navigate('/manage-events');
      } else {
        toast.success("No changes made", { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event", { id: toastId });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 py-10 px-4">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-8 border border-base-200">
        <h2 className="text-3xl font-serif font-bold text-primary text-center mb-8">Update Event</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Title, Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Event Title</span></label>
              <input type="text" className="input input-bordered w-full" {...register("title", { required: true })} />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Event Type</span></label>
              <select className="select select-bordered w-full" {...register("eventType", { required: true })}>
                <option value="Plantation">Tree Plantation</option>
                <option value="Cleanup">Road/Park Cleanup</option>
                <option value="Donation">Relief Donation</option>
                <option value="Social Awareness">Social Awareness</option>
              </select>
            </div>
          </div>

          {/* Location, Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Location</span></label>
              <input type="text" className="input input-bordered w-full" {...register("location", { required: true })} />
            </div>

            <div className="form-control w-full">
              <label className="label"><span className="label-text font-bold">Event Date</span></label>
              <Controller
                control={control}
                name="eventDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                    wrapperClassName="w-full"
                    className="input input-bordered w-full"
                  />
                )}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Thumbnail URL</span></label>
            <input type="url" className="input input-bordered w-full" {...register("thumbnail", { required: true })} />
          </div>

          {/* Description */}
          <div className="form-control w-full">
            <label className="label"><span className="label-text font-bold">Description</span></label>
            <textarea className="textarea textarea-bordered h-32 w-full" {...register("description", { required: true })}></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full text-white">Update Event</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;