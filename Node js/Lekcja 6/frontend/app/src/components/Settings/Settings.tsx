import { Badge, Button, Col, Collapse, Container, Grid, Input, Row, Text } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { FiCheck } from "react-icons/fi"
import serverOp from "../../serverOperations"
import Cookies from 'js-cookie';

const Settings = ({userInfo, setUserInfo}: any) => {

    const [editAction, setEditAction] = useState(false)
    const [name, setName] = useState<string>()
    const [surname, setSurname] = useState<string>()
    const [login, setLogin] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                if(!userInfo)
                    window.location.href="/"
                const response = await serverOp.serverGetBearer("/api/profile", Cookies.get('token'));
                setUserInfo(response);
                setName(response.name)
                setSurname(response.lastName)
                setLogin(response.login)
                setEmail(response.email)
                setPassword(response.password)
            } catch (error) {
                // Obsługa błędu pobierania danych
                console.error(error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <Container lg css={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: "100px" }}>

            <Text component="div" h2 css={{ paddingLeft: "10px", color: "$blue900" }}>Ustawienia</Text>
            <Collapse.Group shadow>
                <Collapse title="Konto">
                    <Text h5>Twoje dane osobowe:</Text>
                    <Row><Text><b>Imię:&nbsp;</b></Text> {editAction ? <Input placeholder="np: Jan" size="xs" value={name} onChange={(value) => { setName(value.target.value) }} /> : <Text>{name}</Text>}</Row>
                    <Row><Text><b>Nazwisko:&nbsp;</b></Text> {editAction ? <Input placeholder="np: Kowalski" size="xs" value={surname} onChange={(value) => { setSurname(value.target.value) }} /> : <Text>{surname}</Text>}</Row>
                    <Row><Text><b>Login:&nbsp;</b></Text> {editAction ? <Input placeholder="np: jankow" size="xs" value={login} onChange={(value) => { setLogin(value.target.value) }} /> : <Text>{login}</Text>}</Row>
                    <Row><Text><b>Email:&nbsp;</b></Text> {editAction ? <Input placeholder="np: jankow@w.pl" size="xs" value={email} onChange={(value) => { setEmail(value.target.value) }} /> : <Text>{email}</Text>}</Row>
                    <Row><Text><b>Hasło:&nbsp;</b></Text> {editAction ? <Input type="password" placeholder="np: GH38fF" size="xs" onChange={(value) => { setPassword(value.target.value) }} /> : <Text>{password}</Text>}</Row>
                    {/* <Text><b>Data rejestracji:</b> 24.06.2023</Text> */}
                    {editAction ? <Button css={{ marginTop: "15px" }} auto onPress={
                        async () => { 
                            let result: any = await serverOp.serverPatchBearer("/api/profile", Cookies.get('token'), {name: name, lastName: surname, login: login, email: email, password: password})
                            switch(result.status){
                                case 200:
                                    setEditAction(false); 
                                    break;
                            }
                        }} color="success">Zatwierdź</Button> : <Button css={{ marginTop: "15px" }} auto onPress={() => { setEditAction(true) }}>Edytuj dane</Button>}

                </Collapse>
                <Collapse title="Wygląd">
                    <Text h5>Obecny motyw:</Text>
                    <Grid.Container gap={1} wrap="wrap" css={{ width: "400px" }}>
                        <Grid>
                            <Badge
                                color="success"
                                shape="rectangle"
                                content={<FiCheck size={14} />}
                                css={{ p: 0 }}
                                horizontalOffset="11%"
                                verticalOffset="11%"
                                placement="bottom-right"
                            >
                                <Button auto css={{ backgroundColor: '$blue600', margin: '5px' }}></Button>
                            </Badge>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$blue700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$blue800', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$purple600', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$purple700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$purple800', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$green600', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$green700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$green800', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$yellow600', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$yellow700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$yellow800', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$red600', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$red700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$red800', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$cyan600', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$cyan700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$cyan800', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$pink600', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$pink700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$pink800', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$gray600', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$gray700', margin: '5px' }}></Button>
                        </Grid>
                        <Grid>
                            <Button auto css={{ backgroundColor: '$gray800', margin: '5px' }}></Button>
                        </Grid>
                    </Grid.Container>
                </Collapse>
                <Collapse title="Dziennik aktywnośći">
                    <Text>
                        W tym miejscu znajduje się dziennik aktywności. Kazda aktywność na twoim profilu jest rejestrowana i trafia tutaj.
                    </Text>
                </Collapse>
            </Collapse.Group>
        </Container>
    )
}

export default Settings