import { FaChessKnight } from "react-icons/fa";
import React, { FormEventHandler } from "react";

type FormProps = {
  action: FormEventHandler<HTMLFormElement>;
  size: number;
};

const KnightTour: React.FC<FormProps> = ({ action, size }) => {
  return (
    <div>
      <div className="container w-1/2 py-10 h-fit bg-white rounded-lg shadow-xl flex flex-col items-center">
        <h2 className="text-2xl font-bold flex items-center text-gray-800">
          The Knight Tour <FaChessKnight size={20} />
        </h2>
        <form
          id="myForm"
          className="mt-8 flex flex-col items-center justify-center"
          onSubmit={action}
        >
          <div className="w-full">
            The chess board (NxN) with N =
            <span className="size text-xl font-semibold">8</span>
            <br />
            Start from row:
            <input
              className="input w-8 h-8 border border-gray-300 rounded-md px-2 py-2 text-center"
              type="text"
              placeholder="x"
              id="inputX"
              name="inputX"
            />
            and column:
            <input
              className="input w-8 h-8 border border-gray-300 rounded-md px-2 text-center"
              type="text"
              placeholder="y"
              id="inputY"
              name="inputY"
            />
            <div className="font-medium text-gray-700 text-sm mt-2">
              (0 ≤ x, y ≤ N - 1)
            </div>
          </div>
          <button
            className="button-28 mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mb-5"
            type="submit"
          >
            Start the Knight's Tour
          </button>
        </form>
        <div
          className="mt-8 w-400 h-400 flex items-center justify-center"
          id="board"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default KnightTour;
