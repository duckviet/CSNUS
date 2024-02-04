"use client";

import Puzzle from "@/components/Puzzle";
import React, { useState, FormEvent } from "react";

function EightPuzzle() {
  // Kích thước của bảng
  const n: number = 3;
  const m: number = 3;

  const startpos = [
    [
      [1, 2, 3],
      [4, 5, 6],
      [8, 7, 0],
    ],
    [
      [1, 2, 3],
      [0, 4, 6],
      [8, 5, 7],
    ],
    [
      [2, 7, 3],
      [0, 4, 6],
      [8, 5, 1],
    ],
    [
      [3, 7, 2],
      [6, 4, 0],
      [8, 5, 1],
    ],
    [
      [4, 6, 1],
      [7, 2, 8],
      [3, 5, 0],
    ],
    [
      [6, 7, 0],
      [5, 8, 4],
      [1, 3, 2],
    ],
    [
      [6, 1, 4],
      [5, 0, 3],
      [8, 2, 7],
    ],
    [
      [4, 7, 3],
      [1, 6, 2],
      [5, 0, 8],
    ],
    [
      [2, 5, 4],
      [6, 3, 8],
      [7, 1, 0],
    ],
    [
      [7, 1, 3],
      [4, 2, 6],
      [0, 8, 5],
    ],
    [
      [2, 8, 7],
      [4, 5, 3],
      [6, 1, 0],
    ],
    [
      [2, 4, 3],
      [8, 7, 0],
      [1, 6, 5],
    ],
    [
      [6, 8, 4],
      [3, 7, 1],
      [5, 2, 0],
    ],
  ];
  // Trạng thái cuối cùng
  const goal = [
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0],
    ],
    [
      [7, 8, 0],
      [4, 5, 6],
      [3, 2, 1],
    ],
    [
      [2, 3, 8],
      [7, 0, 1],
      [6, 5, 4],
    ],
    [
      [2, 4, 6],
      [7, 0, 8],
      [1, 3, 5],
    ],
  ];

  // Clone deep function
  function cloneDeep(obj: any): any {
    return JSON.stringify(obj);
  }

  // Hàm để đẩy một trạng thái mới và độ ưu tiên của nó vào open và sắp xếp danh sách dựa trên độ ưu tiên f
  function PushNSort(
    open: [number, number, number[][]][],
    f: number,
    q: number,
    new_board: number[][]
  ) {
    open.push([f, q, JSON.parse(cloneDeep(new_board))]);
    open.sort((a, b) => {
      return b[0] - a[0];
    });
  }

  // Hàm để tính kc Manhattan giữa bảng hiện tại và trạng thái cuối cùng
  function manhattan(board: number[][], final: number[][]): number {
    let d: number = 0;

    for (let i: number = 0; i < n; ++i) {
      for (let j: number = 0; j < m; ++j) {
        if (board[i][j] !== final[i][j] && board[i][j] !== 0) {
          let x = Math.floor((board[i][j] - 1) / m);
          let y = (board[i][j] - 1) % m;
          d += Math.abs(x - i) + Math.abs(y - j);
        }
      }
    }
    return d;
  }

  // Hàm để tìm vị trí của số 0 (ô trống) trong bảng
  function PositionZero(board: number[][]) {
    let p: number[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] === 0) {
          p = [i, j];
          break;
        }
      }
    }
    return p;
  }

  //Phát hiện bảng không thể giải quyết được dựa vào "when n is odd, an n-by-n board is solvable if and only if its number of inversions is even".
  function inversions(board: number[][]) {
    let v = [];
    let sum = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (board[i][j] !== 0) {
          v.push(board[i][j]);
        }
      }
    }
    for (let i = 0; i < v.length - 1; i++) {
      for (let j = i + 1; j < v.length; j++) {
        if (v[i] > v[j]) sum++;
      }
    }
    return sum;
  }
  function slidingPuzzle(
    start: number[][],
    final: number[][],
    path: number[][][]
  ) {
    type OpenElementType = [number, number, number[][]];

    let open: OpenElementType[] = [];
    let close: string[] = [];
    interface IMap {
      [key: string]: string;
    }

    let parent: IMap = {};

    PushNSort(open, manhattan(start, final), 0, JSON.parse(cloneDeep(start)));

    let flag = false;
    let numberStep = 0;
    // Theo thứ tự
    let dx = [0, 0, 1, -1];
    let dy = [1, -1, 0, 0];

    while (open.length > 0) {
      let T: OpenElementType | undefined = open.pop();
      if (T) {
        let t: number[][] = T[2];
        if (inversions(t) % 2 === 1) {
          flag = false;
          break;
        }
        if (JSON.stringify(t) === JSON.stringify(final)) {
          numberStep = T[1];
          flag = true;
          break;
        }
        if (close.indexOf(JSON.stringify(t)) !== -1) {
          continue;
        }
        close.push(JSON.stringify(t));

        let pos = PositionZero(t);

        for (let i = 0; i < 4; i++) {
          let x_new = pos[0] + dx[i];
          let y_new = pos[1] + dy[i];
          let new_board: number[][] = JSON.parse(cloneDeep(t));

          if (x_new >= 0 && x_new < n && y_new >= 0 && y_new < m) {
            [new_board[pos[0]][pos[1]], new_board[x_new][y_new]] = [
              new_board[x_new][y_new],
              new_board[pos[0]][pos[1]],
            ];

            let manhattanDistance = manhattan(new_board, final);
            if (close.indexOf(JSON.stringify(new_board)) === -1) {
              PushNSort(open, T[1] + manhattanDistance, T[1] + 1, new_board);
              parent[JSON.stringify(new_board)] = JSON.stringify(t);
            }
          }
        }
      }
    }
    if (flag) {
      let i = 0;
      let curr = JSON.stringify(final);

      while (i < numberStep) {
        path.push(JSON.parse(curr));
        curr = parent[curr];
        i++;
      }
      path.reverse();

      console.log("Path length: " + numberStep);
      console.log("start: ", JSON.stringify(start));
      console.log("finish: ", JSON.stringify(final));
      console.log("step by step: ", path);
    } else {
      console.log("Dont have solution");
    }
  }
  let path: number[][][] = [];
  let start: number[][];
  let final: number[][];

  function action_one() {
    const board1: HTMLElement = document.getElementById("board")!;
    const board2: HTMLElement = document.getElementById("board2")!;

    const b1: HTMLElement = document.getElementById("b1")!;
    const b2: HTMLElement = document.getElementById("b2")!;

    start = startpos[Math.floor(Math.random() * startpos.length)];
    final = goal[Math.floor(Math.random() * goal.length)];

    const html: string[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const cellContent = `<div id="box_${i}_${j}" class="flex items-center justify-center h-10 w-10 border-solid border-2 border-black font-medium ${
          start[i][j] === 0 ? "bg-black text-white" : "bg-slate-100 text-black"
        }"> ${start[i][j]}</div>`;
        html.push(cellContent);
      }
    }
    if (b1 && board1) {
      b1.innerHTML = "Start";
      board1.innerHTML = html.join("");
    }

    const html2: string[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        const cellContent2 = `<div id="box_${i}_${j}" class="flex items-center justify-center h-10 w-10 border-solid border-2 border-black font-medium ${
          final[i][j] === 0 ? "bg-black text-white" : "bg-slate-100 text-black"
        }"> ${final[i][j]}</div>`;
        html2.push(cellContent2);
      }
    }
    if (b2 && board2) {
      b2.innerHTML = "Goal";
      board2.innerHTML = html2.join("");
    }
  }

  function action_two() {
    let index = 0;
    let board3: HTMLElement = document.getElementById("board3")!;
    let b3: HTMLElement = document.getElementById("b3")!;
    path = [];
    board3.innerHTML = "";
    b3.innerHTML = "";
    slidingPuzzle(start, final, path);

    function renderNumber(index: number) {
      if (b3 && board3) {
        b3.innerHTML = "Solve";
        if (index >= 0 && index < path.length) {
          const cur = JSON.parse(JSON.stringify(path[index]));
          const html: string[] = [];
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
              const cellContent: string = `<div id="box_${i}_${j}" class="flex items-center justify-center h-10 w-10 border-solid border-2 border-black font-medium${
                cur[i][j] === 0
                  ? "bg-black text-white"
                  : "bg-slate-100 text-black"
              }"> ${cur[i][j]}</div>`;
              html.push(cellContent);
            }
          }
          setTimeout(
            () => {
              if (board3) {
                board3.innerHTML = html.join("");
                renderNumber(index + 1);
              }
            },
            index === 0 ? 0 : 1500
          );
        }
      }
    }

    renderNumber(0);
  }

  return (
    <div>
      <Puzzle action_one={action_one} action_two={action_two} />
    </div>
  );
}

export default EightPuzzle;
