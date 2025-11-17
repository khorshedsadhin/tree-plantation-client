import { use } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";

const Register = () => {
	const { createUser, updateUserProfile } = use(AuthContext);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		const toastId = toast.loading("Creating your account...");

		createUser(data.email, data.password)
			.then((result) => {
				updateUserProfile(data.name, data.photoURL)
					.then(() => {
						toast.success("Account created successfully!", { id: toastId });
						navigate("/");
					})
					.catch((err) => {
						toast.error(err.message, { id: toastId });
					});
			})
			.catch((err) => {
				toast.error(err.message, { id: toastId });
			});
	};

	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
				<form onSubmit={handleSubmit(onSubmit)} className="card-body">
					<h1 className="text-3xl font-bold">Register now!</h1>

					{/* Name Field */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							{...register("name", { required: "Name is required" })}
							className="input input-bordered"
						/>
						{errors.name && (
							<span className="text-error">{errors.name.message}</span>
						)}
					</div>

					{/* Photo URL Field */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Photo URL</span>
						</label>
						<input
							type="text"
							{...register("photoURL", { required: "Photo URL is required" })}
							className="input input-bordered"
						/>
						{errors.photoURL && (
							<span className="text-error">{errors.photoURL.message}</span>
						)}
					</div>

					{/* Email Field */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							{...register("email", { required: "Email is required" })}
							className="input input-bordered"
						/>
						{errors.email && (
							<span className="text-error">{errors.email.message}</span>
						)}
					</div>

					{/* Password Field */}
					<div className="form-control">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							{...register("password", {
								required: "Password is required",
								minLength: { value: 6, message: "Must be 6 chars or longer" },
								pattern: {
									value: /^(?=.*[A-Z])(?=.*[a-z]).*$/,
									message: "Must have one uppercase and one lowercase letter",
								},
							})}
							className="input input-bordered"
						/>
						{errors.password && (
							<span className="text-error">{errors.password.message}</span>
						)}
					</div>

					<div className="form-control mt-6">
						<button type="submit" className="btn btn-primary">
							Register
						</button>
					</div>

					<p className="text-center">
						Already have an account?{" "}
						<Link to="/login" className="link link-primary">
							Login
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Register;
