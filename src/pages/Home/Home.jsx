import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaTree, FaHandsHelping, FaGlobeAmericas } from "react-icons/fa";

const Home = () => {
	const stats = [
		{
			icon: FaTree,
			color: "text-success",
			count: "50,000+",
			label: "Trees Planted",
		},
		{
			icon: FaHandsHelping,
			color: "text-accent",
			count: "120+",
			label: "Community Events",
		},
		{
			icon: FaGlobeAmericas,
			color: "text-info",
			count: "5,000+",
			label: "Volunteers Engaged",
		},
	];

	return (
		<div className="overflow-x-hidden pt-6 space-y-24 pb-20">
			<section className="container mx-auto px-4">
				<div
					className="hero min-h-[600px] rounded-3xl overflow-hidden shadow-2xl relative"
					style={{
						backgroundImage:
							"url(https://images.unsplash.com/photo-1542601906990-b4d3fb7d5c73?q=80&w=1974&auto=format&fit=crop)",
						backgroundPosition: "center",
						backgroundSize: "cover",
					}}
				>
					<div className="hero-overlay bg-linear-to-b from-black/70 via-black/50 to-primary/60"></div>

					<div className="hero-content text-center text-white relative z-10">
						<motion.div
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							className="max-w-2xl"
						>
							<h1 className="mb-6 text-5xl md:text-7xl font-serif font-bold leading-tight drop-shadow-xl">
								Plant a Tree, <br />
								<span className="text-accent italic">Save the Future</span>
							</h1>

							<p className="mb-8 text-lg md:text-xl opacity-90 drop-shadow-md font-light max-w-lg mx-auto leading-relaxed">
								Join our community of eco-warriors. We organize local events to
								plant trees, clean rivers, and restore nature's balance.
							</p>

							<div className="flex justify-center gap-4">
								<Link
									to="/upcoming-events"
									className="btn btn-primary btn-lg text-white border-none shadow-lg hover:shadow-xl hover:scale-105 transition-all rounded-full px-8"
								>
									Join an Event
								</Link>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			<div className="container mx-auto px-4 space-y-24">
				<section>
					<div className="text-center mb-12">
						<h2 className="text-4xl font-serif font-bold text-primary mb-4">
							Our Impact
						</h2>
						<p className="max-w-xl mx-auto text-base-content/70">
							Together, we are making a tangible difference. Here is what our
							community has achieved so far.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{stats.map((item,idx) => (
							<motion.div
								key={idx}
								whileHover={{ y: -10 }}
								className="card bg-base-200 border-none shadow-sm hover:shadow-xl transition-all duration-300 p-8 text-center"
							>
								<item.icon className={`text-5xl ${item.color} mx-auto mb-4`} />
								<h3 className="text-2xl font-bold mb-2">{item.count}</h3>
								<p className="text-base-content/70">{item.label}</p>
							</motion.div>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-4xl font-serif font-bold text-primary text-center mb-12">
						Recent Moments
					</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
						<div className="col-span-2 row-span-2 overflow-hidden rounded-2xl h-96 shadow-lg">
							<img
								src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
								alt=""
							/>
						</div>
						<div className="overflow-hidden rounded-2xl h-48 shadow-lg">
							<img
								src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
								alt="Forest"
							/>
						</div>
						<div className="overflow-hidden rounded-2xl h-48 shadow-lg">
							<img
								src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=2070"
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
								alt=""
							/>
						</div>
						<div className="col-span-2 overflow-hidden rounded-2xl h-48 shadow-lg">
							<img
								src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=2070"
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
								alt=""
							/>
						</div>
					</div>
				</section>

				<section className="flex justify-center">
					<div className="w-full max-w-4xl bg-base-200 rounded-3xl p-10 md:p-16 text-center shadow-sm">
						<h2 className="text-3xl font-serif font-bold text-primary mb-4">
							Stay Updated
						</h2>
						<p className="text-base-content/70 mb-8 max-w-lg mx-auto">
							Subscribe to our newsletter for the latest eco-news and upcoming
							event alerts. No spam, just green vibes.
						</p>
						<div className="join w-full max-w-md shadow-md">
							<input
								className="input input-bordered join-item w-full focus:input-primary bg-base-100"
								placeholder="Enter your email"
							/>
							<button className="btn btn-primary join-item text-white border-none">
								Subscribe
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Home;
