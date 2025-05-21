import { Avatar, Card, Col, Container, Row, Text, Tooltip } from '@nextui-org/react'
import test from '../../assets/test.jpeg'
import avatar from '../../assets/avatar.jpeg'
import './Post.css'
import UserShort from '../UserShort/UserShort'

function Post(props: any){
    return (
        <Container sm  css={{ margin: "25px"}}>
        <Card>
        <Card.Header>
            <Row css={{alignItems: "center"}}>
            <Tooltip placement='top' content={<UserShort avatarUrl={avatar}/>}>
            <Avatar
                // squared
                zoomed
                src={"http://localhost:4000/api/photos/photofromurl/" + props.album}
                size="xl"
                css={{margin: "10px"}}/>
            </Tooltip>
            <Col>
            <Row><Text weight="bold" size="$xl">{props.album}</Text></Row>
            <Row><Text color='gray' size="md">Krakowskie Przedmieście, Warszawa</Text></Row>
            </Col>
            </Row>
        </Card.Header>
            <Card.Body>
                <Card css={{width: "100%", height: "600px"}}>
                    <Card.Body css={{p: 0}}>
                        <Card.Image
                            src={"http://localhost:4000/api/getfile/" + props.id}
                            width="100%"
                            height="100%"
                            objectFit="cover"
                            alt="test"
                        >

                        </Card.Image>
                    </Card.Body>
                    <Card.Footer
                        isBlurred
                        css={{
                            position: "absolute",
                            height: "80px",
                            bgBlur: "#ffffff66",
                            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                            bottom: 0,
                            zIndex: 1,
                            fontWeight: "bold",
                            textAlign: "left",
                            padding: "20px"
                        }}
                    >
                        {JSON.stringify(props.tags)}
                    </Card.Footer>
                </Card>
            </Card.Body>
            </Card>
        </Container>
    )
}

export default Post