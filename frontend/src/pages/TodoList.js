import React, { useState } from "react";
import Typography from '@material-ui/core/Typography';

const putItemInTableEndpoint = 'https://v1qo2mhy9g.execute-api.us-east-1.amazonaws.com/dev/put';

const TodoList = () => {

  const [inputValue, setInputValue] = useState({value: '', id: ''});

  const handleOnChange = (event) => {
    const newValueObject = Object.assign({}, inputValue);
    newValueObject.value = event.target.value;
    setInputValue(newValueObject);
  }

  const saveToDatabase = async () => {
    if (inputValue) {
      const body = {
        tableName: 'TodoList',
        record: {
          id: '234kh234lkj5h',
          value: inputValue
        }
      }

      console.log('body', body)
  
      await fetch(putItemInTableEndpoint, {
        method: "POST",
        body: JSON.stringify(body),
        mode: "no-cors",
        headers: {
          "content-type": "application/json",
        },
      });
    }
    
  };

  return (
    <div style={{padding: '20px 40px'}}>
      <Typography variant="h4" component="h4" mb={3}>
      Todo List
      </Typography>
    
      <textarea value={inputValue.value} onChange={handleOnChange} onBlur={() => saveToDatabase()}/>
    </div>
  );
};

export default TodoList;
