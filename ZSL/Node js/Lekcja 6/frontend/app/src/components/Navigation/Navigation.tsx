import './Navigation.css'
import { BrowserRouter as Router, Routes, Route, useLocation, NavLink } from "react-router-dom";
import Home from '../Home/Home';
import { Button, Image, Navbar, Popover, Text, Input, Grid, Modal, Row, Loading, Spacer, Avatar, Tooltip, Dropdown } from '@nextui-org/react';
import logo from '../../assets/logo.png'
import { motion } from 'framer-motion'
import { FiLogIn, FiMail, FiLock, FiUser, FiLogOut, FiInfo, FiSettings } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import avatar from '../../assets/avatar.jpeg'
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';
import serverOp from '../../serverOperations'
import Cookies from 'js-cookie';



function Navigation() {
  
  const [userInfo, setUserInfo] = useState<any>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      if(Cookies.get('token') != undefined){
        try {
            const response = await serverOp.serverGetBearer("/api/profile", Cookies.get('token'));
            setUserInfo(response)
        } catch (error) {
            // console.error(error);
        }
      }
    };

    fetchData();
}, []);

  return (
    <Router>
      <RouterList userInfo={userInfo} setUserInfo={setUserInfo}/>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="tags" element={<h1>Tagi</h1>} />
        <Route path="profile" element={<Profile  userInfo={userInfo} setUserInfo={setUserInfo} />} />
        <Route path="settings" element={<Settings userInfo={userInfo} setUserInfo={setUserInfo} />} />
      </Routes>
    </Router>
  );
}


const RouterList = ({userInfo, setUserInfo}: any) => {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState(false)

  // login

  const [logSuccess, setLogSuccess] = useState<any>()
  // dane
  const [logCredentials, setLogCredentials] = useState<string>("")
  const [logPassword, setLogPassword] = useState<string>("")

  //helpery
  const [logCredentialsHelper, setLogCredentialsHelper] = useState<string>("")
  const [logPasswordHelper, setLogPasswordHelper] = useState<string>("")

  // register

  const [regSuccess, setRegSuccess] = useState<any>()
  //dane
  const [regLogin, setRegLogin] = useState<string>("")
  const [regName, setRegName] = useState<string>("")
  const [regSurname, setRegSurname] = useState<string>("")
  const [regEmail, setRegEmail] = useState<string>("")
  const [regPassword, setRegPassword] = useState<string>("")
  //helpery
  const [regLoginHelper, setRegLoginHelper] = useState<string>("")
  const [regNameHelper, setRegNameHelper] = useState<string>("")
  const [regSurnameHelper, setRegSurnameHelper] = useState<string>("")
  const [regEmailHelper, setRegEmailHelper] = useState<string>("")
  const [regPasswordHelper, setRegPasswordHelper] = useState<string>("")



  // const [userImg, setUserImg] = useState<any>(null)
  




  return (
    <>
      <Navbar variant="floating">
        <Navbar.Content className='linksContent' variant="default">
          <Navbar.Brand>
            <Image src={logo} alt="logo" width="36px" height="36px" />
          </Navbar.Brand>
          <Navbar.Item isActive={location.pathname == "/"} className="navbarItem"><NavLink to="/" className='link'><motion.div whileTap={{ opacity: 0 }} transition={{ minDuration: 2 }} style={{ fontWeight: (location.pathname == "/") ? "bold" : "normal" }}>HOME</motion.div></NavLink></Navbar.Item>
          <Navbar.Item isActive={location.pathname == "/tags"} className="navbarItem"><NavLink to="/tags" className='link'><motion.div whileTap={{ opacity: 0 }} transition={{ minDuration: 2 }} style={{ fontWeight: (location.pathname == "/tags") ? "bold" : "normal" }}>TAGS</motion.div></NavLink></Navbar.Item>
        </Navbar.Content>
        {Cookies.get('token') == undefined ?
          <Navbar.Content>
            <Navbar.Item>
              <Popover placement='left'>
                <Popover.Trigger>
                  <Button auto ghost color="primary">Log in</Button>
                </Popover.Trigger>
                <Popover.Content className='loginPopover'>
                  <Grid.Container gap={0.5}>
                    <Grid xs><Input placeholder='login or mail' className='loginInput' helperText={logCredentialsHelper} helperColor='error' onChange={(value) => { setLogCredentials(value.target.value) }} /></Grid>
                    <Grid xs><Input.Password placeholder='password' className='loginInput' helperText={logPasswordHelper} helperColor='error' onChange={(value) => { setLogPassword(value.target.value) }} /></Grid>
                    <Grid xs={2}><Button auto flat color="success" onPress={
                      async () => {
                        let validation = true
                        if (logCredentials == "") {
                          setLogCredentialsHelper("Pole login nie moze byc puste")
                          validation = false
                        } else {
                          setLogCredentialsHelper("")
                        }
                        if (logPassword == "") {
                          setLogPasswordHelper("Pole hasło nie moze być puste")
                          validation = false
                        } else {
                          setLogPasswordHelper("")
                        }

                        if (validation) {
                          let result = await serverOp.serverPost("/api/user/login", { credentials: logCredentials, password: logPassword })
                          switch (result.status) {
                            case 404:
                              setLogCredentialsHelper("Nie ma takiego uzytkownika")
                              break
                            case 401:
                              setLogCredentialsHelper("Uzytkownik nie jest potwierdzony")
                              break
                            case 402:
                              setLogPasswordHelper("Błędne hasło")
                              break
                            case 200:
                              setLogSuccess(true)
                              Cookies.set('token', result.token, { expires: 2 / 24 });
                              break
                          }
                        }
                      }
                    }><FiLogIn size={20} /></Button></Grid>
                  </Grid.Container>
                </Popover.Content>
              </Popover>
            </Navbar.Item>
            <Navbar.Item><Button auto flat onPress={() => { setVisible(true) }}>Sign up</Button></Navbar.Item>
          </Navbar.Content>
          :
          <Navbar.Content>
            <Dropdown placement='bottom-right'>
              <Dropdown.Trigger>
                <Avatar
                  pointer
                  size="lg"
                  src={(userInfo?.login) ? "http://localhost:4000/api/photos/photofromurl/" + userInfo.login : ""}
                  color="primary"
                  bordered
                />
              </Dropdown.Trigger>
              <Dropdown.Menu color="primary" aria-label="Actions" css={{ $$dropdownMenuWidth: "280px" }}>
                <Dropdown.Item
                  key="profile"
                  description="Go to your profile"
                  icon={<FiUser size={20} />}
                >
                  <NavLink to="/profile" className='link'>Profile</NavLink>

                </Dropdown.Item>
                <Dropdown.Item
                  key="settings"
                  description="Change settings here"
                  icon={<FiSettings size={20} />}
                >
                  <NavLink to="/settings" className='link'>Settings</NavLink>
                </Dropdown.Item>
                <Dropdown.Item
                  key="help"
                  description="Here you get some help"
                  icon={<FiInfo size={20} />}
                >
                  <NavLink to="/information" className='link'>Information</NavLink>
                </Dropdown.Item>
                <Dropdown.Item
                  withDivider
                  key="logout"
                  color="error"
                  description="Log out from your account"
                  icon={<FiLogOut size={20} />}>
                  <a className='link'
                  onClick = {
                    () => {
                      serverOp.serverGetBearer("/api/user/logout", document.cookie)
                      setLogSuccess(false)
                      Cookies.remove('token');
                      window.location.href="/"
                    }
                  }
                  >Log out</a>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        }
      </Navbar>
      <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={() => { setVisible(false); setRegSuccess(null) }}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Registration
          </Text>
        </Modal.Header>
        {!regSuccess ? (
          <>
            <Modal.Body>
              <div className='regInputHolder'><Input className='regInput' helperText={regLoginHelper} helperColor='error' clearable bordered fullWidth color="primary" size="lg" placeholder="Login" contentLeft={<FiUser size={15} />} onChange={(value) => { setRegLogin(value.target.value) }} /></div>
              <div className='regInputHolder'><Input className='regInput' helperText={regNameHelper} helperColor='error' clearable bordered fullWidth color="primary" size="lg" placeholder="Name" contentLeft={<>N</>} onChange={(value) => { setRegName(value.target.value) }} /></div>
              <div className='regInputHolder'><Input className='regInput' helperText={regSurnameHelper} helperColor='error' clearable bordered fullWidth color="primary" size="lg" placeholder="Lastname" contentLeft={<>L</>} onChange={(value) => { setRegSurname(value.target.value) }} /></div>
              <div className='regInputHolder'><Input className='regInput' helperText={regEmailHelper} helperColor='error' clearable bordered fullWidth color="primary" size="lg" placeholder="Email" contentLeft={<FiMail size={15} />} onChange={(value) => { setRegEmail(value.target.value) }} /></div>
              <div className='regInputHolder'><Input.Password className='regInput' helperText={regPasswordHelper} helperColor='error' clearable bordered fullWidth color="primary" size="lg" placeholder="Password" contentLeft={<FiLock size={15} />} onChange={(value) => { setRegPassword(value.target.value) }} /></div>
            </Modal.Body>
            <Modal.Footer>
              <Row gap={3}>
                <Button flat color="error" onPress={() => { setVisible(false) }} size="sm">
                  Close
                </Button>
                <Spacer />
                <Button onPress={async () => {
                  // setAction(true)
                  let validation = true
                  if (regLogin == "") {
                    setRegLoginHelper("Pole login nie moze być puste")
                    validation = false
                  } else {
                    setRegLoginHelper("")
                  }
                  if (regName == "") {
                    setRegNameHelper("Pole imię nie moze być puste")
                    validation = false
                  } else {
                    setRegNameHelper("")
                  }
                  if (regSurname == "") {
                    setRegSurnameHelper("Pole nazwisko nie moze być puste")
                    validation = false
                  } else {
                    setRegSurnameHelper("")
                  }
                  if (regEmail == "") {
                    setRegEmailHelper("Pole email nie moze być puste")
                    validation = false
                  } else {
                    setRegEmailHelper("")
                  }
                  if (regPassword == "") {
                    setRegPasswordHelper("Pole password nie moze być puste")
                    validation = false
                  } else {
                    setRegPasswordHelper("")
                  }
                  if (!regEmail.includes("@")) {
                    setRegEmailHelper("Podano nieprawidłowy adres email")
                    validation = false
                  } else {
                    setRegEmailHelper("")
                  }

                  if (regLogin.length < 5) {
                    setRegLoginHelper("Pole login musi składać się z co najmniej 5 znaków")
                  } else {
                    setRegLoginHelper("")
                  }

                  if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,}$/.test(regPassword))) {
                    setRegPasswordHelper("Twoje hasło powinno składać się przynajmniej z 5 znaków, 1 małej litery, 1 duej litery, liczby i znaku specjalnego")
                    validation = false
                  } else {
                    setRegPasswordHelper("")
                  }


                  if (validation) {
                    let body = {
                      login: regLogin,
                      name: regName,
                      lastName: regSurname,
                      email: regEmail,
                      password: regPassword
                    }
                    let result: any = await serverOp.serverPost("/api/user/register", body)
                    switch (result.status) {
                      case 409:
                        if (result.problem == "login") {
                          setRegLoginHelper("Uzytkownik o takim loginie juz istnieje")
                        } else if (result.problem == "email") {
                          setRegEmailHelper("Uzytkownik o takim emailu juz istnieje")
                        }
                        break;
                      case 201:
                        setRegSuccess(result)
                        break;
                    }
                  }


                }} size="sm">
                  {(!action) ? "Sign up" : <Loading type="points-opacity" color="currentColor" size="sm" />}
                </Button>
              </Row>
            </Modal.Footer>
          </>
        ) : (
          <>
            <Modal.Body>
              <p style={{ overflowWrap: "break-word" }}>{regSuccess.message}</p>
              <a href={regSuccess.link} target='_blank' style={{ textAlign: "center" }}>link</a>
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  )
}

export default Navigation
