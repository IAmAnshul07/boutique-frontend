import React from "react";

const AddAddress: React.FC = () => {
  return (
    <>
      <div className="mx-4 mb-28 flex flex-wrap justify-between">
        <div className="w-full md:w-full my-2">
          <div className="divider mt-10">
            <h2 className="text-xl my-2 mb-4 flex justify-center items-center">Add Delivery Address</h2>
          </div>
          <form action="">
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
            <div className="flex justify-center items-center">
              <button type="submit" className="btn btn-primary mt-4 ">
                Add Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
