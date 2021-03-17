"use strict";
(function () {
    const canvas = document.querySelector('canvas');
    const generateButton = document.querySelector('.generate-tree-button');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    let startX = canvas.width / 2, startY = canvas.height - 80;
    let curve = 10;
    let curve2 = 10;
    let blur = true;
    let len = canvas.height / 6, angle = 0,
        branchWidth = 15, color1 = 'brown', color2 = 'orangered';

    function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = color1;
        ctx.fillStyle = color2;
        ctx.shadowBlur = blur ? 5 : 0;
        ctx.shadowColor = 'rgba(0,0,0,.5)';
        ctx.lineWidth = branchWidth;
        ctx.translate(startX, startY);
        ctx.rotate(angle * Math.PI / 180);
        ctx.moveTo(0, 0);
        if (angle > 0) {
            ctx.bezierCurveTo(curve2, -len / 2, curve2, -len / 2, 0, -len)
        } else {
            ctx.bezierCurveTo(curve2, -len / 2, -curve2, -len / 2, 0, -len)
        }
        ctx.stroke();

        if (len < 10) {
            ctx.beginPath();
            ctx.arc(0, -len, 10, 0, Math.PI / 2);
            ctx.fill();
            ctx.restore();
            return
        }

        curve = Math.random() * 10 + 10;
        drawTree(0, -len, len * 0.75, angle + curve, branchWidth * .6);
        curve = Math.random() * 10 + 10;
        drawTree(0, -len, len * 0.75, angle - curve, branchWidth * .6);

        ctx.restore();
    }

    drawTree(canvas.width / 2, canvas.height - 80,
        canvas.height / 6, 0, 15, 'brown', 'orangered');

    function generateRandomTree() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        len = Math.floor(-(Math.random() * 20) + canvas.height / 6);
        branchWidth = Math.random() * 70 + 1;
        color1 = `rgb(${Math.random() * 255}, ${Math.random() * 255},${Math.random() * 255})`;
        color2 = `rgb(${Math.random() * 255}, ${Math.random() * 255},${Math.random() * 255})`;
        curve = Math.random() * 15 + 8;
        curve2 = Math.random() * 50 + 8;

        generateButton.style.background = color1;

        drawTree(startX, startY, len, angle, branchWidth, color1, color2);
    }

    window.addEventListener("resize",()=> {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        startX = canvas.width / 2;
        startY = canvas.height - 80;
        drawTree(startX, startY, len, angle, branchWidth, color1, color2);
    });

    generateButton.addEventListener('click', generateRandomTree);
})();