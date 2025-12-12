// Load TensorFlow.js
importScripts("tf/tf.min.js");

// Load tab monitoring script (your custom file)
importScripts("tabs_monitor.js");

console.log("Background service worker started.");

// Global model reference
let model = null;

// Load the AI model
async function loadModel() {
    try {
        if (!model) {
            console.log("Loading model...");
            model = await tf.loadLayersModel(
                chrome.runtime.getURL("tfjs_model/model.json")
            );
            console.log("Model successfully loaded:", model);
        }
    } catch (err) {
        console.error("Error loading model:", err);
    }
}

// Chrome startup events
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed. Loading model...");
    loadModel();
});

chrome.runtime.onStartup.addListener(() => {
    console.log("Browser startup. Loading model...");
    loadModel();
});

// Simulated feature extraction function (placeholder)
async function simulateFeatureExtraction() {
    // Example: return dummy 10-feature input
    return Array(10).fill(0).map(() => Math.random());
}

// Listener for popup scan requests
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "scan_tab") {
        console.log("Popup requested scan.");

        (async () => {
            await loadModel();

            console.log("Extracting features...");
            const features = await simulateFeatureExtraction();
            console.log("Features:", features);

            const input = tf.tensor([features]);

            console.log("Running prediction...");
            const predictionArray = await model.predict(input).data();
            const prediction = predictionArray[0];

            console.log("Prediction score:", prediction);

            const malicious = prediction > 0.5;

            sendResponse({ malicious });
        })();

        return true; // keep message channel open
    }
});
