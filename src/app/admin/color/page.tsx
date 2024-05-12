"use client";
import ColorPicker from "@/components/color-picker";

const ColorsSection: React.FC = () => {
  return (
    <>
      <ColorPicker />
      <div className="w-full">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Color</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12 border-2">
                        <img src="https://img.daisyui.com/tailwind-css-component-profile-2@56w.png" alt="Selected Image" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>Purple</td>
                <th>
                  <button className="btn btn-ghost btn-xs">Edit</button>
                </th>
                <th>
                  <button className="btn btn-ghost btn-xs">Delete</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ColorsSection;
