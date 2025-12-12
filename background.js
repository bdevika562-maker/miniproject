importScripts("tabs_monitor.js");

// Global model
let model = null;

async function loadModel() {
    if (!model) {
        model = await tf.loadLayersModel(chrome.runtime.getURL("tfjs_model/model.json"));
        console.log("Model loaded.");
    }
}

chrome.runtime.onInstalled.addListener(loadModel);
chrome.runtime.onStartup.addListener(loadModel);

// Handle popup scan request
chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
    if (msg.action === "scan_tab") {
        await loadModel();

        const features = await simulateFeatureExtraction();
        const input = tf.tensor([features]);

        const prediction = (await model.predict(input).data())[0];
        const malicious = prediction > 0.5;

        sendResponse({ malicious });
        return true;
    }
});
