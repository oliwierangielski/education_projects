class Grid {
    constructor(){
        const gridSize = 4000
        const geometry = new THREE.PlaneGeometry(gridSize, gridSize)
        const material = new THREE.MeshBasicMaterial({color: 0x000000})
        this.plane = new THREE.Mesh( geometry, material)
        this.plane.position.set(0,0,0)
        this.plane.rotation.x = Math.PI / 2
        this.gridHelper = new THREE.GridHelper(gridSize,10)
        this.gridHelper.position.set(0, 0, 0)
    }

    getMesh(){
        return this.plane
    }

    getGridHelper(){
        return this.gridHelper
    }
    
}