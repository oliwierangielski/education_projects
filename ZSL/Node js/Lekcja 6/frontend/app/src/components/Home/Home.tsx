import React, { useEffect, useRef, useState } from 'react';
import Post from '../Post/Post';
import './Home.css';
import { Grid, Card, Text, Container, Button, Input, Row, Dropdown, Spacer, Modal, Image, Col, Switch } from "@nextui-org/react";
import { FiImage, FiSend } from 'react-icons/fi';
import serverOp from '../../serverOperations';
import Cookies from 'js-cookie';

function Home() {
  // referencje
  const fileInputRef = useRef<HTMLInputElement>(null)
  const rotateFormRef = useRef<HTMLDivElement>(null)
  const resizeFormRef = useRef<HTMLDivElement>(null)
  const cropFormRef = useRef<HTMLDivElement>(null)
  const tintFormRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [filters, setFilters] = useState<any>({})
  const [selectedHash, setSelectedHash] = useState([]); //hasztagi
  const changeFilters = (value: any, name: string, ref: any = null) =>{
    let newFilters = filters
    if(ref)
      ref.current.style.display = (value.target.checked) ? "block" : "none"
      
    if(value.target.checked){
      switch(name){
        case "rotate":
          newFilters[name] = 0
          break
        case "resize":
          newFilters[name] = {width: 0, height: 0}
          break
        case "crop":
          newFilters[name] = {width: 0, height: 0, left: 0, top: 0}
          break;
        case "tint":
          newFilters[name] = {r: 0, g: 0, b: 0}
          break;
        default:
          newFilters[name] = true
          break
      }
    } else {
      delete newFilters[name]
    }
    setFilters(newFilters)
  }
  const onModalClose = () => {
    if (fileInputRef.current)
                  fileInputRef.current.value = '';
                setVisible(false)
                setFile(null) 
                setFilters({})
  }

  const selectedValue = React.useMemo(
    () => {
      if(selectedHash!= null){
        let array = Array.from(selectedHash)
        if(array.length  <= 2){
          return "Wybrano: " + array.join(", ")
        }
        return "Wybrano: " + array[0] + ", " + array[1] + " + " + (array.length-2)
      } 
      return "# Dodaj hasztagi"
      
    },
    [selectedHash]
  );

  const [tags, setTags] = useState<any>([])
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await serverOp.serverGet("/api/tags/raw");
            setTags(response)
        } catch (error) {
            // Obsługa błędu pobierania danych
            // console.error(error);
        }
      
    };

    fetchData();
}, []);


const [userInfo, setUserInfo] = useState<any>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      if(Cookies.get('token') != undefined){
        try {
            const response = await serverOp.serverGetBearer("/api/profile", Cookies.get('token'));
            setUserInfo(response)
        } catch (error) {
            // Obsługa błędu pobierania danych
            // console.error(error);
        }
      }
    };

    fetchData();
}, [file]);


const [posts, setPosts] = useState<any>([])
  
useEffect(() => {
  const fetchData = async () => {
    if(Cookies.get('token') != undefined){
      try {
          const response = await serverOp.serverGet("/api/photos");
          setPosts(response)
      } catch (error) {
          // Obsługa błędu pobierania danych
          // console.error(error);
      }
    }
  };

  fetchData();
}, [file]);


  
  return (
    <Container className='container' css={{ display: "flex", alignItems: "center" }}>
      <Spacer></Spacer>
      {Cookies.get('token') ?
      <Container sm>
        <Card css={{ height: "100px" }}>
          <Text css={{ padding: "5px" }}>Opublikuj jakieś zdjęcie:</Text>
          <Grid.Container gap={1}>
            <Grid>
              <input type='file' ref={fileInputRef} style={{ display: "none" }} onChange={
                (event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    setFile(file)
                    setVisible(true)
                  }
                }
              } />
              <Button color="primary" onPress={() => { fileInputRef.current?.click() }}>
                {file==null ? <><FiImage size={18} />&nbsp;Dodaj Obraz</> : "Wybrano: " + file.name}
              </Button>
              <Modal open={visible} preventClose>
                <Modal.Header><Text h4>Edycja zdjęcia</Text></Modal.Header>
                <Modal.Body>
                  Dodaj filtry
                  {file!= null ?
                  <Image src={URL.createObjectURL(file!)} />
                  : ""}

                  <Col>
                    <Row css={{justifyContent: "space-between"}}><div style={{display: "flex"}}><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "rotate", rotateFormRef)} />&emsp;Rotate</div><div ref={rotateFormRef} style={{display: "none"}}><Input type='number' placeholder='rot' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.rotate = parseFloat(val.target.value); setFilters(newFilters)}} /></div></Row>
                    <Row css={{justifyContent: "space-between"}}><div style={{display: "flex"}}><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "resize", resizeFormRef)} />&emsp;Resize</div><div ref={resizeFormRef} style={{display: "none"}}><Input type='number' placeholder='w' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.resize.width = parseFloat(val.target.value); setFilters(newFilters)}} /><Input type='number' placeholder='h' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.resize.height = parseFloat(val.target.value); setFilters(newFilters)}} /></div></Row>
                    {/* <Row>Format<Spacer/><Switch checked={false} size="xs" /></Row> */}
                    <Row css={{justifyContent: "space-between"}}><div style={{display: "flex"}}><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "crop", cropFormRef)} />&emsp;Crop</div><div ref={cropFormRef} style={{display: "none"}}><Input type='number' placeholder='w' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.crop.width = parseFloat(val.target.value); setFilters(newFilters)}} /><Input type='number' placeholder='h' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.crop.height = parseFloat(val.target.value); setFilters(newFilters)}} /><Input type='number' placeholder='l' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.crop.left = parseFloat(val.target.value); setFilters(newFilters)}}/><Input type='number' placeholder='t' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.crop.top = parseFloat(val.target.value); setFilters(newFilters)}}/></div></Row>
                    <Row><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "grayscale")}/>&emsp;Grayscale</Row>
                    <Row><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "flip")}/>&emsp;Flip</Row>
                    <Row><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "flop")}/>&emsp;Flop</Row>
                    <Row><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "negate")}/>&emsp;Negate</Row>
                    <Row css={{justifyContent: "space-between"}}><div style={{display: "flex"}}><Switch checked={false} size="xs" onChange={(value: boolean) => changeFilters(value, "tint", tintFormRef)} />&emsp;Tint</div><div ref={tintFormRef} style={{display: "none"}}><Input type='number' placeholder='r' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.tint.r = parseFloat(val.target.value); setFilters(newFilters)}} /><Input type='number' placeholder='g' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.tint.g = parseFloat(val.target.value); setFilters(newFilters)}}/><Input type='number' placeholder='b' width='60px' size='xs' css={{marginLeft: "5px"}} onChange={(val) => {let newFilters = filters; newFilters.tint.b = parseFloat(val.target.value); setFilters(newFilters)}}/></div></Row>
                  </Col>
                </Modal.Body>
                <Modal.Footer>
                  <Button color="error" auto flat onPress={onModalClose}>Anuluj</Button>
                  <Button color="success" auto flat onPress={() => { setVisible(false) }}>Zatwierdź</Button>
                </Modal.Footer>
              </Modal>
            </Grid>
            <Grid>
              <Dropdown>
                <Dropdown.Button color="primary">
                  {/*  */}
                  {selectedValue}
                </Dropdown.Button>
                <Dropdown.Menu aria-label="Multiple selection actions" selectionMode="multiple" selectedKeys={selectedHash} onSelectionChange={setSelectedHash}>
                  {tags.map((e: string) => {
                    return <Dropdown.Item key={e}>{e}</Dropdown.Item>
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Grid>
            <Grid>
              <Button auto color="success" onPress={
                async () => {
                    let result = await serverOp.serverPostFile("/api/photos", file!, userInfo?.login)
                    // let hashtags = selectedHash.map((e: any) => { return {name: e, popularity: 10 }})
                    // let hashtags: Array<any> = selectedHash
                    // hashtags.map((e: any, i: number) => {
                    //    return {name: e, popularity: i}
                    // })
                    // console.log("hasztagi: ",hashtags)
                    let photoId = result.id
                    let hashtags = selectedHash
                    result = await serverOp.serverPatch("/api/photos/tags/" + photoId, [...selectedHash])
                    result = await serverOp.serverPatch("/api/filters/" + photoId, filters)
                }
              }>
                <FiSend size={20} />&nbsp;Wyślij
              </Button>
            </Grid>
          </Grid.Container>
        </Card>
      </Container>
      : ""}
      {posts.map(((e: any, i: number) => {
        return <Post id={e.id} url={e.url} tags={e.tags} album={e.album} key={i} />
      }))}
    </Container>
  );
}

export default Home;
