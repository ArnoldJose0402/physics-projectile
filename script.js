window.onload = function () {

    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.simulate = function () {

        const v = parseFloat(document.getElementById("velocity").value);
        const angleDeg = parseFloat(document.getElementById("angle").value);
        const angle = angleDeg * Math.PI / 180;
        const g = 9.8;

        const totalTime = (2 * v * Math.sin(angle)) / g;
        const maxHeight = (v * v * Math.sin(angle) ** 2) / (2 * g);
        const range = (v * v * Math.sin(2 * angle)) / g;

        document.getElementById("range").innerText = "Range: " + range.toFixed(2) + " m";
        document.getElementById("height").innerText = "Max Height: " + maxHeight.toFixed(2) + " m";
        document.getElementById("time").innerText = "Time of Flight: " + totalTime.toFixed(2) + " s";

        let t = 0;
        const scale = 6;

        const startX = 150;
        const groundY = canvas.height - 100;

        function drawBackground() {
            const sky = ctx.createLinearGradient(0, 0, 0, canvas.height);
            sky.addColorStop(0, "#001f3f");
            sky.addColorStop(1, "#0074D9");
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#2ECC40";
            ctx.fillRect(0, groundY, canvas.width, 100);
        }

        function draw() {
            drawBackground();

            const x = v * Math.cos(angle) * t;
            const y = v * Math.sin(angle) * t - 0.5 * g * t * t;

            if (y < 0) return;

            const drawX = startX + x * scale;
            const drawY = groundY - y * scale;

            // Draw trajectory trail
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255,255,255,0.4)";
            ctx.moveTo(startX, groundY);
            for (let time = 0; time <= t; time += 0.05) {
                let tx = v * Math.cos(angle) * time;
                let ty = v * Math.sin(angle) * time - 0.5 * g * time * time;
                if (ty >= 0)
                    ctx.lineTo(startX + tx * scale, groundY - ty * scale);
            }
            ctx.stroke();

            // Glow projectile
            ctx.shadowBlur = 25;
            ctx.shadowColor = "cyan";

            const gradient = ctx.createRadialGradient(drawX, drawY, 2, drawX, drawY, 12);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, "cyan");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(drawX, drawY, 10, 0, Math.PI * 2);
            ctx.fill();

            t += 0.03;
            requestAnimationFrame(draw);
        }

        draw();
    };

    document.getElementById("launchBtn").addEventListener("click", simulate);

};