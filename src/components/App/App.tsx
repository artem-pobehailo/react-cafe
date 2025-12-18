import { useState } from "react";
import Cafeinfo from "../CafeInfo/CafeInfo";
import css from "./App.module.css";

import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import type { VotesProps } from "../../types/Votes";

export default function App() {
  const [votes, setVotes] = useState<VotesProps>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (key: keyof VotesProps) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [key]: prevVotes[key] + 1,
    }));
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const canReset = votes.good > 0 || votes.neutral > 0 || votes.bad > 0;
  const totalVotes = votes.bad + votes.good + votes.neutral;

  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <Cafeinfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={canReset}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
