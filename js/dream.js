const DREAM_KEY = "gpa_dream_data";

function dream() {
  const value = parseInt(document.getElementById("sem").value);
  const tbody = document.getElementById("sems");
  tbody.innerHTML = "";
  for (let i = 0; i < value; i++) {
    const semnum = i + 1;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="number" step="0.01" placeholder="Enter GPA of Semester ${semnum}" class="form-control"></td>
      <td><input type="number" placeholder="Credit Hours" class="form-control"></td>
    `;
    tbody.appendChild(row);
  }

  saveDreamData();
  restoreDreamRows();
}

function calculate() {
  const future_ch = parseFloat(document.getElementById("fch").value);
  const dream_gpa = parseFloat(document.getElementById("dgpa").value);

  const tablebody = document.getElementById("sems");
  const rows = tablebody.getElementsByTagName("tr");
  const stud_data = [];

  for (var i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    const gpa = parseFloat(cells[0].querySelector("input").value.trim());
    const ch = parseFloat(cells[1].querySelector("input").value.trim());

    stud_data.push({ gpa, ch });
  }

  var greek_sum = 0;
  let ch = 0;
  for (let i = 0; i < stud_data.length; i++) {
    var cal = stud_data[i].gpa * stud_data[i].ch;
    greek_sum += cal;

    ch += stud_data[i].ch;
  }

  ch += future_ch;

  var cgpa = (((dream_gpa * ch) - greek_sum) / future_ch).toFixed(2);
  document.getElementById("resultbox").innerText = `You must achieve a GPA of ${cgpa} in next semester to achieve a CGPA of ${dream_gpa}`;
  document.getElementById("resultbox").scrollIntoView({ behavior: "smooth" });
}

function saveDreamData() {
  const rows = document.querySelectorAll("#sems tr");
  const rowsData = [];
  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");
    rowsData.push({
      gpa: inputs[0].value,
      ch: inputs[1].value
    });
  });

  Persist.save(DREAM_KEY, {
    semCount: parseInt(document.getElementById("sem").value) || 0,
    rows: rowsData,
    dreamGPA: document.getElementById("dgpa").value,
    futureCH: document.getElementById("fch").value
  });
}

function restoreDreamRows() {
  const data = Persist.load(DREAM_KEY);
  if (!data || !data.rows) return;
  const rows = document.querySelectorAll("#sems tr");
  rows.forEach((row, i) => {
    if (i < data.rows.length) {
      const inputs = row.querySelectorAll("input");
      if (data.rows[i].gpa) inputs[0].value = data.rows[i].gpa;
      if (data.rows[i].ch) inputs[1].value = data.rows[i].ch;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const data = Persist.load(DREAM_KEY);
  if (data) {
    if (data.semCount) document.getElementById("sem").value = data.semCount;
    if (data.dreamGPA) document.getElementById("dgpa").value = data.dreamGPA;
    if (data.futureCH) document.getElementById("fch").value = data.futureCH;
    if (data.semCount) dream();
  }

  document.querySelector(".container").addEventListener("input", saveDreamData);
  document.querySelector(".container").addEventListener("change", saveDreamData);
});
