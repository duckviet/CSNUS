import React, { FormEventHandler, MouseEventHandler } from "react";
type HandleProps = {
  action_one: MouseEventHandler<HTMLButtonElement>;
  action_two: MouseEventHandler<HTMLButtonElement>;
};
const Puzzle: React.FC<HandleProps> = ({ action_one, action_two }) => {
  return (
    <div>
      <div className="container w-1/2 py-10 h-fit bg-white rounded-lg shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] flex flex-col items-center">
        <h2 className="text-2xl mb-5 font-bold flex items-center text-gray-800">
          Slider 8-Puzzle
          <i className="fa-solid fa-hashtag"></i>
        </h2>

        <div className="w-full font-sans">
          <span>
            &ensp; The 8-puzzle is a sliding puzzle that is played on a 3-by-3
            grid with 8 square tiles labeled 1 through 8, plus a blank square.
            <br />
            &ensp; The goal is to rearrange the tiles so that they are in
            row-major order, using as few moves as possible.
          </span>
        </div>
        <div className="flex flex-row mt-5">
          <button
            className="button-28 font-medium w-40 bg-white px-10  m-5 text-black border-solid border-2 border-black  py-2  
            rounded-md transition-transform hover:text-white hover:bg-black hover:-translate-y-0.5 active:translate-y-0.5  "
            type="submit"
            onClick={action_one}
          >
            Reshuffle
          </button>
          <button
            className="button-28 font-medium w-40 bg-white px-10  m-5 text-black border-solid border-2 border-black  py-2  
            rounded-md transition-transform hover:text-white hover:bg-black hover:-translate-y-0.5 active:translate-y-0.5 "
            type="submit"
            onClick={action_two}
          >
            Solve
          </button>
        </div>

        <div
          className="h-full w-full flex flex-row justify-center"
          id="containBoard"
        >
          <div className="contain flex flex-col items-center">
            <h3 id="b1"></h3>
            <div
              className=" m-4 flex items-center justify-center"
              id="board"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
              }}
            ></div>
          </div>
          <div className="contain flex flex-col items-center">
            <h3 id="b2"></h3>
            <div
              className=" m-4 flex items-center justify-center"
              id="board2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
              }}
            ></div>
          </div>
          <div className="contain flex flex-col items-center">
            <h3 id="b3"></h3>
            <div
              className=" m-4  flex items-center justify-center"
              id="board3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gridTemplateRows: "repeat(3, 1fr)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Puzzle;
