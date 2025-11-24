import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
	const { _id, title, eventType, thumbnail, location, eventDate } = event;

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			whileHover={{ y: -10 }}
			className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 h-full flex flex-col"
		>
			<figure className="h-48 overflow-hidden relative">
				<img
					src={thumbnail}
					alt={title}
					className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
				/>
				<div className="absolute top-3 right-3 badge badge-secondary shadow-lg font-semibold text-xs tracking-wide">
					{eventType}
				</div>
			</figure>

			<div className="card-body p-6 grow">
				<h2 className="card-title font-serif text-xl mb-2 text-primary hover:text-secondary transition-colors cursor-pointer">
					{title}
				</h2>

				<div className="flex items-center text-base-content/70 text-sm mb-2">
					<FaMapMarkerAlt className="mr-2 text-accent" />
					<span>{location}</span>
				</div>

				<div className="flex items-center text-base-content/70 text-sm mb-6">
					<FaCalendarAlt className="mr-2 text-accent" />
					<span>
						{new Date(eventDate).toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</span>
				</div>

				<div className="card-actions justify-end mt-auto">
					<Link
						to={`/event/${_id}`}
						className="btn btn-primary btn-sm w-full text-white shadow-md"
					>
						View Details
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default EventCard;
