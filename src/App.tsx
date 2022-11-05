import React, { useEffect, useState } from 'react';
import { ActivitiesList } from './config/types';
import './App.css';


function App() {
  const [activities, setActivities] = useState<ActivitiesList>();
  const [participantsAmount, setParticipantsAmount] = useState<string>('any');
  const [queryLink, setQueryLink] = useState<string>('http://www.boredapi.com/api/activity');
  const api = async () => {
    const data = await fetch(queryLink, {
      method: 'GET'
    });
    const jsonData = await data.json();
    setActivities(jsonData);
  };

  const handleSelect = (e: any) => {
    setParticipantsAmount(e.target.value)
  }

  useEffect(() => {
    if(participantsAmount !== 'any') {
      setQueryLink(`http://www.boredapi.com/api/activity?participants=${participantsAmount}`);
    } else {
      setQueryLink(`http://www.boredapi.com/api/activity/`);
    }
  }, [participantsAmount])

  return (
    <div className='App'>
      <h3>This app will help you find something to do. Or you will be even more bored by pressing the button.</h3>
      <hr />
      <div className='participantsFilter'>
        <label>Select number of participants(optional): </label>
        <select onChange={handleSelect}>
          <option value='any'>Any</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
      </div>
      <button className='generateBtn' onClick={() => api()}>Generate</button>
      {activities && <div className='activitiesListWrap'>
        <p><b>Activity: </b>{activities.activity}</p>
        <p><b>Participants: </b>{activities.participants}</p>
      </div>}
      <footer className='appFooter'>Yon | 2022</footer>
    </div>
  );
}

export default App;
