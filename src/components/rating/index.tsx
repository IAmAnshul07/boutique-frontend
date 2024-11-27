"use client";
import React, { useState } from "react";

interface RatingProps {
  value: number;
  color?: string;
  disabled?: boolean;
  onChange?: (newValue: number) => void;
}

const Rating: React.FC<RatingProps> = ({ value, color = "bg-orange-500", disabled = true, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleChange = (newValue: number) => {
    if (!disabled) {
      setCurrentValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div>
      <form className="tooltip" data-tip={value} aria-label={`Rating: ${value}`}>
        <div className="rating rating-sm rating-half">
          {[...Array(10)].map((_, index) => {
            const isHalf = index % 2 === 0;
            const starValue = (index + 1) / 2;
            return (
              <input
                key={index}
                type="radio"
                name="rating-10"
                className={`${color} mask mask-star-2 ${isHalf ? "mask-half-1" : "mask-half-2"}`}
                disabled={disabled}
                checked={starValue <= currentValue}
                onChange={() => handleChange(starValue)}
              />
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default Rating;
