var w = window.innerHeight
var h = window.innerWidth 
let t = 0
var points = []
var s = 1
var xoff = 0
var yoff = 0
var startX = 0
var startY = 0
var frame = 0
var fr = 0

var pmatrix = true
var mmatrix = $("#mmatrix").is(":checked")

function setup() {
    w = 690
    h = 450

    createCanvas(w, h);
    noStroke()
    background(0);
    fr = frameRate()
    
}

class Point {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;

      this.rx = x
      this.ry = y
      this.rz = z

    }
    render() {
        this.dist = getDist(this.x, this.y, 0, 0)

        fill(0 + this.ry,this.rx + 50,this.rz + 50)

        // Rotation Matrix
        var x = document.getElementById("motionmatrix");
        if (mmatrix == true) {
            x.style.display = "inline";
            try{
            this.rx = (this.x * eval($("#mx1").val())) + 
            (this.y * eval($("#my1").val())) + 
            (this.z * eval($("#mz1").val()))

    
            this.ry = (this.x * eval($("#mx2").val())) + 
            (this.y * eval($("#my2").val())) + 
            (this.z * eval($("#mz2").val()))
    
            this.rz = (this.x * eval($("#mx3").val())) + 
            (this.y * eval($("#my3").val())) + 
            (this.z * eval($("#mz3").val()))
            } catch {
                0;
            }
        } else {
            x.style.display = "none";
            this.rx = (cos(t) * this.x) - (sin(t) * this.y)
            this.ry = (sin(t) * this.x) + (cos(t) * this.y)
        }

        fill(0 + this.ry,this.rx + 50,this.rz + 50)
        
        // Rotation Matrix

        ellipse(
            // Projection Matrix
            (this.rx * eval($("#px1").val())) + 
            (this.ry * eval($("#py1").val())) + 
            (this.rz * eval($("#pz1").val())),

            (this.rx * eval($("#px2").val())) + 
            (this.ry * eval($("#py2").val())) + 
            (this.rz * eval($("#pz2").val()))
            // End Projection Matrix
            
        ,(Math.max(-1 * this.ry, 1) / 30) + 5,
         (Math.max(-1 * this.ry, 1) / 30) + 5)
    }
}

function solveMatrix(prefix, xrange, yrange) {

}

function getDist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1-x2, 2) + Math.pow(y1-y2, 2))
}

$(function () {
    $.get('/points.txt', function (data) {
        data = data.split("\n")
        
        for(let k = 0; k < data.length; k++) {
            data[k] = data[k].replace(/  +/g, " ")
            data[k] = data[k].split(" ")
            data[k].splice(0, 1);

        }
        

        for (let i=0;i<data.length;i++){
            p = new Point(data[i][0] * 85, data[i][1] * 85, (data[i][2] * 85))
            points.push(p)
        }
    });
});



function draw() {
    frame ++
    background(0);
    if (frame % 50 == 0 || frame == 2) {
        fr = Math.floor(frameRate())
        
    }
    if (frame % 10 == 0 || frame == 2) {
        mmatrix = $("#mmatrix").is(":checked")
    }
    
    fill(255)
    textSize(16)
    text("FPS: " + fr, 10, 20);

    translate(w/2 + xoff, h - 82 + yoff);
    scale(Math.max(s, 0), Math.min(0, -s))

    
    for(let i = 0; i < points.length; i++) {
        points[i].render()
    }
    t += 0.015
}

function mouseWheel(event) {
    s -= event.delta / 1140
}

function mousePressed() {
    startX = mouseX;
    startY = mouseY;
}

function mouseDragged() {
    
   xoff -= startX - mouseX;
   yoff -= startY - mouseY;
    startX = mouseX;
    startY = mouseY;
}

function windowResized() {
    background(0);
    w = 690
    h = 450
    resizeCanvas(w, h);
}