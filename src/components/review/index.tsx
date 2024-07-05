import React, { useState } from "react";

const WriteReview = () => {
  const [isReviewText, setIsReviewText] = useState<boolean>(false);

  const handleReviewTextField = () => {
    setIsReviewText((prev) => !prev);
  };

  return (
    <>
      <button className="text-lightOrange w-fit my-2" onClick={handleReviewTextField}>
        Write a review
      </button>
      {isReviewText && (
        <div className="flex items-center gap-2">
          <textarea placeholder="Write your review here" className="textarea textarea-bordered textarea-xs w-full max-w-xmd"></textarea>
          <button className="btn btn-xs bg-buttonPrimary hover:bg-buttonPrimary text-white">Submit Review</button>
        </div>
      )}
    </>
  );
};

export default WriteReview;
