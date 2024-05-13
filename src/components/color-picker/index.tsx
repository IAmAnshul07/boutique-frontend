"use client";
import { useState, useEffect } from "react";
import { useCreateColorMutation, useUpdateColorMutation } from "@/redux/services/color";
import { SketchPicker, ColorResult, RGBColor } from "react-color";

interface Props {
  selectedColor: any; // Prop to receive the selected color data
}

interface Color extends RGBColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const ColorPicker: React.FC<Props> = ({ selectedColor }) => {
  const [colorName, setColorName] = useState<string>("");
  const [colorHex, setColorHex] = useState<string>("");
  const [background, setBackground] = useState<string>("#ffffff");
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

  const [updateColor] = useUpdateColorMutation();
  const [createColor] = useCreateColorMutation();

  const [color, setColor] = useState<Color>({
    r: 15,
    g: 1,
    b: 1,
    a: 1,
  });

  useEffect(() => {
    if (selectedColor) {
      setColorName(selectedColor.name); // Pre-fill the color name when selectedColor changes
      setColorHex(selectedColor.hex); // Pre-fill the color hex value when selectedColor changes
      setBackground(selectedColor.hex); // Set the background color of the color picker to the selected color
      setColor({
        r: parseInt(selectedColor.hex.substring(1, 3), 16),
        g: parseInt(selectedColor.hex.substring(3, 5), 16),
        b: parseInt(selectedColor.hex.substring(5, 7), 16),
        a: 1,
      });
    }
  }, [selectedColor]);

  const resetForm = () => {
    setColorName("");
    setColorHex("#ffffff");
    setBackground("#ffffff");
    setDisplayColorPicker(false);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (selectedColor) {
        await updateColor({ id: selectedColor.id, data: { name: colorName, hex: colorHex.toUpperCase() } });
      } else {
        await createColor({ data: { name: colorName, hex: colorHex.toUpperCase() } });
      }
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      resetForm();
    } catch (error) {
      console.error("Error saving color:", error);
    }
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (newColor: ColorResult) => {
    const { r, g, b, a } = newColor.rgb;
    setColor({ r, g, b, a: a ?? 1 }); // Ensure a is always a number
    setBackground(newColor.hex);
    setColorHex(newColor.hex);
  };

  return (
    <>
      <div className="w-full flex justify-center items-center">
        <form onSubmit={handleSubmit} className="flex">
          <div>
            <div className="inline-block m-2 cursor-pointer border rounded-lg" onClick={handleClick}>
              <div
                className="w-36 h-14 rounded-md"
                style={{
                  background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                }}
              ></div>
            </div>
            {displayColorPicker && (
              <div className="absolute z-10">
                <div className="fixed inset-0 bg-black opacity-50" onClick={handleClose}></div>
                <SketchPicker className="absolute z-20" color={background} onChange={handleChange} />
              </div>
            )}
          </div>
          <div className="flex justify-center items-center gap-2">
            <label className="form-control w-full max-w-xs">
              <input
                type="text"
                placeholder="Color Name"
                className="input input-bordered w-full max-w-xs h-14"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-primary h-14">
              {selectedColor ? "Update Color" : "Save Color"}
            </button>
          </div>
        </form>
        {showSuccessToast && (
          <div className="toast toast-center toast-middle">
            <div className="alert alert-success">
              <span>{selectedColor ? "Color Updated Successfully." : "Color Saved Successfully."}</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ColorPicker;
