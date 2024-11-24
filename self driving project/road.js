class Road{
   constructor(x,width,laneCount=3){
       this.x=x;
       this.width=width;
       this.laneCount=laneCount;

       this.left=x-width/2;
       this.right=x+width/2;

       const infinity=1000000;
       this.top=-infinity;
       this.bottom=infinity;

       const topLeft={x:this.left,y:this.top};
       const topRight={x:this.right,y:this.top};
       const bottomLeft={x:this.left,y:this.bottom};
       const bottomRight={x:this.right,y:this.bottom};
       this.borders=[
           [topLeft,bottomLeft],
           [topRight,bottomRight]
       ];
   }

   getLaneCenter(laneIndex){
       const laneWidth=this.width/this.laneCount;
       return this.left+laneWidth/2+
           Math.min(laneIndex,this.laneCount-1)*laneWidth;
   }

 
   draw(ctx) {
    
    const gradient = ctx.createLinearGradient(this.left, 0, this.right, 0);
    gradient.addColorStop(0, "#2c3e50"); 
    gradient.addColorStop(0.5, "#34495e"); 
    gradient.addColorStop(1, "#2c3e50");
    ctx.fillStyle = gradient;
    ctx.fillRect(this.left, this.top, this.width, this.bottom - this.top);


    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.setLineDash([20, 20]); 

    for (let i = 1; i <= this.laneCount - 1; i++) {
        const x = lerp(this.left, this.right, i / this.laneCount);
        ctx.beginPath();
        ctx.moveTo(x, this.top);
        ctx.lineTo(x, this.bottom);
        ctx.stroke();
    }
    ctx.setLineDash([]); 

    ctx.lineWidth = 5;
    ctx.strokeStyle = "#e74c3c"; 
    ctx.beginPath();
    ctx.moveTo(this.left, this.top);
    ctx.lineTo(this.left, this.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.right, this.top);
    ctx.lineTo(this.right, this.bottom);
    ctx.stroke();
}

}
 
