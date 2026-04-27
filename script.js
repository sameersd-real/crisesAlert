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
    document.getElementById("emergencySection")
      .scrollIntoView({ behavior: "smooth" });

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

function fillSample(text) {
    document.getElementById("inputBox").value = text;
}

function generateReport() {

    const report = `
Incident Type: ${document.getElementById("type").innerText}
Severity: ${document.getElementById("severity").innerText}

Summary:
${document.getElementById("summary").innerText}

Immediate Action:
${document.getElementById("action").innerText}
`;

    document.getElementById("reportOutput").innerText = report;
}

function copyReport() {

    const report =
        document.getElementById("reportOutput").innerText;

    navigator.clipboard.writeText(report);

    alert("Report copied!");
}


function callAll() {

    document.getElementById("emergencySection")
          .scrollIntoView({ behavior: "smooth" });
    

    document.getElementById("type").innerText =
        "Type: MASS EMERGENCY";

    document.getElementById("severity").innerText =
        "CRITICAL";

    document.getElementById("severity").style.background =
        "red";

    document.getElementById("severity").style.color =
        "white";

    
    document.getElementById("summary").innerText =
        "A large-scale emergency has been triggered. All departments are being alerted.";

    
    document.getElementById("action").innerText =
        "Initiate evacuation and emergency response protocols immediately.";

    
    const stepsList =
        document.getElementById("steps");

    stepsList.innerHTML = "";

    const emergencySteps = [
        "Alert fire department",
        "Alert medical response team",
        "Alert police/security department",
        "Start building evacuation",
        "Activate emergency control room",
        "Guide civilians to safe zones"
    ];

    emergencySteps.forEach(step => {

        const li = document.createElement("li");

        li.textContent = step;

        stepsList.appendChild(li);
    });

    
    const report = `
===== HUGE EMERGENCY ALERT =====

STATUS: CRITICAL

Departments Alerted:
- Fire Department
- Medical Team
- Police/Security
- Disaster Response Unit

ACTION:
Evacuation and emergency protocols activated.
`;

    document.getElementById("reportOutput").innerText =
        report;

    
    document.body.style.background =
        "#ffe5e5";

    
    const emergencyMessage =
        "🚨 HUGE EMERGENCY ACTIVATED 🚨\nAll departments have been alerted.";


    
    console.log("Fire Department Alerted");
    console.log("Medical Team Alerted");
    console.log("Police Department Alerted");
    console.log("Disaster Response Team Alerted");
}