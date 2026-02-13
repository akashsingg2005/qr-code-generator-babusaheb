const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const themeToggle = document.getElementById("themeToggle");
const qrText = document.getElementById("qrText");
const qrImage = document.getElementById("qrImage");
const qrCode = document.getElementById("qrCode");

let currentQRUrl = "";

generateBtn.addEventListener("click", generateQR);
downloadBtn.addEventListener("click", downloadQR);
themeToggle.addEventListener("click", toggleTheme);

function generateQR() {
    if (qrText.value.trim() === "") {
        alert("Please enter text or URL");
        return;
    }

    currentQRUrl =
        "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" +
        encodeURIComponent(qrText.value);

    qrCode.src = currentQRUrl;
    qrImage.style.display = "block";
}

async function downloadQR() {
    if (!currentQRUrl) return;

    const response = await fetch(currentQRUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "neon-qr-code.png";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function toggleTheme() {
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");

    themeToggle.textContent =
        document.body.classList.contains("light") ? "🌞" : "🌙";
}
