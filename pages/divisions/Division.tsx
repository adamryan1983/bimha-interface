import React, {useState} from 'react'
import styles from './Division.module.scss'
import Roster from '../roster/Roster'
import Schedule from '../schedule/Schedule'
import MainPage from '@pages/MainPage'
import Scores from '../scores/Scores'

//primereact
import { Button } from 'primereact/button';

type Props = {
  division: string
  isConnected: boolean
}

const Division = ({isConnected, division}: Props) => {

  const [choice, setChoice] = useState(0)
    {
      switch (choice) {
        case 1:
          return <Roster division={division} />;
        case 2:
          return <Schedule division={division} />;
        case 3:
          return <Scores division={division}/>;
        case 4:
          return <MainPage isConnected={isConnected}/>;
        default:
          return (
            <div className={styles.container}>
              <div className={styles.title}>
                {division} Division 
              </div>
              <div className={styles.content}>
                <div className={styles.option}>
                  Select an option:
                </div>
                <div className={styles.buttons}>
                  <p className={styles.p}><Button className={styles.choicebutton} onClick={() => setChoice(1)}>Roster</Button></p>
                  <p className={styles.p}><Button className={styles.choicebutton} onClick={() => setChoice(2)}>Schedule</Button></p>
                  <p className={styles.p}><Button className={styles.choicebutton} onClick={() => setChoice(3)}>Scores</Button></p>
                </div>
              </div>
              <p className={styles.p}><Button onClick={() => setChoice(4)}>Back</Button></p>
            </div>
        );
      }
    }
}

export default Division