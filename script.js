document.getElementById("robot").addEventListener("click", function () {
    const audio = document.getElementById("myAudio");
    audio.volume = 1.0; // Volume max
    audio.play().catch(error => console.log("Erreur de lecture :", error));
});

document.addEventListener("DOMContentLoaded", function () {
    const phrases = [
        "ahhhhh", "goofy", "ahhhh gyat", "nooo", "aie", "quoi ?", "hein ?", 
        "aie aie aie", "bro ?", "wtf", "OMG", "skibidi", "GYAATT", "huh ?", "damn"
    ];

    const colors = ["red", "yellow", "blue", "green", "purple", "orange", "white", "cyan"];
    const numTexts = 30; // Nombre de textes

    let texts = [];

    for (let i = 0; i < numTexts; i++) {
        let textElement = document.createElement("div");
        textElement.classList.add("random-text");
        textElement.innerText = phrases[Math.floor(Math.random() * phrases.length)];

        // Taille aléatoire (20px à 80px)
        let fontSize = Math.floor(Math.random() * 60) + 20;
        textElement.style.fontSize = fontSize + "px";

        // Couleur aléatoire
        textElement.style.color = colors[Math.floor(Math.random() * colors.length)];

        // Position aléatoire
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;

        textElement.style.left = `${x}px`;
        textElement.style.top = `${y}px`;

        document.body.appendChild(textElement);

        // Définir si ce texte va tourner ou non (50% de chance)
        let rotates = Math.random() < 0.5;

        // Si le texte tourne, on choisit une direction (horaire ou antihoraire) et une vitesse de rotation aléatoire
        let rotationDirection = Math.random() < 0.5 ? 1 : -1; // 1 pour horaire, -1 pour antihoraire
        let rotationSpeed = (Math.random() * 2 + 1) * rotationDirection; // Vitesse aléatoire entre 1 et 3 degrés par frame, avec direction

        // Stocker les infos du texte
        texts.push({
            element: textElement,
            x: x,
            y: y,
            dx: (Math.random() - 0.5) * 4, // Vitesse X (-2 à +2)
            dy: (Math.random() - 0.5) * 4, // Vitesse Y (-2 à +2)
            size: fontSize,
            rotation: rotates ? Math.random() * 360 : 0, // Angle de rotation initial
            rotationSpeed: rotates ? rotationSpeed : 0 // Vitesse de rotation, 0 si pas de rotation
        });
    }

    function animate() {
        texts.forEach(text => {
            text.x += text.dx;
            text.y += text.dy;
            text.rotation += text.rotationSpeed; // Appliquer la rotation uniquement si elle est activée

            // Collision avec les bords
            if (text.x <= 0 || text.x + text.size >= window.innerWidth) {
                text.dx *= -1; // Inverse la direction horizontale
            }
            if (text.y <= 0 || text.y + text.size >= window.innerHeight) {
                text.dy *= -1; // Inverse la direction verticale
            }

            text.element.style.left = `${text.x}px`;
            text.element.style.top = `${text.y}px`;
            text.element.style.transform = `rotate(${text.rotation}deg)`; // Appliquer la rotation au texte
        });

        requestAnimationFrame(animate);
    }

    animate(); // Lancement de l'animation
});
