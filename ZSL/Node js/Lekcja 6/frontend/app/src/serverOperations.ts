const serverGet = async (url: string) => {
    try {
        let result = await fetch("http://localhost:4000" +url, { method: "GET" })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes
    } catch (e) {
        console.log(e)
    }
}

const serverDelete = async (url: string) => {
    try {
        let result = await fetch("http://localhost:4000" + url, { method: "DELETE" })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes
    } catch (e) {
        console.log(e)
    }
}

const serverPost = async (url: string, data: object) => {
    const body = JSON.stringify(data)

    try {
        const headers = { 'Content-Type': 'application/json' }
        let result = await fetch("http://localhost:4000" + url, { method: "POST", headers: headers, body: body })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes
    } catch (e) {
        console.log(e)
    }
}

const serverPatch = async (url: string, data: object) => {

    try {
        const body = JSON.stringify(data)
        const headers = { 'Content-Type': 'application/json' }
        let result = await fetch("http://localhost:4000" + url, { method: "PATCH", headers: headers, body: body })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes
    } catch (e) {
        console.log(e)
    }
}

const serverPatchClear = async (url: string, data: object) => {

    try {
        const body = JSON.stringify(data)
        const headers = { 'Content-Type': 'application/json' }
        let result = await fetch("http://localhost:4000" + url, { method: "PATCH", headers: headers, body: body })
        let jsonRes = await result
        console.log(jsonRes)
        return jsonRes
    } catch (e) {
        console.log(e)
    }
}

const serverPostFile = async (url: string, file: File, album: string) => {

    const fd = new FormData()
    fd.append("file", file)
    fd.append("album", album)

    try {
        let result = await fetch("http://localhost:4000" + url, { method: "POST", body: fd })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes
    } catch (ex) {
        console.log(ex);
    }
}

const serverPostBearerFile = async (url: string, token: string, file: any, album: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("album", album);
  
      const headers = { Authorization: "Bearer " + token };
      const options = {
        method: "POST",
        headers,
        body: formData,
      };
  
      const response = await fetch("http://localhost:4000" + url, options);
      const jsonRes = await response.json();
      console.log(jsonRes);
      return jsonRes;
    } catch (ex) {
      console.log(ex);
    }
  };

const serverGetBearer = async (url: string, token: string) => {

    try {

        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        let result = await fetch("http://localhost:4000" + url, { method: "GET", headers: headers })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes

    } catch (ex) {
        console.log(ex);
    }
}

const serverPostBearer = async (url: string, token: string) => {

    try {

        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token, }
        let result = await fetch("http://localhost:4000" + url, { method: "POST", headers: headers })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes

    } catch (ex) {
        console.log(ex);
    }
}

const serverPatchBearer = async (url: string, token: string, data: object) => {

    try {
        const body = JSON.stringify(data)
        const headers = { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
        let result = await fetch("http://localhost:4000" + url, { method: "PATCH", headers: headers, body: body })
        let jsonRes = await result.json()
        console.log(jsonRes)
        return jsonRes

    } catch (ex) {
        console.log(ex);
    }
}

export default {serverGet, serverDelete, serverPost, serverPatch, serverPostFile, serverGetBearer, serverPostBearer, serverPatchBearer, serverPostBearerFile, serverPatchClear}