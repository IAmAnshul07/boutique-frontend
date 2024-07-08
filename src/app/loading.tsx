"use client";
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  );
}
