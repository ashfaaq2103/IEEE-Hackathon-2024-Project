// Game.js
import React, { useState } from 'react';
import '../styles/Game.scss';

const Game = () => {
  const [score, setScore] = useState(0);

  const handleScoreChange = (points) => {
    setScore(prevScore => prevScore + points);
  };

  return (
    <div className="game">
      <div className="startScreen">
        <div className="rules">
          <div className="rulesCont">
            <h1>It’s raining rubbish!</h1>
            <p>But fear not, you can do your bit to help.<br/>Click to recycle the good rubbish.</p>
            <div className="items">
              <div className="avoid">
                <h2>AVOID <span style={{ color: '#b43939' }}>-1 Points</span></h2>
                <div className="item avoid1">
                  <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/bad4.svg" alt="Yoghurt pots" />
                  <p>Yoghurt pots</p>
                </div>
                <div className="item avoid2">
                  <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/bad5.svg" alt="Food trays" />
                  <p>Food trays</p>
                </div>
                <div className="item avoid3">
                  <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/bad3.svg" alt="Items tied in a plastic bag" />
                  <p>Items tied in a plastic bag</p>
                </div>
              </div>

              <div className="collect">
                <h2>COLLECT <span style={{ color: '#56b439' }}>+2 Points</span></h2>
                <div className="item collect1">
                  <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/good1.svg" alt="Clean drinks bottle without lid" />
                  <p>Clean drinks bottle without lid</p>
                </div>
                <div className="item collect2">
                  <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/good2.svg" alt="Clean shampoo bottle without lid" />
                  <p>Clean shampoo bottle without lid</p>
                </div>
                <div className="item collect3">
                  <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/good3.svg" alt="Clean detergent bottle without lid" />
                  <p>Clean detergent bottle without lid</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="endScreen">
        <div className="rules">
          <div className="rulesCont">
            <h1>Good Job!</h1>
            <p>Let's Go Green</p>
          </div>
        </div>
      </div>

      <div className="gameContainer">
        <div id="goodObjects">
          {Array.from({ length: 10 }, (_, index) => (
            <input
              key={index}
              type="checkbox"
              className="goodObject object"
              onChange={() => handleScoreChange(2)}
              style={{
                animationDuration: `${Math.random() * 2 + 1}s`
              }}
            />
          ))}
        </div>

        <div id="badObjects">
          {Array.from({ length: 10 }, (_, index) => (
            <input
              key={index}
              type="checkbox"
              className="badObject object"
              onChange={() => handleScoreChange(-1)}
              style={{
                animationDuration: `${Math.random() * 2 + 1}s`
              }}
            />
          ))}
        </div>

        {/* Adjusted score positioning */}
        <div className="scoreContainer">
          <h3 className="score">Score is {score}</h3>
        </div>
        <div className="countdownBar"></div>
      </div>
    </div>

  );
};

export default Game;
