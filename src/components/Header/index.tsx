"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlHandbag, SlHeart } from "react-icons/sl";
import { useSelector } from "react-redux";

const NewHeader = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const router = useRouter();
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            FASHION
          </Link>
        </div>
        <div className="flex-none gap-2 md:gap-4">
          <div className="hidden sm:flex flex-row ">
            <ul className="flex">
              <li>
                <Link href="/kids" className="btn btn-ghost">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="/men" className="btn btn-ghost">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/women" className="btn btn-ghost">
                  Women
                </Link>
              </li>
            </ul>
          </div>
          <label className="hidden xsm:flex input input-bordered items-center gap-2 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" placeholder="Search for Products, Brands and More" className="grow w-60 sm:w-64 text-xs" />
          </label>
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <SlHeart className="h-5 w-5" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <SlHandbag className="h-5 w-5" />
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">View cart</button>
                </div>
              </div>
            </div>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li
                  onClick={() => {
                    router.push("/signin");
                    localStorage.removeItem("user");
                  }}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link type="submit" href="/signin" className=" btn btn-primary">
              Sign in
            </Link>
          )}
        </div>
      </div>
      {/* <div className="xsm:hidden form-control px-2">
        <input type="text" placeholder="Search for Products, Brands and More" className="input input-bordered md:w-auto h-10 text-xs" />
      </div> */}
      <label className="flex xsm:hidden input input-bordered items-center gap-2 h-10 mx-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input type="text" placeholder="Search for Products, Brands and More" className="grow w-60 sm:w-64 text-xs" />
      </label>
      <div className="flex sm:hidden flex-row justify-evenly text-sm">
        <div className="btn btn-ghost">
          <a href="#">Kids</a>
        </div>
        <div className="btn btn-ghost">
          <a href="#">Men</a>
        </div>
        <div className="btn btn-ghost">
          <a href="#">Women</a>
        </div>
      </div>
    </>
  );
};

export default NewHeader;
