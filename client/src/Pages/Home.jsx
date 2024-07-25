import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { logout } from "../Redux/User/UserSlice.js";

export default function Home() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleLogout = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/api/logout", {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      });
      if (response.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Logout successful. You will be redirected to the login page in 3 seconds.",
          icon: "success",
          confirmButtonText: "OK",
        });
        localStorage.removeItem("Authorization");
        dispatch(logout());
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 3000);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Logout failed",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-3">
      {
        currentUser
          ? <div>Welcome! {currentUser.name}</div>
          : <div>Welcome! Please Sign Up or Sign In First!</div>
      }
      <div className="flex flex-row gap-3">
        {
          currentUser
            ?
            <div className="flex flex-row gap-x-5">
              <Link className="bg-green-500 rounded-xl p-3 text-white" to="/update">
                Update
              </Link>
              <button className="bg-red-500 rounded-xl p-3 text-white" onClick={handleLogout}>
                Logout
              </button>
            </div>
            :
            <div className="flex flex-row gap-x-5">
              <Link to="/sign-up">
                <button className="bg-blue-500 rounded-xl p-3 text-white">
                  Sign Up
                </button>
              </Link>
              <Link to="/sign-in">
                <button className="bg-blue-500 rounded-xl p-3 text-white">
                  Sign In
                </button>
              </Link>
            </div>
        }
      </div>
    </div>
  );
}
