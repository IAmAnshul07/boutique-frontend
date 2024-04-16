"use client";
import React from "react";

interface RatingProps {
  value: number;
  color?: string;
  disabled?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value, color = "bg-orange-500", disabled = true }) => {
  return (
    <div>
      <form className="tooltip" data-tip={value}>
        <div className="rating rating-sm rating-half">
          <input type="radio" name="rating" className="rating-hidden hidden" checked={value < 0.5} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-1`} disabled={disabled} checked={1 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-2`} disabled={disabled} checked={2 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-1`} disabled={disabled} checked={3 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-2`} disabled={disabled} checked={4 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-1`} disabled={disabled} checked={5 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-2`} disabled={disabled} checked={6 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-1`} disabled={disabled} checked={7 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-2`} disabled={disabled} checked={8 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-1`} disabled={disabled} checked={9 <= value * 2} />
          <input type="radio" name="rating-10" className={`${color} mask mask-star-2 mask-half-2`} disabled={disabled} checked={10 <= value * 2} />
        </div>
      </form>
    </div>
  );
};

export default Rating;
