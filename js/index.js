
    document.addEventListener("DOMContentLoaded", () => {
      for (let i = 0; i < 7; i++) {
        addRow();
      }
    });

    // Add a new row to the table
    function addRow() {
      const tbody = document.getElementById("semesters");
      const row = document.createElement("tr");

      row.innerHTML = `
        <td><input type="text" class="form-control" placeholder="Subject Name"></td>
        <td><input type="number" min="1" class="form-control" placeholder="Credit Hours"></td>
        <td>
          <select class="form-control">
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
          </select>
        </td>
      `;

      tbody.appendChild(row);
    }

    // Calculate GPA based on entered values
    function calc_GPA() {
      const rows = document.querySelectorAll("#semesters tr");
      let totalPoints = 0;
      let totalCredits = 0;

      const gradeMap = {
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


      for (let row of rows) {
        const inputs = row.querySelectorAll("input");
        const select = row.querySelector("select");

        const credit = parseFloat(inputs[1].value);
        const grade = select.value;

        if (!isNaN(credit) && gradeMap[grade] !== undefined) {
          totalCredits += credit;
          totalPoints += credit * gradeMap[grade];
        }
      }

      const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
      
      document.getElementById("gpaResult").innerText = `Your GPA is: ${gpa}`;
      document.getElementById("resultbox").scrollIntoView({behavior : "smooth"});
    }