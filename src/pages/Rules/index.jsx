import React from "react";

import "./styles.css";

export const Rules = () => {
  return (
    <div className="RulesContainer">
      <h2>Rules</h2>
      <p>How to gain points?</p>
      <div className="GroupStageMatches">
        <h4>Group stage matches:</h4>
        <ul>
          <li>5 points for getting the result of the game right.</li>
          <li>3 points if only the winner of the match is right.</li>
          <li>1 point if the tie is right but not the result.</li>
        </ul>
      </div>
      <div className="FinalPhaseMatches">
        <h4>Final phase matches:</h4>
        <ul>
          <li>1 point for each team that gets it right.</li>
          <li>
            5 points for getting the result of the game right, including teams.
          </li>
          <li>3 points if only the winner of the match is right.</li>
        </ul>
      </div>
      <div className="FinalMatch">
        <h4>Final match:</h4>
        <ul>
          <li>15 points if the champion is right.</li>
          <li>10 points if the runner-up is right.</li>
        </ul>
      </div>
    </div>
  );
};
