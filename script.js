function simulate() {
    const v = parseFloat(document.getElementById("velocity").value);
    const angle = parseFloat(document.getElementById("angle").value) * Math.PI / 180;

    const g = 9.8;
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let t = 0;
    const scale = 5;

    function draw() {
        const x = v * Math.cos(angle) * t;
        const y = v * Math.sin(angle) * t - 0.5 * g * t * t;

        if (y < 0) return;

        ctx.fillRect(x * scale, canvas.height - y * scale, 5, 5);
        t += 0.05;

        requestAnimationFrame(draw);
    }

    draw();
}