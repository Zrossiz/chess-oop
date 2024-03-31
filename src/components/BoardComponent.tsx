import React, { useEffect, useState } from "react";
import { Board } from "../models/Board";
import { CellComponent } from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";

interface BoardComponentProps {
    board: Board;
    curPlayer: Player | null;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;
}

export const BoardComponent = ({ board, setBoard, curPlayer, swapPlayer }: BoardComponentProps) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const click = (cell: Cell) => {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            updateBoard();
        } else {
            if (cell.figure?.color === curPlayer?.color) {
                setSelectedCell(cell);
            }
        };
    };

    const highlightCells = () => {
        board.highlightCells(selectedCell);
        updateBoard();
    };

    const updateBoard = () => {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    };

    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    return (
        <div>
            <h3>Текущий игрок: {curPlayer?.color}</h3>
            <div className="board">
                {
                    board.cells.map((row, index) => {
                        return (
                            <React.Fragment key={index}>
                                {row.map(cell => {
                                    return (
                                        <CellComponent 
                                            cell={cell} 
                                            key={cell.id} 
                                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                            click={click}
                                        />
                                    )
                                })}
                            </React.Fragment>
                        );
                    })
                }
            </div>
        </div>
    )
}