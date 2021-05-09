import React from "react";
import Typography from '@material-ui/core/Typography';

const Goals = () => {
  return (
    <div style={{padding: "40px"}}>
       <Typography variant="h4" component="h4" mb={3}>
        2020 Goals
      </Typography>
      <p>Saving: </p>
      <p>Health: </p>
      <p>Career: </p>
      <p>Knowledge: </p>

    </div>
  );
};

export default Goals;
