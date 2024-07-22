import React, { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "../../redux/api/userApi";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [forgotPassword, { isLoading, error, isSuccess }] = useForgotPasswordMutation();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Email Sent. Please check your inbox");
    }
  }, [error, isAuthenticated, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    forgotPassword({ email });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow rounded-lg dark:bg-gray-800 dark:border dark:border-gray-700">
        <form onSubmit={submitHandler} className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Forgot Password</h2>
          <div>
            <label htmlFor="email_field" className="block text-sm font-medium text-gray-700 dark:text-white">
              Enter Email
            </label>
            <input
              type="email"
              id="email_field"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            id="forgot_password_button"
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
