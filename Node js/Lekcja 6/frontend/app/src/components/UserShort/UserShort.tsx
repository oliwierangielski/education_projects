import { Avatar, Button, Col, Grid, Row, Spacer, Text } from '@nextui-org/react';
import './UserShort.css'
import avatar from '../../assets/avatar.jpeg'
import { useState } from 'react';

function UserShort(avatarUrl: any){
        const [following, setFollowing] = useState(false);
        console.log(avatarUrl)
        return (
          <Grid.Container
            className="user-twitter-card__container"
            css={{
              mw: "260px",
              borderRadius: "$lg",
              padding: "$sm",
            }}
          >
            <Row justify="space-between" align="center">
              <Col span={3}>
                <Avatar
                  size="lg"
                  src={avatar}
                  color="gradient"
                  squared
                />
              </Col>
              <Col span={9}>
                <Row>
                  <Grid xs={12} direction="column">
                    <Text className="user-twitter-card__text" b size={15}>
                      Zoey Lang
                    </Text>
                    <Text
                      className="user-twitter-card__text"
                      size={14}
                      css={{ mt: "-$3" }}
                      color="#888888"
                    >
                      @zoeylang
                    </Text>
                  </Grid>
                  <Button
                    auto
                    rounded
                    onPress={() => setFollowing(!following)}
                    css={{
                      maxHeight: "$space$12",
                      fs: "$xs",
                      fontWeight: "$semibold",
                      borderColor: following ? "$foreground" : "$primary",
                      color: following ? "$foreground" : "$white",
                    }}
                    color="primary"
                    bordered={following}
                  >
                    {following ? "Unfollow" : "Follow"}
                  </Button>
                </Row>
              </Col>
            </Row>
            <Grid.Container className="user-twitter-card__username-container">
              <Grid xs={12}>
                <Text
                  className="user-twitter-card__text"
                  size={14}
                  css={{ mt: "$1" }}
                  color="#888888"
                >
                  Full-stack developer, @getnextui lover she/her 🎉
                </Text>
              </Grid>
            </Grid.Container>
      
            <Grid.Container
              className="user-twitter-card__metrics-container"
              justify="flex-start"
              alignContent="center"
            >
              <Text className="user-twitter-card__text" size={14} color="#888888">
                <Text
                  b
                  color="foreground"
                  className="user-twitter-card__text"
                  size={14}
                  css={{ mr: "$1" }}
                >
                  4
                </Text>
                Following
              </Text>
              <Spacer inline x={0.5} />
              <Text className="user-twitter-card__text" size={14} color="#888888">
                <Text
                  b
                  color="foreground"
                  className="user-twitter-card__text"
                  size={14}
                  css={{ mr: "$1" }}
                >
                  97.1K
                </Text>
                Followers
              </Text>
            </Grid.Container>
          </Grid.Container>
        );
}

export default UserShort