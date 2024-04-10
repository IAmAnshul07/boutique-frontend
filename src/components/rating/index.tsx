import React from "react";

interface RatingProps {
  value: number;
  color?: string;
  disabled?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value, color = "bg-orange-500", disabled = true }) => {
  const ratingArray = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div>
      <form className="tooltip" data-tip={value}>
        <div className="rating rating-sm rating-half">
          <input type="radio" name="rating-10" className="rating-hidden hidden" checked={value < 0.5} />
          {ratingArray.map((rating) => (
            <input
              key={rating}
              id={`star${rating}`}
              type="radio"
              name="rating"
              className={`${color} mask mask-star-2 mask-half-${rating % 2 === 0 ? "2" : "1"}`}
              disabled={disabled}
              checked={rating <= value * 2}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default Rating;
