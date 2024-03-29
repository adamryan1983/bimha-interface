import Head from 'next/head'
import { useState } from 'react'
import styles from '@styles/MainPage.module.scss'
import Division from '@pages/divisions/Division'
import { useAuthenticated } from '@lib/context/state'

//primereact components
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
// import 'primereact/resources/primereact.css';


const MainPage = (props: { isConnected: boolean }) => {

  const [ division, setDivision ] = useState('')
  const [ page, setPage ] = useState(false)

  const {setAuthenticated} = useAuthenticated()

  const printer = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setPage(true)
  }

  const handleDivisionChange = (e: any) => {
    setDivision(e.target.value)
  }

  const divisions = [
    {label: 'TimBits', value: 'timbits'},
    {label: 'U9', value: 'u9'},
    {label: 'U11', value: 'u11'},
    {label: 'U13', value: 'u13'},
    {label: 'U15', value: 'u15'},
    {label: 'U18', value: 'u18'},
    {label: 'U11 Eagles', value: 'u11eagles'}
];
  return (
    <>
    { page ? <Division division={division} isConnected={props.isConnected}/> :
    <form>
      <div className={styles.container}>
        <Head>
          <title>Hockey League</title>
          <meta name="description" content="Hockey Website" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h2 className={styles.title}>
            <div className={styles.centered}>
              <p>Welcome to the</p>
              <span className={styles.link}>HOCKEY</span> Management System
            </div>
          </h2>
          
          <p className={styles.p}>
            Choose the division you want to manage:
          </p>
          Division: 
          <Dropdown 
            value={division} 
            options={divisions} 
            onChange={handleDivisionChange} 
            placeholder="Select a Division"
          />
          <p className={styles.p}>
              <Button onClick={printer} label="Submit"/>
          </p>
          <Button onClick={() => setAuthenticated(false)} label="Log Out" style={{backgroundColor: 'red'}}/>
        </main>
      </div>
    </form>
}
    </>
  )
}
export default MainPage