import type { VotesProps } from "../../types/Votes";
import css from "./VoteStats.module.css";

interface VoteStatsProps {
  votes: VotesProps;
  totalVotes: number;
  positiveRate: number;
}

export default function VoteStats({
  votes,
  totalVotes,
  positiveRate,
}: VoteStatsProps) {
  return (
    <div className={css.container}>
      <p className={css.stat}>
        Good: <strong> {votes.good} </strong>
      </p>
      <p className={css.stat}>
        Neutral: <strong> {votes.neutral} </strong>
      </p>
      <p className={css.stat}>
        Bad: <strong> {votes.bad} </strong>
      </p>
      <p className={css.stat}>
        Total: <strong> {totalVotes} </strong>
      </p>
      <p className={css.stat}>
        Positive: <strong> {positiveRate} %</strong>
      </p>
    </div>
  );
}
