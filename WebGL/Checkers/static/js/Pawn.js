class Pawn extends THREE.Mesh {
    name = "Pawn"
    isQueen = false
    constructor(materialColor){
        const geometry = new THREE.CylinderGeometry(40, 40, 25, 100)
        const material = [
            new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('/mats/white.jpg'), transparent: false}),
            new THREE.MeshBasicMaterial({color: "red", map: new THREE.TextureLoader().load('/mats/white.jpg'), transparent: false})
        ]
        super( geometry, material[materialColor-1])
        this.sideId = materialColor
    }
    setQueen(){
        this.isQueen = true
        this.scale.y *= 2
    }
}