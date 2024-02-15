/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";

function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log("Form submitted:", data);
    // Reset form fields
    reset();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-slate-100 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-200 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            placeholder="Enter your name"
            className={`border border-gray-400 rounded px-3 py-2 w-full focus:outline-none ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-200 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: true })}
            placeholder="Enter your email"
            className={`border border-gray-400 rounded px-3 py-2 w-full  focus:outline-none${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && <p className="text-red-500 text-sm">Email is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-200 font-bold mb-2">
            Message
          </label>
          <textarea
            id="message"
            {...register("message", { required: true })}
            placeholder="Enter your message"
            className={`border border-gray-400 rounded px-3 py-2 w-full h-32 resize-none focus:outline-none ${errors.message ? 'border-red-500' : ''}`}
          />
          {errors.message && <p className="text-red-500 text-sm">Message is required</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
