async function analyseIncident() {

    const input = document.getElementById("inputBox").value;

    const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: input
        })
    });

    const data = await response.json();

    document.getElementById("summary").innerText = data.result;
}
const result = JSON.parse(data.result);

document.getElementById("type").innerText =
    "Type: " + result.type;

document.getElementById("severity").innerText =
    result.severity;

document.getElementById("summary").innerText =
    result.summary;

document.getElementById("action").innerText =
    result.action;