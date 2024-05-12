import { useState } from "react";
import { useCreateColorMutation } from "@/redux/services/color";
import { SketchPicker, ColorResult } from "react-color";

interface Color {
  r: number;
  g: number;
  b: number;
  a: number;
}

const ColorPicker = () => {
  const [colorName, setColorName] = useState<string>("");
  const [colorHex, setColorHex] = useState<string>("");
  const [background, setBackground] = useState<string>("#fff");
  const [showSuccessToast, setShowSuccessToast] = useState<boolean>(false);

  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<Color>({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  });

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

  const [createColor, { isLoading, isError }] = useCreateColorMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createColor({ data: { name: colorName, hex: colorHex.toUpperCase() } });
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (error) {
      console.error("Error creating color:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center">
      <form onSubmit={handleSubmit} className="flex">
        <div>
          <div className="inline-block p-2 cursor-pointer" onClick={handleClick}>
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
          <button type="submit" disabled={isLoading} className="btn btn-primary h-14">
            {isLoading ? "Creating..." : "Create Color"}
          </button>
        </div>
      </form>
      {isError && (
        <div className="toast toast-center toast-middle">
          <div className="alert bg-red">
            <span className="text-white">Error Creating Color!!</span>
          </div>
        </div>
      )}
      {showSuccessToast && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Color Created Successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
