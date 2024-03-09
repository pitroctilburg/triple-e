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

    if(scores[0] > 0) {

        // update waardes
        let scaleFactor = height/14;
        let vectors = [
            createVector(0, -scores[1]),
            createVector(0, -scores[2]),
            createVector(0, -scores[3]),
        ];
        
        // visualiseer
        translate(width/2, height/1.7);
        stroke(255);
        noFill();
        strokeWeight(3);
        point(0,0)
        
        vectors.forEach((vector, index) => {
            vector.rotate(index * TWO_PI/3);
            vector.mult(scaleFactor);
            point(vector);
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
    }
}

window.onresize = function() {
    resizeCanvas();  // ????
}