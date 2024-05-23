"use client";
import { useState, useEffect } from "react";
import { SketchPicker, ColorResult, RGBColor } from "react-color";

interface ColorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (colorName: string, colorHex: string) => void;
  selectedColor: any;
}

interface Color extends RGBColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

const ColorModal: React.FC<ColorModalProps> = ({ isOpen, onClose, onSave, selectedColor }) => {
  const [colorName, setColorName] = useState<string>("");
  const [colorHex, setColorHex] = useState<string>("#020202");
  const [background, setBackground] = useState<string>("#020202");
  const [color, setColor] = useState<Color>({
    r: 15,
    g: 1,
    b: 1,
    a: 1,
  });
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

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

  const handleChange = (newColor: ColorResult) => {
    const { r, g, b, a } = newColor.rgb;
    setColor({ r, g, b, a: a ?? 1 }); // Ensure a is always a number
    setBackground(newColor.hex);
    setColorHex(newColor.hex);
  };

  const handleSave = () => {
    onSave(colorName, colorHex);
    onClose();
  };

  const handlePickerClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handlePickerClose = () => {
    setDisplayColorPicker(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative">
        <div className="flex justify-center items-center">
          <h1 className="text-xl">Choose Your Color</h1>
          <button onClick={onClose} className="absolute top-2 right-2 text-black">
            X
          </button>
        </div>
        <div className="flex flex-col items-center">
          <label className="form-control w-full max-w-xs">
            <div className="inline-block mt-5 cursor-pointer " onClick={handlePickerClick}>
              <div
                className="min-w-56 h-14 rounded-md border border-[#d3d4d7]"
                style={{
                  background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                }}
              ></div>
            </div>
            <div className="label">
              <span className="label-text-alt">Pick your color</span>
            </div>
          </label>

          {displayColorPicker && (
            <div className="absolute z-10 mt-2">
              <div className="fixed inset-0" onClick={handlePickerClose} style={{ backgroundColor: "transparent" }}></div>
              <SketchPicker color={background} onChange={handleChange} />
            </div>
          )}
          <label className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="Color Name"
              className="input input-bordered w-full max-w-xs h-14 mt-4"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
            <div className="label">
              <span className="label-text-alt">Pick a name for your color</span>
            </div>
          </label>
          {/* <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">Bottom Right label</span>
            </div>
          </label> */}

          <button onClick={handleSave} className="btn btn-primary min-w-full h-14 mt-4">
            {selectedColor ? "Update" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorModal;
