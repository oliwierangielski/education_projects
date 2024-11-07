class Field extends THREE.Mesh {
    name = "Field"
    static material = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/light.jpg'), transparent: false}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/dark.jpg'), transparent: false}),
    ]
    static dotMaterial = [
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/dark.jpg'), transparent: false}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/dark.jpg'), transparent: false}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/darkDotted.png'), transparent: false}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/dark.jpg'), transparent: false}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/dark.jpg'), transparent: false}),
        new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/dark.jpg'), transparent: false})
    ]
    static geometry = new THREE.BoxGeometry(100, 30, 100)
    constructor(materialColor, fieldPos){
        super( Field.geometry, Field.material[materialColor])
        this.tablePos = {
            row: parseInt(fieldPos.x),
            column: parseInt(fieldPos.y)
        }
        this.position.set(this.tablePos.row*100,0,this.tablePos.column*100)
    }
    setPawn(pawn){
        if(pawn.field != undefined)
            pawn.field.pawn = undefined
        this.pawn = pawn
        this.pawn.field = this
        this.pawn.tablePos = this.tablePos
        this.pawn.position.y = this.position.y + Field.geometry.parameters.height
        let height = this.pawn.position.y
        let captureField = (this.captureField == undefined) ? undefined : this.captureField
        let capturing = (this.capturing == undefined || captureField == undefined) ? () => {} : this.capturing
        // Animacja
        new TWEEN.Tween(this.pawn.position) // co
        .to({ x: this.position.x, z: this.position.z }) // do jakiej pozycji, w jakim czasie
        .duration(340)
        .easing(TWEEN.Easing.Sinusoidal.InOut) 
        .onUpdate((_, delta) => { 
            this.pawn.position.y = height +  Math.sin(delta*Math.PI)*75
         })
        .onComplete(() => {
            capturing(captureField)
        })
        .start()
    }
    setDotMaterial(){
        this.material = Field.dotMaterial
        this.isProposed = true
    }
}