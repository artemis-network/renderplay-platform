import type { AnswerTuple, CellData, CluesData, CluesInput, Direction, GridData } from './types';
export declare const bothDirections: Direction[];
export declare function isAcross(direction: Direction): boolean;
export declare function otherDirection(direction: Direction): "across" | "down";
export declare function calculateExtents(data: CluesInput, direction: Direction): {
    [x: string]: number;
};
export declare function createEmptyGrid(size: number): GridData;
export declare function fillClues(gridData: GridData, clues: CluesData, data: CluesInput, direction: Direction): void;
export declare function createGridData(data: CluesInput): {
    size: number;
    gridData: GridData;
    clues: CluesData;
};
interface HasNumber {
    number: string;
}
export declare function byNumber(a: HasNumber, b: HasNumber): number;
export declare type GuessData = ({
    guess?: string;
} | CellData)[][];
export declare function clearGuesses(storageKey: string): void;
export declare function saveGuesses(gridData: GuessData, storageKey: string): void;
export declare function serializeGuesses(gridData: GuessData): Record<string, string>;
export declare function loadGuesses(gridData: GuessData, storageKey: string): void;
export declare function deserializeGuesses(gridData: GuessData, guesses: Record<string, string>): void;
export declare function findCorrectAnswers(data: CluesInput, gridData: GuessData): AnswerTuple[];
export {};
