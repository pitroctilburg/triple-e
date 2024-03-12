let cw, ch;

let scores = [0, 0, 0, 0];
let ctx;

function setup() {
    let canvasElement = document.querySelector("canvas");
    cw = canvasElement.clientWidth;
    ch = canvasElement.clientHeight;
    createCanvas(cw, ch, canvasElement);
    ctx = this.drawingContext;
}

function draw() {
    clear();
    translate(width/2, height/1.5);

    // assenstelsel
    strokeWeight(1);
    stroke(255, 80);
    ctx.setLineDash([5, 5]);
    axis = createVector(0, -200);
    line(0, 0, axis.x, axis.y);
    axis.rotate(-TWO_PI/3);
    line(0, 0, axis.x, axis.y);
    axis.rotate(-TWO_PI/3);
    line(0, 0, axis.x, axis.y);       
    ctx.setLineDash([]);    // reset stippellijn
    
    if(scores[0] > 0) {

        // update waardes
        let scaleFactor = height/14;
        let vectors = [
            createVector(0, -scores[1]),
            createVector(0, -scores[2]),
            createVector(0, -scores[3]),
        ];
        
        // visualiseer
 
        stroke(255);
        noFill();
        strokeWeight(3);
        
        vectors.forEach((vector, index) => {
            vector.rotate(index * -TWO_PI/3);
            vector.mult(scaleFactor);
        });

        // 'conic' gradient voor de lijnkleur
        let grad = ctx.createConicGradient(-HALF_PI, 0, 0);
        grad.addColorStop(0, 'yellow');
        grad.addColorStop(0.3333, 'lightgreen');
        grad.addColorStop(0.6666, 'orange');
        grad.addColorStop(1, 'yellow');
        
        ctx.strokeStyle = grad;
        
        // curve
        strokeWeight(10);
        curveTightness(-0.5);
        beginShape();
        curveVertex(vectors[2]['x'], vectors[2]['y']);
        curveVertex(vectors[0]['x'], vectors[0]['y']);
        curveVertex(vectors[1]['x'], vectors[1]['y']);
        curveVertex(vectors[2]['x'], vectors[2]['y']);
        curveVertex(vectors[0]['x'], vectors[0]['y']);
        curveVertex(vectors[1]['x'], vectors[1]['y']);
        endShape();

        // vectors.forEach((vector, index) => {
        //     ellipseMode(CENTER);
        //     stroke('black');
        //     strokeWeight(1)
        //     fill('white');
        //     circle(vector.x, vector.y, 8);
        // });

        // labels
        fill(255);
        noStroke();
        textFont("Arial")
        textSize(15);
        textStyle(BOLD);
        textAlign(RIGHT);
        text("Engage", vectors[0].x - 20, vectors[0].y - 15);
        text("Enhance", vectors[1].x - 25, vectors[1].y);
        textAlign(LEFT);
        text("Extend", vectors[2].x + 25, vectors[2].y);
    }
}

function windowResized() {
    resizeCanvas(canvasElement.clientWidth, canvasElement.clientHeight);
  }