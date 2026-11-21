import type { Metadata } from "next"
import PuzzlesClient from "./puzzles-client"
/**
 * Metadane strony puzzli szachowych.
 *
 * @remarks
 * Autor: matiqueue (Szymon Góral)
 */
export const metadata: Metadata = {
  title: "Chess Puzzles | Mate-Chess",
  description: "Train your chess skills with quizzes and learn the game step by step.",
}
/**
 * PuzzlesPage
 *
 * Komponent renderujący stronę puzzli szachowych. Zawartość strony jest dostarczana przez komponent PuzzlesClient.
 *
 * @returns {JSX.Element} Element JSX reprezentujący stronę puzzli.
 *
 * @remarks
 * Autor: matiqueue (Szymon Góral)
 */
export default function PuzzlesPage() {
  return (
    <>
      <PuzzlesClient />
    </>
  )
}
