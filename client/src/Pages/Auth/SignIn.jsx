import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { loginSuccess } from "../../Redux/User/UserSlice.js";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [countdown, setCountdown] = useState(3);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/login", formData);
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: `Login successful. You will be redirected Home in ${countdown} seconds.`,
          icon: "success",
          confirmButtonText: "OK",
          didOpen: () => {
            Swal.showLoading();
            const timerInterval = setInterval(() => {
              setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                  clearInterval(timerInterval);
                  window.location.href = "/";
                  return 0;
                }
                return prevCountdown - 1;
              });
            }, 1000);
          },
        });
        localStorage.setItem('Authorization', response.data.data.token);
        dispatch(loginSuccess(response.data.data));
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Invalid Username or Password",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="uname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="uname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Username"
                    required
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Login
                </button>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Do not have an account?{" "}
                  <Link to="/sign-up" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Register here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
