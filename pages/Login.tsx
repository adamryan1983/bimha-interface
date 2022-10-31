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
  authenticated: string;
  setAuthenticated: (authenticated: string) => void;
}

const Login = (props: Props) => {

  const [password,setPassword] = useState();

  const [passwordBlog, setPasswordBlog] = useState<string>();

  const {authenticated, setAuthenticated} = useAuthenticated();

  const [error, setError] = useState('')

  const [errorBlog, setErrorBlog] = useState('')


  const verifyPassword = () => {
    password === process.env.NEXT_PUBLIC_PASSPHRASE ? (setAuthenticated('main'), setError('')): (setAuthenticated('false'),setError('Incorrect Password'));
  }

  const verifyPasswordBlog = () => {
    passwordBlog === process.env.NEXT_PUBLIC_PASSPHRASE_BLOG ? (setAuthenticated('blog'), setError('')): (setAuthenticated('false'),setErrorBlog('Incorrect Password'));
  }

  const handlePassword = (event: any) => {
    setPassword(event.target.value);
  };

  const handlePasswordBlog = (event: any) => {
    setPasswordBlog(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>BIMHA Admin</title>
        <meta name="description" content="BIMHA Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>BIMHA Management</h1>
        <div className={styles.teamSection}>
          <h2 className={styles.title}>
            BIMHA Team Admin Portal (Coaches, Parent Rep, and Board Member Access Only)
          </h2>
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
      <div className={styles.blogSection}>
          <h3 className={styles.title}>
            BIMHA Blog Editor (Site Admin only)
          </h3>
          <h4 className={styles.title}>
          Enter the password:
          </h4>
          <p className={styles.p}>
            <InputText type="password" className={styles.password} onChange={handlePasswordBlog}/>
          </p>
          <Button className={styles.submitButton} onClick={verifyPasswordBlog}>Login</Button>
          <div style={{color: 'red'}}>{errorBlog}</div>
        </div>
    </div>
  )
}

export default Login
