async function analyseIncident() {

    const input = document.getElementById("inputBox").value;

    const response = await fetch("http://127.0.0.1:8000/analyze", {//change port later
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: input
        })
    });

    const data = await response.json();

    try {

        const result = JSON.parse(data.result);
        document.getElementById("type").innerText =
            "Type: " + result.type;
        document.getElementById("severity").innerText =
            result.severity;
        document.getElementById("summary").innerText =
            result.summary;
        document.getElementById("action").innerText =
            result.action;
            
        const stepsList = document.getElementById("steps");

        stepsList.innerHTML = "";

        result.steps.forEach(step => {

            const li = document.createElement("li");

            li.textContent = step;

            stepsList.appendChild(li);
        });

    } catch (error) {

        document.getElementById("summary").innerText =
            data.result || data.error;
    }
}