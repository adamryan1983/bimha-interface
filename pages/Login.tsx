import React, {useState} from 'react'
import Head from 'next/head'
import styles from '@styles/Login.module.scss'
import { useAuthenticated } from '@lib/context/state'

//prime imports
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css';
import 'primereact/resources/primereact.css';

type Props = {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const Login = (props: Props) => {

  const [password,setPassword] = useState();

  const {authenticated, setAuthenticated} = useAuthenticated();

  const [error, setError] = useState('')

  const verifyPassword = () => {
    password === process.env.NEXT_PUBLIC_PASSPHRASE ? (setAuthenticated(true), setError('')): (setAuthenticated(false), 
    setTimeout(() => {
      setError('')
    }, 2000), setError('Incorrect Password'))
  }

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Hockey Admin</title>
        <meta name="description" content="Hockey Admin Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Hockey Team Management</h1>
        <div className={styles.teamSection}>
          <h2 className={styles.title}>
            Hockey Team Admin Portal
          </h2>
          <h5 className={styles.subTitle}>
          (Coaches, Parent Rep, and Board Member Access Only)
          </h5>
          <h4 className={styles.title}>
            Enter the password:
          </h4>
          <p className={styles.p}>
            <InputText type="password" className={styles.password} onChange={handlePassword}/>
          </p>
          <Button className={styles.submitButton} onClick={verifyPassword}>Login</Button>
          <div style={{color: 'red'}}>{error}</div>
        </div>
        
      </main>
    </div>
  )
}

export default Login
