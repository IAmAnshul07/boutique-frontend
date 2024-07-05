import { useGetPostOfficeByPinQuery } from "@/redux/services/checkPincode";
import React, { useEffect, useState } from "react";

const CheckPincode = () => {
  const [pinCode, setPinCode] = useState("");
  const [queryPinCode, setQueryPinCode] = useState("");
  const [postOfficeDetails, setPostOfficeDetails] = useState<any[]>([]);
  const [error, setError] = useState("");

  const { data } = useGetPostOfficeByPinQuery(queryPinCode, {
    skip: !queryPinCode,
  });

  useEffect(() => {
    if (data && data[0].Status === "Success") {
      setPostOfficeDetails(data[0].PostOffice);
      setError("");
    } else if (data && data[0].Status !== "Success") {
      setPostOfficeDetails([]);
      setError("Invalid PIN code");
    }
  }, [data]);

  const handlePinCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPinCode(e.target.value);
  };

  const handleCheckPinCode = () => {
    setQueryPinCode(pinCode);
  };
  return (
    <>
      <h1 className="font-semibold text-subHeading">Delivery Options</h1>
      <div>
        <label className="input input-bordered flex items-center gap-2 w-64 input-xs mt-2">
          <input type="text" className="grow" placeholder="Please enter PIN code" value={pinCode} onChange={handlePinCodeChange} />
          <button onClick={handleCheckPinCode}>Check</button>
        </label>
        {postOfficeDetails.length > 0 && (
          <div className="font-light">
            <h2 className="mt-2">Deliver to:</h2>
            <div className="flex flex-col">
              {postOfficeDetails.map((postOffice: any, index: number) => (
                <label key={index} className="flex flex-row text-sm">
                  <input type="radio" name="postOffice" className="ml-4" />
                  <p className="ml-1">{postOffice.Name}</p>
                </label>
              ))}
            </div>
          </div>
        )}
        {error && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default CheckPincode;
