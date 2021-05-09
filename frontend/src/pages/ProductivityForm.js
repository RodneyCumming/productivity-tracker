import React, { useState, useEffect } from "react";

import moment from "moment";

import { Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from "@material-ui/core/List";
import FitnessCenter from "@material-ui/icons/FitnessCenter";
import MenuBook from "@material-ui/icons/MenuBook";
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Straighten from '@material-ui/icons/Straighten';
import Create from '@material-ui/icons/Create';
import AccountTree from '@material-ui/icons/AccountTree';
import Work from '@material-ui/icons/Work';
import Hotel from '@material-ui/icons/Hotel';
import Adjust from '@material-ui/icons/Adjust';
import AirlineSeatReclineNormalIcon from '@material-ui/icons/AirlineSeatReclineNormal';
import Reddit from '@material-ui/icons/Reddit';
import YouTube from '@material-ui/icons/YouTube';
import Games from '@material-ui/icons/Games';

import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';
// const todaysDate = new Date().toLocaleDateString().replaceAll("/", "-");

const IncrementalInput = ({
  value,
  setValue,
  label,
  increaseAmount,
  initialIncrease,
  maxScore,
  Icon
}) => {
  const backgroundColour = (value) => {
    if (value > 0) return "#33eb91";
    if (value < 0) return "#f7665c";
    // else return "unset";
  };
  const increase =
    value === 0 ? initialIncrease || increaseAmount : increaseAmount;
  return (
    <Button
      button
      variant="contained"
      // color="primary"
      onClick={() => setValue(value === maxScore ? 0 : value + increase)}
      style={{
        height: "40px",
        background: backgroundColour(value),
        marginRight: '20px',
        marginBottom: '10px',
        display: 'inline-flex'
      }}
    >
      {/* <ListItemIcon styled={{minWidth: '35px'}}> */}
        {Icon && <Icon  />}
        {/* <InboxIcon /> */}
      {/* </ListItemIcon> */}
      <ListItemText
        primary={`${label}: ${value}`}
        style={{ display: "inline-block", marginLeft: '10px'}}
      />
    </Button>
  );
};

// todo: add sunshine

const ProductivityForm = () => {
  const [gymScore, setGymScore] = useState(0);
  // Break down gym score into back, shoulders, chest
  const [readingScore, setReadingScore] = useState(0);
  const [dishesScore, setDishesScore] = useState(0);
  const [meditationScore, setMeditationScore] = useState(0);
  const [instrumentScore, setInstrumentScore] = useState(0);
  const [journalScore, setJournalScore] = useState(0);
  const [personalProjectsScore, setPersonalProjectsScore] = useState(0);
  const [careerScore, setCareerScore] = useState(0);
  const [postureScore, setPostureScore] = useState(0);
  const [redditScore, setRedditScore] = useState(0);
  const [youtubeScore, setYoutubeScore] = useState(0);
  const [chessScore, setChessScore] = useState(0);
  const [wakeupTimeScore, setWakeupTimeScore] = useState(0);
  const [screenEndTimeScore, setScreenEndTimeScore] = useState(0);
  const [makeBedScore, setMakeBedScore] = useState(0);

  const [dateOffset, setDateOffset] = useState(0);
  // const [date, setDate] = useState(moment().add(dateOffset,'days').format('Do MMM YYYY'))

  const handleSubmit = async () => {
    const inputValues = {
      date: moment().add(dateOffset, "days").format("Do MMM YYYY"),
      gymScore,
      readingScore,
      dishesScore,
      meditationScore,
      instrumentScore,
      journalScore,
      personalProjectsScore,
      careerScore,
      postureScore,
      redditScore,
      youtubeScore,
      chessScore,
      wakeupTimeScore,
      screenEndTimeScore,
      makeBedScore,
    };
    const url =
      "https://v1qo2mhy9g.execute-api.us-east-1.amazonaws.com/dev/productivity";
    await fetch(url, {
      method: "post",
      body: JSON.stringify(inputValues),
      mode: "no-cors",
    });
  };

  const fetchProductivityScores = async (url) => {
    let response = await fetch(url);
    const responseJson = await response.json(); // Logs the response

    const item = responseJson.input.Item;


    if (item) {
      setGymScore(item.gymScore || 0);
      setReadingScore(item.readingScore || 0);
      setDishesScore(item.dishesScore || 0);
      setMeditationScore(item.meditationScore || 0);
      setInstrumentScore(item.instrumentScore || 0);
      setJournalScore(item.journalScore || 0);
      setPersonalProjectsScore(item.personalProjectsScore || 0);
      setCareerScore(item.careerScore || 0);
      setPostureScore(item.postureScore || 0);
      setRedditScore(item.redditScore || 0);
      setYoutubeScore(item.youtubeScore || 0);
      setChessScore(item.chessScore || 0);
      setWakeupTimeScore(item.wakeupTimeScore || 0);
      setScreenEndTimeScore(item.screenEndTimeScore || 0);
      setMakeBedScore(item.makeBedScore || 0);
    } else {
      setGymScore(0);
      setReadingScore(0);
      setDishesScore(0);
      setMeditationScore(0);
      setInstrumentScore(0);
      setJournalScore(0);
      setPersonalProjectsScore(0);
      setCareerScore(0);
      setPostureScore(0);
      setRedditScore(0);
      setYoutubeScore(0);
      setChessScore(0);
      setWakeupTimeScore(0);
      setScreenEndTimeScore(0);
      setMakeBedScore(0);
    }
  };

  useEffect(() => {
    fetchProductivityScores(
      `https://v1qo2mhy9g.execute-api.us-east-1.amazonaws.com/dev/productivity?${new URLSearchParams(
        { date: moment().add(dateOffset, "days").format("Do MMM YYYY") }
      )}`
    );
  }, [dateOffset]);



  return (
    <div>
      {/* <Typography variant="h4" component="h4" style={{ marginBottom: "20px" }}>
        Productivity
      </Typography> */}
      <div style={{background: '#2196f3', padding: '20px 40px', color: 'white', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center'}}>

<Typography variant="h3" component="h3" style={{ textAlign: 'center', fontWeight: '900' }}>
        { gymScore +
      readingScore +
      dishesScore +
      meditationScore +
      instrumentScore +
      journalScore +
      personalProjectsScore +
      careerScore +
      postureScore +
      redditScore +
      youtubeScore +
      chessScore +
      wakeupTimeScore +
      screenEndTimeScore +
      makeBedScore}
      </Typography>
      
      <div style={{display: 'flex', justifyContent: 'center'}}> 
      <Button onClick={() => setDateOffset(dateOffset - 1)}><ChevronLeftIcon style={{color: 'white'}}/></Button>
      <Typography variant="h6" component="h6" style={{margin: '0 20px', display: 'flex', alignItems: 'center'}}>
        {moment().add(dateOffset, "days").format("dddd D MMMM")}
      </Typography>
      <Button onClick={() => setDateOffset(dateOffset + 1)}><ChevronRightIcon style={{color: 'white'}}/></Button>
      </div>
      
      </div>
      <div style={{padding: '0 40px'}}>
      {/* <div style={{display: 'flex', justifyContent: 'center'}}> 
      <Button onClick={() => setDateOffset(0)}><Today /></Button>
      </div> */}
      <List>
      <Typography variant="h6" component="h6" style={{ margin: '20px 0 5px', color: 'navy', display: 'flex', alignItems: 'center'}}>DALIES</Typography>
      <IncrementalInput
        value={gymScore}
        setValue={setGymScore}
        label={"GYM"}
        Icon={FitnessCenter}
        increaseAmount={20}
        initialIncrease={30}
        maxScore={70}
      />
      <IncrementalInput
        value={readingScore}
        setValue={setReadingScore}
        label={"READING"}
        Icon={MenuBook}
        increaseAmount={20}
        initialIncrease={30}
        maxScore={50}
      />
      <IncrementalInput
        value={dishesScore}
        setValue={setDishesScore}
        Icon={LocalCafeIcon}
        label={"DISHES"}
        increaseAmount={10}
        maxScore={10}
      />
      <IncrementalInput
        value={wakeupTimeScore}
        setValue={setWakeupTimeScore}
        label={"OUT OF BED BY 8AM"}
        Icon={Hotel}
        increaseAmount={20}
        maxScore={20}
      />
      <IncrementalInput
        value={screenEndTimeScore}
        setValue={setScreenEndTimeScore}
        label={"SCREEN END TIME 10PM"}
        Icon={DesktopAccessDisabledIcon}
        increaseAmount={20}
        maxScore={20}
      />
      
      <Typography variant="h6" component="h6" style={{ margin: '20px 0 5px', color: 'navy'}}>BONUSES</Typography>
      <IncrementalInput
        value={meditationScore}
        setValue={setMeditationScore}
        label={"MEDITATION"}
        Icon={Adjust}
        increaseAmount={10}
        maxScore={10}
      />
      <IncrementalInput
        value={instrumentScore}
        setValue={setInstrumentScore}
        label={"INSTRUMENT"}
        Icon={Straighten}
        increaseAmount={10}
        maxScore={10}
      />
      <IncrementalInput
        value={journalScore}
        setValue={setJournalScore}
        label={"JOURNAL"}
        Icon={Create}
        increaseAmount={10}
        maxScore={10}
      />
      <IncrementalInput
        value={personalProjectsScore}
        setValue={setPersonalProjectsScore}
        label={"PERSONAL PROJECTS"}
        Icon={AccountTree}
        increaseAmount={10}
        maxScore={10}
      />
      <IncrementalInput
        value={careerScore}
        setValue={setCareerScore}
        label={"CAREER"}
        Icon={Work}
        increaseAmount={20}
        maxScore={20}
      />
      <IncrementalInput
        value={postureScore}
        setValue={setPostureScore}
        label={"POSTURE"}
        Icon={AirlineSeatReclineNormalIcon}
        increaseAmount={20}
        maxScore={20}
      />
      <IncrementalInput
        value={makeBedScore}
        setValue={setMakeBedScore}
        label={"MAKE BED"}
        Icon={Hotel}
        increaseAmount={10}
        maxScore={10}
      />
      
      <Typography variant="h6" component="h6" style={{ margin: '20px 0 5px', color: 'navy'}}>NEGS</Typography>
      <IncrementalInput
        value={redditScore}
        setValue={setRedditScore}
        Icon={Reddit}
        label={"REDDIT"}
        increaseAmount={-20}
        maxScore={-20}
      />
      <IncrementalInput
        value={youtubeScore}
        setValue={setYoutubeScore}
        label={"YOUTUBE"}
        Icon={YouTube}
        increaseAmount={-20}
        maxScore={-20}
      />
      <IncrementalInput
        value={chessScore}
        setValue={setChessScore}
        label={"CHESS"}
        Icon={Games}
        increaseAmount={-50}
        maxScore={-50}
      />
      
      
      
      </List>

      <Button
        style={{ marginTop: "20px" }}
        onClick={handleSubmit}
        variant="contained"
        color="primary"
      >
        SUBMIT
      </Button>
      </div>
    </div>
  );
};

export default ProductivityForm;
