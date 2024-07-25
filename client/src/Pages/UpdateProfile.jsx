import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { updateUser } from "../Redux/User/UserSlice";
import { useDispatch } from "react-redux";

export default function UpdateProfile() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      Swal.fire({
        title: "Error",
        text: "Please fill the field",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const token = localStorage.getItem("Authorization");
    console.log(token);

    try {
      const response = await axios.patch(
        "http://localhost:3000/api/update",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Update Successful",
          icon: "success",
          confirmButtonText: "OK",
        });
        dispatch(updateUser(response.data));
      } else {
        Swal.fire({
          title: "Error",
          text: "Update failed",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Update failed:", error);
    }
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update Name
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name1"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name1"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Your Name"
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update Name
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
