/* 
 * Simple HTML 5 Canvas Animation
 */

function animate() {
    var canvas = document.getElementById('canvas');
    if (canvas !== null && canvas.getContext) {
        var ctx = canvas.getContext('2d');
    } else {
        alert("Problem creating canvas 2D drawing context.");
    }
    function draw(timestamp){
        var step = timestamp/10 || animStep;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.save();
        ctx.translate(step % canvas.width, canvas.height/2);
        ctx.rotate(step * Math.PI/50);
        ctx.translate(-100, -100);
        ctx.drawImage(img, 0, 0, 200, 200);
        ctx.restore();
        if(window.requestAnimationFrame) {
          window.requestAnimationFrame(draw);
        } else {
            animStep += 3;
            setTimeout(draw, 40);
        }
    }
    var animStep = 0;
    var img = new Image();
    img.src = "images/shuriken.svg";
    img.onload = function(){
        if(window.requestAnimationFrame) {
            window.requestAnimationFrame(draw);
        }
    };
}
