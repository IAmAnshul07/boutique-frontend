"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SlHandbag, SlHeart } from "react-icons/sl";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { User } from "@/types/user";
import profileImage from "@/asset/homepage/profile-image.png";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewHeader = () => {
  const { user } = useSelector((state: RootState) => state.userReducer) as { user: User };
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 border-b border-base-300 flex-wrap md:flex-nowrap">
        <div className="flex-1" data-testid="header">
          <Link href="/" className="btn btn-ghost text-xl">
            FASHION
          </Link>
        </div>
        <div className="flex-none gap-2 md:gap-4 flex-wrap md:flex-nowrap">
          <div className="hidden sm:flex flex-row">
            <ul className="flex space-x-2">
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
          <label className="hidden sm:flex input input-bordered items-center gap-2 h-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input type="text" placeholder="Search for Products, Designs And More" className="grow w-60 sm:w-64 text-xs" />
          </label>
          <div className="btn btn-ghost btn-circle">
            <SlHeart className="h-5 w-5" />
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <SlHandbag className="h-5 w-5" />
                <span className="badge badge-sm indicator-item">1</span>
              </div>
            </div>
            <div tabIndex={0} className="mt-3 z-[100] card card-compact dropdown-content w-52 bg-base-100 shadow">
              <div className="card-body">
                <span className="font-bold text-lg">1 Items</span>
                <span className="text-info">Subtotal: ₹ 999</span>
                <div className="card-actions">
                  <Link href={"/add-to-cart"}>
                    <button className="btn btn-primary btn-sm btn-block">View cart</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isClient && user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <Image alt="Profile Image" src={profileImage} className="p-1" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li
                  onClick={() => {
                    router.push("/profile");
                  }}
                >
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                {user.role === "ADMIN" && (
                  <li
                    onClick={() => {
                      router.push("/admin");
                    }}
                  >
                    <a>Admin</a>
                  </li>
                )}
                <li
                  onClick={() => {
                    router.push("/signin");
                    Cookies.remove("user");
                    Cookies.remove("token");
                  }}
                >
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          )}
          {isClient && !user && (
            <Link type="submit" href="/signin" className="btn btn-sm btn-primary">
              Sign in
            </Link>
          )}
        </div>
      </div>
      <label className="flex sm:hidden input input-bordered items-center gap-2 h-10 m-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
        <input type="text" placeholder="Search for Products, Brands and More" className="grow w-60 sm:w-64 text-xs" />
      </label>
      <div className="flex sm:hidden flex-row justify-evenly text-sm bg-gray-100 rounded-md m-2">
        <Link href="/kids" className="btn btn-ghost join-item">
          Kids
        </Link>
        <Link href="/men" className="btn btn-ghost join-item">
          Men
        </Link>
        <Link href="/women" className="btn btn-ghost join-item">
          Women
        </Link>
      </div>
    </>
  );
};

export default NewHeader;
