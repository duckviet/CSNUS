"use client";

import KnightTour from "@/components/KnightTour";
import React, { useState, FormEvent } from "react";
import { FaChessKnight } from "react-icons/fa";

function TheKnightTour() {
  const BOARD_SIZE: number = 8;

  function formAction(e: FormEvent) {
    let container: HTMLElement = document.getElementById("board")!;
    container.innerHTML = "";
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newXstartVal = Number(formData.get("inputX"));
    const newYstartVal = Number(formData.get("inputY"));
    if (
      !(newXstartVal >= 0 && newXstartVal < 8) ||
      !(newYstartVal >= 0 && newYstartVal < 8)
    ) {
      console.log("Start position is not valid. Try again");
      alert("Don't have Knight's Tour. Try another solution");
    } else {
      const finalBoard = knightTour(newXstartVal, newYstartVal);

      renderChessBoard(finalBoard, container);
    }
  }

  function validMoves(
    row: number,
    col: number,
    board: number[][],
    N: number
  ): number[][] {
    const moves: number[][] = [];
    const rowMoves = [-2, -1, 1, 2, 2, 1, -1, -2];
    const colMoves = [1, 2, 2, 1, -1, -2, -2, -1];

    for (let i = 0; i < 8; i++) {
      const newRow = row + rowMoves[i];
      const newCol = col + colMoves[i];

      if (
        newRow >= 0 &&
        newRow < N &&
        newCol >= 0 &&
        newCol < N &&
        board[newRow][newCol] === 0
      ) {
        moves.push([newRow, newCol]);
      }
    }

    return moves;
  }

  function solve(
    row: number,
    col: number,
    moveNum: number,
    board: number[][],
    N: number
  ): boolean {
    board[row][col] = moveNum;

    if (moveNum === N * N) return true;

    const moves = validMoves(row, col, board, N);
    moves.sort(
      (a, b) =>
        validMoves(a[0], a[1], board, N).length -
        validMoves(b[0], b[1], board, N).length
    );

    for (const move of moves) {
      const [newRow, newCol] = move;
      if (solve(newRow, newCol, moveNum + 1, board, N)) {
        return true;
      }
    }

    board[row][col] = 0;
    return false;
  }

  function knightTour(startRow: number, startCol: number): number[][] {
    const board: number[][] = Array.from({ length: BOARD_SIZE }, () =>
      Array(BOARD_SIZE).fill(0)
    );

    if (solve(startRow, startCol, 1, board, BOARD_SIZE)) {
      console.log("Knight's tour is possible");

      console.log("Board\n", board.map((row) => row.join(" ")).join("\n "));
    } else {
      console.log("Knight's tour is not possible");
    }

    return board;
  }

  function renderChessBoard(board: number[][], container: HTMLElement) {
    function renderNumber(index: number) {
      if (index >= 0 && index < theMoves.length) {
        const move = theMoves[index];
        const cellId = `box_${move[1]}_${move[2]}`;
        container.querySelector(`#${cellId}`)!.innerHTML = `
        <i class="animate__animated animate__slideInDown  knight fa-solid fa-chess-knight "></i>
        `;
        setTimeout(() => {
          container.querySelector(`#${cellId}`)!.innerHTML = `${move[0]}`;
          renderNumber(index + 1);
        }, 500);
      }
    }

    let theMoves: number[][] = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const tmp = [board[i][j], i, j];
        theMoves.push(tmp);
      }
    }
    theMoves.sort((a, b) => a[0] - b[0]);

    console.log(
      "Step by step:\n",
      theMoves
        .map((move, index) => `s${index + 1}(${move.slice(1, 3).join(" ")})`)
        .join(" -> ")
    );

    const html: string[] = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const cellContent = `<div id="box_${i}_${j}" class="flex items-center justify-center h-10 w-10 border-solid border-2 border-black font-medium ${
          (i + j) % 2 === 0 ? "bg-black text-white" : "bg-slate-100 text-black"
        }"></div>`;
        html.push(cellContent);
      }
    }
    container.innerHTML = html.join("");
    renderNumber(0);
  }

  return <KnightTour action={formAction} size={BOARD_SIZE} />;
}

export default TheKnightTour;
