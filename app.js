
let scanMode = ""; // Tracks whether user selected object or word scanning
let videoStream;

// Mock login function
function login(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "user123" && password === "123") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("selection-screen").style.display = "block";
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// User selects scan mode
function selectScanMode(mode) {
    scanMode = mode;
    document.getElementById("selection-screen").style.display = "none";
    document.getElementById("scanning-screen").style.display = "block";
    startCamera();
}

// Start camera
function startCamera() {
    const video = document.getElementById("camera");
    navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            videoStream = stream;
            video.srcObject = stream;
        })
        .catch((err) => {
            alert("Camera access is required for scanning.");
            console.error("Camera error:", err);
        });
}

// Capture image
function captureImage() {
    const video = document.getElementById("camera");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Simulate scan result
    const scanResult = scanMode === "object" ? "Roti Canai" : "Roti Canai (English: Flatbread)";
    document.getElementById("scanned-item").innerText = scanResult;
    document.getElementById("scan-result").style.display = "block";
    document.getElementById("post-scan-options").style.display = "block";
}

// View cultural tips
function viewCulturalTips() {
    document.getElementById("scanning-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("result-title").innerText = "Cultural Tips";
    document.getElementById("result-description").innerText = "Best enjoyed with curry and dhal.";
}

// Find synonyms
function findSynonyms() {
    document.getElementById("scanning-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("result-title").innerText = "Synonyms";
    document.getElementById("result-description").innerText = "Flatbread, Paratha, Bread.";
}

// Save item (mock function)
function saveItem() {
    alert("Item saved successfully!");
}

// Back to selection screen
function backToHome() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("selection-screen").style.display = "block";
    stopCamera();
}

// Stop camera
function stopCamera() {
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach((track) => track.stop());
    }
}
