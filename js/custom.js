function generateTable() {
  const sem = parseInt(document.getElementById("selectSem").value);
  const tbody = document.getElementById("semesters");

  if (isNaN(sem)) {
    alert("Select a semester first");
    return;
  }

  const sem1 = [
    ["PF", 3],
    ["PF-Lab", 1],
    ["ICT", 2],
    ["ICT-Lab", 1],
    ["Applied Phy", 2],
    ["Applied Phy-Lab", 1],
    ["DiscreteMath", 3],
    ["Calculus-I", 3]
  ];

  const sem2 = [
    ["OOP", 3],
    ["OOP-Lab", 1],
    ["Database Systems", 3],
    ["Database Systems-Lab", 1],
    ["DLD", 2],
    ["DLD-Lab", 1],
    ["CommunicationSkills-Lab", 1],
    ["TQ-I", 1],
    ["Calculus-II", 3],
    ["Applied S&P", 3]
  ];

  const sem3 = [
    ["DSA", 3],
    ["DSA-Lab", 1],
    ["Computer Networks", 2],
    ["Computer Networks-Lab", 1],
    ["Software Eng", 3],
    ["Linear ALgebra", 3],
    ["Functional English", 3],
    ["Islamic Studies/Ethics", 3]
  ];

  const sem4 = [
    ["CO & Assembly", 2],
    ["CO & Assembly-Lab", 1],
    ["AI", 2],
    ["AI-Lab", 1],
    ["Theory of Automata", 3],
    ["Advanced DB", 2],
    ["Advanced DB-Lab", 1],
    ["D&A of Algorithms", 3],
    ["Information Security", 2],
    ["TQ-II", 1]
  ];

  const sem5 = [
    ["Machine Learning", 3],
    ["Deep Learning", 3],
    ["Intro to HCI", 3],
    ["Computer Architecture", 3],
    ["OS", 3],
    ["OS-Lab", 1]
  ];

  const sem7 = [
    ["Machine Learning", 3],
    ["Deep Learning", 3],
    ["Compiler Construction", 3],
    ["Compiler Constr.-Lab", 1],
    ["IS & PS", 2],
    ["FYP-1", 2]
  ];

  let selected_sem = [];

  switch (sem) {
    case 1: selected_sem = sem1; break;
    case 2: selected_sem = sem2; break;
    case 3: selected_sem = sem3; break;
    case 4: selected_sem = sem4; break;
    case 5: selected_sem = sem5; break;
    case 7: selected_sem = sem7; break;
    default:
      alert("Invalid semester selected");
      return;
  }

  tbody.innerHTML = "";

  selected_sem.forEach(course => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td><input type="text" value="${course[0]}" readonly></td>
      <td><input type="number" min="0.5" step="0.5" value="${course[1]}"></td>
      <td>
        <select>
          <option selected>NiLL on LMS</option>
          <option>A+</option>
          <option>A</option>
          <option>A-</option>
          <option>B+</option>
          <option>B</option>
          <option>B-</option>
          <option>C+</option>
          <option>C</option>
          <option>C-</option>
          <option>D+</option>
          <option>D</option>
          <option>D-</option>
          <option>F</option>
        </select>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function calc_GPA() {
  const points = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "D-": 0.7,
    "F": 0.0
  };

  const rows = document.querySelectorAll("#semesters tr");

  let totalCredits = 0;
  let totalPoints = 0;

  rows.forEach(row => {
    const ch = parseFloat(row.children[1].querySelector("input").value);
    const grade = row.children[2].querySelector("select").value;

    if (grade === "NiLL on LMS" || isNaN(ch)) {
      return;
    }

    if (!points.hasOwnProperty(grade)) {
      return;
    }

    totalCredits += ch;
    totalPoints += points[grade] * ch;
  });

  if (totalCredits === 0) {
    document.getElementById("result").innerText =
      "No grades available yet. GPA will appear once results are uploaded.";
    return;
  }

  const gpa = (totalPoints / totalCredits).toFixed(2);
  document.getElementById("result").innerText =
    `Temporary GPA (based on available results): ${gpa}`;

  document.getElementById("resultbox").scrollIntoView({ behavior: "smooth" });
}
