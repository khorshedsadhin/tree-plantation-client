import React from "react";
import { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { useForm, Controller } from "react-hook-form";

const CreateEvent = () => {
	const { user } = use(AuthContext);
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		const toastId = toast.loading("Creating event...");

		const eventData = {
			title: data.title,
			description: data.description,
			eventType: data.eventType,
			location: data.location,
			thumbnail: data.thumbnail,
			eventDate: data.eventDate,
			creatorEmail: user?.email,
		};

		const response = await axiosSecure.post("/events", eventData);

		if (response.data.insertedId) {
			toast.success("Event created successfully!", { id: toastId });
			navigate("/upcoming-events");
		}
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-base-200 py-10 px-4">
			<div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-8 md:p-12 border border-base-200">
				<div className="text-center mb-10">
					<h2 className="text-4xl font-serif font-bold text-primary">
						Create a New Event
					</h2>
					<p className="text-base-content/60 mt-2">
						Fill in the details to start a new initiative
					</p>
				</div>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
					{/* Title & Type */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text font-bold text-base">
									Event Title
								</span>
							</label>
							<input
								type="text"
								placeholder="e.g., Mirpur Road Cleaning"
								className="input input-bordered w-full focus:input-primary focus:border-primary transition-colors"
								{...register("title", { required: "Title is required" })}
							/>
							{errors.title && (
								<span className="text-error text-sm mt-1">
									{errors.title.message}
								</span>
							)}
						</div>

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text font-bold text-base">
									Event Type
								</span>
							</label>
							<select
								className="select select-bordered w-full focus:select-primary focus:border-primary transition-colors"
								defaultValue=""
								{...register("eventType", { required: "Please select a type" })}
							>
								<option value="" disabled>
									Select Type
								</option>
								<option value="Plantation">Tree Plantation</option>
								<option value="Cleanup">Road/Park Cleanup</option>
								<option value="Donation">Relief Donation</option>
								<option value="Social Awareness">Social Awareness</option>
							</select>
							{errors.eventType && (
								<span className="text-error text-sm mt-1">
									{errors.eventType.message}
								</span>
							)}
						</div>
					</div>

					{/*  Location & Date */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="form-control w-full">
							<label className="label">
								<span className="label-text font-bold text-base">Location</span>
							</label>
							<input
								type="text"
								placeholder="e.g., Gulshan 1, Dhaka"
								className="input input-bordered w-full focus:input-primary focus:border-primary transition-colors"
								{...register("location", { required: "Location is required" })}
							/>
							{errors.location && (
								<span className="text-error text-sm mt-1">
									{errors.location.message}
								</span>
							)}
						</div>

						<div className="form-control w-full">
							<label className="label">
								<span className="label-text font-bold text-base">
									Event Date
								</span>
							</label>
							<Controller
								control={control}
								name="eventDate"
								rules={{ required: "Date is required" }}
								render={({ field }) => (
									<DatePicker
										selected={field.value}
										onChange={(date) => field.onChange(date)}
										minDate={new Date()}
										placeholderText="Select a future date"
										wrapperClassName="w-full"
										className="input input-bordered w-full focus:input-primary focus:border-primary transition-colors"
									/>
								)}
							/>
							{errors.eventDate && (
								<span className="text-error text-sm mt-1">
									{errors.eventDate.message}
								</span>
							)}
						</div>
					</div>

					{/*  Thumbnail */}
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-bold text-base">
								Thumbnail Image URL
							</span>
						</label>
						<input
							type="url"
							placeholder="https://example.com/image.jpg"
							className="input input-bordered w-full focus:input-primary focus:border-primary transition-colors"
							{...register("thumbnail", { required: "Image URL is required" })}
						/>
						{errors.thumbnail && (
							<span className="text-error text-sm mt-1">
								{errors.thumbnail.message}
							</span>
						)}
					</div>

					{/*Description - Fixed Spacing */}
					<div className="form-control w-full">
						<label className="label">
							<span className="label-text font-bold text-base">
								Description
							</span>
						</label>
						<textarea
							className="textarea textarea-bordered h-32 w-full focus:textarea-primary focus:border-primary transition-colors"
							placeholder="Describe the event details..."
							{...register("description", {
								required: "Description is required",
							})}
						></textarea>
						{errors.description && (
							<span className="text-error text-sm mt-1">
								{errors.description.message}
							</span>
						)}
					</div>

					{/* Submit Button */}
					<div className="form-control mt-8">
						<button
							type="submit"
							className="btn btn-primary w-full text-white text-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all"
						>
							Create Event
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateEvent;
