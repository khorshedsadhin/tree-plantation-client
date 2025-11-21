import { use } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
	FaMapMarkerAlt,
	FaCalendarAlt,
	FaUser,
	FaEnvelope,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const EventDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { user } = use(AuthContext);

	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();

	const {
		data: event,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["event", id],
		queryFn: async () => {
			const res = await axiosPublic.get(`/events/${id}`);
			return res.data;
		},
	});

	const handleJoinEvent = async () => {
		if (!user) {
			return navigate("/login", { state: { from: location } });
		}

		const toastId = toast.loading("Joining event...");

		const res = await axiosSecure.patch(`/events/join/${id}`);

		if (res.data.modifiedCount > 0) {
			toast.success("Successfully joined the event!", { id: toastId });
			refetch();
		} else {
			toast.error("You have already joined this event.", { id: toastId });
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex justify-center items-center">
				<span className="loading loading-bars loading-lg text-primary"></span>
			</div>
		);
	}

	const isCreator = user?.email === event.creatorEmail;
	const hasJoined = event.joinedUsers?.includes(user?.email);
	const isExpired = new Date(event.eventDate) < new Date();

	return (
		<div className="container mx-auto px-4 py-10">
			<div className="bg-base-100 shadow-2xl rounded-2xl overflow-hidden border border-base-200 grid grid-cols-1 lg:grid-cols-2">
				{/* --- LEFT SIDE --- */}
				<div className="relative h-64 lg:h-auto">
					<img
						src={event.thumbnail}
						alt={event.title}
						className="w-full h-full object-cover"
					/>
				</div>

				{/* --- RIGHT SIDE--- */}
				<div className="p-8 lg:p-12 flex flex-col justify-center">
					<div className="mb-4">
						<span className="badge badge-secondary badge-lg font-semibold">
							{event.eventType}
						</span>
					</div>

					<h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4 leading-tight">
						{event.title}
					</h2>

					<div className="space-y-3 mb-8 text-base-content/80">
						<div className="flex items-center">
							<FaCalendarAlt className="mr-3 text-primary text-lg" />
							<span className="font-semibold text-lg">
								{new Date(event.eventDate).toLocaleDateString(undefined, {
									weekday: "long",
									year: "numeric",
									month: "long",
									day: "numeric",
								})}
							</span>
						</div>

						<div className="flex items-center">
							<FaMapMarkerAlt className="mr-3 text-primary text-lg" />
							<span className="text-lg">{event.location}</span>
						</div>

						<div className="flex items-center text-sm mt-2 pt-4 border-t border-base-200">
							<span className="font-bold mr-2">Organizer:</span>
							<FaEnvelope className="mr-2 text-gray-400" />
							<span className="text-gray-600">{event.creatorEmail}</span>
						</div>
					</div>

					<div className="bg-base-200/50 p-6 rounded-xl mb-8 border-l-4 border-primary">
						<h3 className="font-bold text-lg mb-2">About this Event</h3>
						<p className="text-gray-700 leading-relaxed whitespace-pre-line">
							{event.description}
						</p>
					</div>

					<div className="mt-auto">
						{isCreator ? (
							<button className="btn btn-disabled w-full text-lg">
								You are the Organizer
							</button>
						) : isExpired ? (
							<button className="btn btn-disabled w-full text-lg">
								Event Expired
							</button>
						) : hasJoined ? (
							<button className="btn btn-success w-full text-white text-lg cursor-default">
								✓ Already Joined
							</button>
						) : (
							<button
								onClick={handleJoinEvent}
								className="btn btn-primary w-full text-white text-lg shadow-lg hover:scale-[1.02] transition-transform"
							>
								Join This Event
							</button>
						)}

						<p className="text-center text-sm text-gray-400 mt-4">
							{event.joinedUsers?.length || 0} people have joined this event
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
