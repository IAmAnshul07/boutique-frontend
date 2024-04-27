import React from "react";
import Card from "@/asset/add-address/Card.png";
import returnImage from "@/asset/add-address/returnImage.png";
import truckImage from "@/asset/add-address/truckImage.png";
import Image from "next/image";

const AddAddress: React.FC = () => {
  return (
    <>
      <div className="mx-4 mb-28 flex flex-wrap justify-between">
        <div className="w-full md:w-2/3 my-2">
          <div className="divider mt-10">
            <h2 className="text-xl my-2 mb-4 flex justify-center items-center">Add Delivery Address</h2>
          </div>
          <form action="submit">
            {/* Form Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {/* First Column */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <div className="input input-bordered flex items-center gap-2" style={{ width: "calc(50% - 8px)" }}>
                    <input type="text" className="grow" placeholder="*Full Name" />
                  </div>
                  <div className="input input-bordered flex items-center gap-2" style={{ width: "calc(50% - 8px + 40px)" }}>
                    <input type="email" className="grow" placeholder="*Email" />
                  </div>
                </div>
                <div className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="*House No, Building, Street" />
                </div>
              </div>
              {/* Second Column */}
              <div className="flex flex-col gap-2">
                <div className="input input-bordered flex items-center gap-2">
                  <input type="tel" className="grow" placeholder="*Mobile Number" />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="*Locality" />
                </div>
              </div>
              {/* Third Column */}
              <div className="flex flex-col gap-2">
                <div className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="*PIN code" />
                </div>
                <div className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="*City" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="checkbox" id="defaultAddress" />
                  <label htmlFor="defaultAddress">Set As Default Address</label>
                </div>
              </div>
              {/* Fourth Column */}
              <div className="flex flex-col gap-2">
                <label className="input input-bordered flex items-center gap-2">
                  <input type="text" className="grow" placeholder="*State" />
                </label>
              </div>
            </div>
            {/* End of Form Content */}
            <button type="submit" className="btn btn-primary w-full mt-4">
              Shop Now
            </button>
          </form>
        </div>
        {/* Order Information Div */}
        <div className="w-full md:w-1/4 my-9 mr-9 flex items-center justify-center bg-base-200">
          <div className="flex-grow mx-2" style={{ height: "calc(100% - 4px)" }}>
            <div className="h-full">
              <h1 className="mx-2 text-xl font-semibold">Order Information</h1>
              <div className="flex justify-between mx-2 my-4">
                <h1>Bag Total: </h1>
                <div>Rs 1200</div>
              </div>
              <div className="flex justify-between mx-2 my-4">
                <h1>Shipping Charges: </h1>
                <div>Free</div>
              </div>
              <div className="flex justify-between mx-2 my-4">
                <h1 className="font-semibold">Total: </h1>
                <div className="font-semibold">Rs 1200</div>
              </div>
              <div className="btn btn-primary flex items-center my-4 mx-4">Checkout</div>
              <div className="divider"></div>
              <div className="flex mx-2 my- ">
                <Image src={truckImage} alt="Truck Image" />
                <h1 className="mx-2">Free Shipping for orders above Rs 1200</h1>
              </div>
              <div className="flex mx-2 my-2">
                <Image src={Card} alt="Card Image" />
                <h1 className="mx-2">Secure Payment & Checkout </h1>
              </div>
              <div className="flex mx-2 mb-6">
                <Image src={returnImage} alt="Return Image" />
                <h1 className="mx-2">Easy Return , Free pick up </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
