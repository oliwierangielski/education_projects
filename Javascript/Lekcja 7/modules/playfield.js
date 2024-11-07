function drawOval(ctx, radius, width, startX, startY, fillStyle){
    let path = new Path2D()
    ctx.lineWidth = 5
    path.moveTo(startX,startY)
    path.lineTo(width,startY)
    path.arc(width, startY+radius, radius, 1.5*Math.PI, 0.5 *Math.PI)
    path.lineTo(startX,startY+2*radius)
    path.arc(startX, startY+radius, radius, 0.5 * Math.PI, 1.5 * Math.PI)
    path.closePath()
    ctx.strokeStyle = "black"
    ctx.stroke(path)
    ctx.fillStyle = fillStyle
    ctx.fill(path)
    return path
}


export const playfield =  {
    lineWidth: 3,
    grassImg: new Image(),
    roadImg: new Image(),

    drawPlayfieldElements: function(){
        this.ctx.fillStyle = this.grassPattern
            this.ctx.fillRect(0,0, this.canvasInfo.width, this.canvasInfo.height)
            this.ctx.fill
            this.roadPath = drawOval(this.ctx, this.radius-this.lineWidth, this.canvasInfo.width-this.radius, this.radius, 3, this.roadPattern)
            this.grassPath = drawOval(this.ctx, (this.radius-this.lineWidth)/2, this.canvasInfo.width-this.radius, this.radius, this.radius/2+this.lineWidth/2, this.grassPattern)
    },
    init: function(){
        // Seting up the playfield
        let canvas = document.getElementById("game")
        let ctx = canvas.getContext("2d")
        ctx.canvas.width  = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        this.canvasInfo = canvas.getBoundingClientRect()
        this.radius = this.canvasInfo.height/2
        this.ctx = ctx

        // Pattern 
        this.roadImg.src = 'images/road.jpg'
        this.grassImg.src = 'images/grass.jpg'
        this.grassImg.onload = ()=>{
            this.grassPattern = this.ctx.createPattern(this.grassImg, "repeat")
            this.roadPattern = this.ctx.createPattern(this.roadImg, "repeat")
            this.drawPlayfieldElements()
        }

        
    },
    drawPlayfield: function () {
        // Clear the rectangle
        this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height) 
        // Draw Playfield elements
        this.drawPlayfieldElements()
    },
    isPlayerOutsideTrail: function (x, y) {
        return !this.ctx.isPointInPath(this.roadPath, x, y) | this.ctx.isPointInPath(this.grassPath, x, y)
    }

    
}