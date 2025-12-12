document.getElementById("scan").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "scan_tab" }, (response) => {
        if (response.malicious) {
            document.getElementById("status").innerHTML =
                "🚨 <b>Malicious Activity Detected!</b>";
            document.getElementById("status").style.color = "red";
        } else {
            document.getElementById("status").innerHTML =
                "✅ Tab is safe.";
            document.getElementById("status").style.color = "green";
        }
    });
});
