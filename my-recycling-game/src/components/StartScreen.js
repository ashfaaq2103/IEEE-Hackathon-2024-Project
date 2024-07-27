import React from 'react';
import '../styles/StartScreen.scss';

const StartScreen = () => (
  <div className="startScreen">
    <div className="rules rules1">
      <div className="rulesCont">
        <h1>It’s raining rubbish!</h1>
        <p>But fear not, you can do your bit to help. <br/> Click to recycle the good rubbish.</p>
        <div className="items">
          <div className="avoid">
            <h2>AVOID <span style={{ color: '#b43939' }}>-1 Points</span></h2>
            <div className="item avoid1">
              <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/bad4.svg" alt=""/>
              <p>Yoghurt pots</p>
            </div>
            {/* Add other items similarly */}
          </div>
          <div className="collect">
            <h2>COLLECT <span style={{ color: '#56b439' }}>+2 Points</span></h2>
            <div className="item collect1">
              <img src="https://res.cloudinary.com/dilgjzsjl/image/upload/v1517505548/hcc/icons/good1.svg" alt=""/>
              <p>Clean drinks bottle without lid</p>
            </div>
            {/* Add other items similarly */}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StartScreen;
