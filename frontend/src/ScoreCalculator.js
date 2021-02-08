import React, { useState } from "react";

 {/* Gym in Morning, Do dishes, Washing, Reading, Meditating,Make Bed,GYM, Wake up time, Bed Time, Turn off screen time, Instrument, Journal, personal projects, career, Calorie Count */}

const habitConfig = {
  Gym: 50,
  Reading: 50,
  Dishes: 10,
  Meditating: 10,
  Instrument: 10,
  Journal: 10,
  'Personal Projects': 20,
  Career: 20,
  'Reddit, Youtube, Chess': -100,
  'Sleep': -20,
  'Posture': 10
};

const dailies = {
  'Make Bed': 10,
  'Out of bed before 7:05am': 20,
  'Out of bed before 8:05am': 10,
  'Turn off screens before 10:05pm': 30,
}

const hours = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

// const getCurrentHour = () =>  new Date().getHours();

const ScoreCalculator = () => {
  const [score, setScore] = useState({
    7: {},
    8: {},
    9: {},
    10: {},
    11: {},
    12: {},
    13: {},
    14: {},
    15: {},
    16: {},
    17: {},
    18: {},
    19: {},
    20: {},
    21: {},
  });

  const [selectedHour, setSelectedHour] = useState(new Date().getHours());

  const totalScoreForHour = hour => Object.values(score[hour]).reduce((a, b) => a + b, 0)

  const totalScoreForDay = () => hours.reduce((acc, cur) => acc + totalScoreForHour(cur), 0)
  
  
  


  const handleSetScore = (category, amount) => {
    const hour = selectedHour;

    if (!score[hour][category]) {
      setScore((prevState) => ({
        ...prevState,
        [hour]: {
          ...prevState[hour],
          [category]: prevState[hour][category] ? prevState[hour][category] + amount : amount,
        },
      }))
    } else {
      setScore((prevState) => ({
        ...prevState,
        [hour]: {
          ...prevState[hour],
          [category]: prevState[hour][category] && prevState[hour][category] > 0 ? prevState[hour][category] - amount : 0,
        },
      }))
    }

  }

  const getButtonColour = score => {
    console.log('getButtonColour', score)
    if (score > 0) return 'lightgreen'
    else if (score < 0) return 'red'
    return 'lightgrey'
  }

  const currentDate = new Date();
  const currentDay = `${currentDate.getDate()}-${currentDate.toLocaleString('default', { month: 'short' })}-${currentDate.getFullYear()}`;

  return (
    <div>

      {/* <h1>{`Daily Score: ${score}`}</h1> */}
      <h4>{`Date: ${currentDay}`}</h4>
      <h1>{`Daily Score: ${totalScoreForDay()}`}</h1>  

      {/* <h3>{`Selected hour: ${selectedHour ? `${selectedHour}:00` : 'Current Hour'}`}</h3> */}

      {Object.keys(habitConfig).map(habit => (
        <>
        <button
        onClick={() => handleSetScore(habit, habitConfig[habit])}
        style={{ background: getButtonColour(score[selectedHour] && score[selectedHour][habit])}}
      >
        <p>{`${habit}`}</p>
        <p>{`${habitConfig[habit]}`}</p>
      </button>
      {/* <button
        onClick={() => console.log(score, selectedHour)}
      >
        <p>{`Remove ${habit}`}</p>
      </button> */}
      </>
      ))}
     


      {/* <button onClick={() => setScore(score + 50)}><h1>Add Gym</h1></button>  */}

      {/* TO ADD: POSTURE, CALORIES */}

      {/* Time view to todos */}
      {/* kanban board view to todos */}
      <hr/>

      {hours.map((hour) => (
        <div>
        <button onClick={() => setSelectedHour(hour)} style={{ background: getButtonColour(totalScoreForHour(hour)), minWidth: totalScoreForHour(hour)+ 100 || 0, color: selectedHour === hour ? 'black' : 'grey', outline: 'none'}} >
          <div>{`${hour}:00 - ${hour + 1}:00`}</div>
          <div>{`Score: ${totalScoreForHour(hour)}`}</div>
        </button>
        </div>
      ))}

    </div>
  );
};

export default ScoreCalculator;
