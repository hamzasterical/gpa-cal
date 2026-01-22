function generateTable() 
{
      const sem = parseInt(document.getElementById("selectSem").value);
      const tbody = document.getElementById("semesters");
      let count;
      let selected_sem = [];

      if(isNaN(sem)){
        alert("Select a semester First");
        return;
      }

      let sem1 = [["PF",3],
                  ["PF-Lab",1],
                  ["ICT", 2],
                  ["ICT-Lab", 1],
                  ["Applied Phy", 2],
                  ["Applied Phy-Lab",1],
                  ["DiscreteMath", 3],
                  ["Calculus-I", 3]];


      let sem2 = [["OOP",3],
                  ["OOP-Lab",1],
                  ["Database Systems", 3],
                  ["Database Systems-Lab", 1],
                  ["DLD", 2],
                  ["DLD-Lab",1],
                  ["CommunicationSkills-Lab", 1],
                  ["TQ-I", 1],
                  ["Calculus-II",3],
                  ["Applied S&P",3]];

        let sem3 = [["DSA",3],
                  ["DSA-Lab",1],
                  ["Computer Networks", 2],
                  ["Computer Networks-Lab", 1],
                  ["Software Eng",3],
                  ["Software Eng-Lab", 1],
                  ["Functional English", 3],
                  ["Islamic Studies/Ethics", 3]];

        let sem4 = [["CO & Assembly",2],
                  ["CO & Assembly-Lab",1],
                  ["AI", 2],
                  ["AI-Lab", 1],
                  ["Theory of Automata",3],
                  ["Advanced DB", 2],
                  ["Advanced DB-Lab", 1],
                  ["D&A of Algorithms",3],
                  ["Information Security", 2],
                  ["TQ-II", 1]];

        let sem5 = [["Machine Learning",3],
                  ["Deep Learning",3],
                  ["Intro to Human-Computer Interaction", 3],
                  ["Computer Architecture", 3],
                  ["OS",3],
                  ["OS-lab",1],
                  ];

        let sem7 = [["Machine Learning",3],["Deep Learning",3],["Compiler Construction",3],["Compiler Constr.-Lab",3],["IS & PS", 2],["FYP-1",2]]
                 

      switch (sem) {
        case 1: count = 8; selected_sem=sem1 ; break;
        case 2: count = 10; selected_sem=sem2; break;
        case 3: count = 8; selected_sem=sem3; break;
        case 4: count = 10; selected_sem=sem4 ;break;
        case 5: count = 8; break;
       // case 6: count = 2; break;
        case 7: count = 8; break;
       // case 8: count = 2; break;
        default:
          alert("Please select a valid semester");
          return;
      }

      tbody.innerHTML = "";

      for (let i = 0; i < count; i++) 
      {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><input type="text" value="${selected_sem[i][0]||''}"></td>
          <td><input type="number" min="1" max="3" value="${selected_sem[i][1]||''}"></td>
          <td>
            <select>
              <option selected disabled>Choose Grade</option>
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
              <option>NiLL on LMS</option>
            </select>
          </td>`;
        tbody.appendChild(row);
      }
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

  const tablebody = document.getElementById("semesters");
  const rows = tablebody.getElementsByTagName("tr");

  let total_credits = 0;
  let total_score = 0;

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");

    const ch = parseFloat(cells[1].querySelector("input").value);
    const grade = cells[2].querySelector("select").value;

    if (grade === "NiLL on LMS") {
      continue;
    }

    if (!points.hasOwnProperty(grade) || isNaN(ch)) {
      alert(`Invalid data in row ${i + 1}`);
      return;
    }

    total_credits += ch;
    total_score += points[grade] * ch;
  }

  if (total_credits === 0) {
    alert("No valid grades to calculate GPA");
    return;
  }

  const GPA = (total_score / total_credits).toFixed(2);
  document.getElementById("result").innerText = `Your GPA is ${GPA}`;
  document.getElementById("resultbox").scrollIntoView({ behavior: "smooth" });
}

