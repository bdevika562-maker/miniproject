// Simulated feature extractor for now
async function simulateFeatureExtraction() {
    return [
        Math.random() * 100,  // cpu_usage
        Math.random() * 50,   // network_calls
        Math.random() * 10,   // iframe_count
        Math.random() * 30,   // refresh_rate
        Math.random() * 80,   // dom_changes
        Math.random() * 900,  // memory_usage
        Math.random() * 8,    // script_injections
        Math.random() * 15    // eval_calls
    ];
}
