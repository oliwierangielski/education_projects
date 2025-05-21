import { Card, Col, Container, Grid, Image, Text } from "@nextui-org/react"
import avatar from './../../assets/avatar.jpeg'
import Post from "../Post/Post"
import { useEffect, useRef, useState } from "react"
import serverOp from "../../serverOperations"
import Cookies from 'js-cookie';
function Profile ({userInfo, setUserInfo}: any){

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null)


    const [userPosts, setUsersPosts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log(Cookies.get("title"))
                if(!userInfo)
                window.location.href="/"
                const response = await serverOp.serverGet("/api/photos");
                setUsersPosts(response)
            } catch (error) {
                // Obsługa błędu pobierania danych
                console.error(error);
            }
          
        };
    
        fetchData();
    }, []);


    
    return (
        <Container lg css={{backgroundColor: "$blue50", padding: "10px"}}>
            <Grid.Container css={{padding: "10px"}}>
                <Grid lg={2}>
                <input type="file" style={{display: "none"}} ref={fileInputRef} onChange={
                    async (event) => {
                        const file = event.target.files?.[0];
                        if(file){
                            setFile(file)
                            let userInfo = await serverOp.serverGetBearer("/api/profile", Cookies.get('token'))
                            await serverOp.serverPostBearerFile("/api/profile", Cookies.get('token'), file, userInfo.login)
                        }
                    }
                }/>
                <Image
                width={150}
                height={150}  
                src={(userInfo?.login) ? "http://localhost:4000/api/photos/photofromurl/" + userInfo.login : ""}
                alt="Avatar"
                css={{borderRadius: "50%"}}
                onClick={() => { fileInputRef.current?.click() }}
                />
                </Grid>
                <Grid lg={10} css={{display: "flex", alignItems: "center"}}>
                    <Col>
                        <Text h1 css={{textGradient: "45deg, $blue600 30%, $blue800 70%", padding: "0px"}}>{userInfo?.name + " " + userInfo?.lastName}</Text>
                        <Text h3 color="primary">{userInfo?.login}</Text>
                    </Col>
                </Grid>
                <Grid lg={12} css={{marginTop: "20px", display: "flex", justifyContent: "center"}}>
                    {/* <Card css={{width: "200px", padding: "20px"}}>
                    <Col>
                        <Text h5>Imię: John</Text>
                        <Text h5>Nazwisko: Doe</Text>
                    </Col>
                    </Card> */}
                    {
                        userPosts.filter((element: any) => {return element.album === userInfo?.login }).map((e: any, i: number) => {
                            return <Post id={e.id} url={e.url} tags={e.tags} album={e.album} key={i} />
                        })
                    }
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default Profile