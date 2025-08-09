function dream(){
    var value = parseInt(document.getElementById("sem").value);
    var tbody = document.getElementById("sems");
    tbody.innerHTML="";
    for(let i=0; i<value ; i++)
    {
        var semnum=i+1;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td><input type="number" step="0.01" placeholder="Enter GPA of Semester ${semnum}" class="form-control"></td>
        <td><input type="number" placeholder="Credit Hours" class="form-control"></td>
        `;
        tbody.appendChild(row);
    }
    

}

function calculate(){

    const future_ch = parseFloat(document.getElementById("fch").value);
    const dream_gpa = parseFloat(document.getElementById("dgpa").value);

    const tablebody = document.getElementById("sems");
    const rows = tablebody.getElementsByTagName("tr");
    const stud_data = [];

    for(var i=0;i<rows.length; i++)
    {
        const cells = rows[i].getElementsByTagName("td");
        const gpa = parseFloat(cells[0].querySelector("input").value.trim());
        const ch = parseFloat(cells[1].querySelector("input").value.trim());

        stud_data.push({gpa,ch});
    }

    var greek_sum = 0;
    let ch=0;
    for(let i=0; i<stud_data.length;i++)
    {
        var cal = stud_data[i].gpa*stud_data[i].ch;
        greek_sum+=cal;
        
        ch += stud_data[i].ch;
    }

    ch+= future_ch;

    var cgpa = (((dream_gpa*ch)-greek_sum)/future_ch).toFixed(2);
    document.getElementById("resultbox").innerText = `You must achieve a GPA of ${cgpa} in next semester to achieve a CGPA of ${dream_gpa}`;
    ocument.getElementById("resultbox").scrollIntoView({behavior : "smooth"});
}