document.getElementById('timetableForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']; // Hardcoded for now
    const startTime = parseInt(document.getElementById('startTime').value.split(':')[0]);
    const endTime = parseInt(document.getElementById('endTime').value.split(':')[0]);
    const periodDuration = parseInt(document.getElementById('periodDuration').value);


    const subjects = document.getElementById('subjects').value.split(',').map(s => s.trim());
    const teachersSubjects = document.getElementById('teachersSubjects').value.split('\n').map(s => s.trim());
    const labs = document.getElementById('labs').value.split(',').map(s => s.trim());


    const labPeriods = parseInt(document.getElementById('labPeriods').value);


    // Validate input
    if (workingDays.length === 0 || isNaN(startTime) || isNaN(endTime) || isNaN(periodDuration)) {
        alert("Please fill in all fields properly.");
        return;
    }


    const teachersMap = {};
    teachersSubjects.forEach(entry => {
        const parts = entry.split('-');
        if (parts.length !== 3) {
            console.warn('Invalid teacher entry skipped:', entry);
            return;
        }
        const [id, name, subject] = parts;
        teachersMap[subject] = { id, name };
    });


    const timetable = {};
    const periodsPerDay = Math.floor((endTime - startTime) * 60 / periodDuration);


    // Generate the timetable
    workingDays.forEach(day => {
        timetable[day] = [];
        for (let i = 0; i < periodsPerDay; i++) {
            let subject = subjects[Math.floor(Math.random() * subjects.length)];


            // Handle lab subjects which take 3 periods
            if (labs.includes(subject) && i <= periodsPerDay - labPeriods) {
                timetable[day].push(`${subject} (Lab)`);
                for (let j = 1; j < labPeriods; j++) {
                    timetable[day].push('→');
                    i++;
                }
            } else {
                timetable[day].push(subject);
            }
        }
    });


    // Display timetable
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.appendChild(document.createElement('th')); // Empty top-left


    for (let i = 0; i < periodsPerDay; i++) {
        const th = document.createElement('th');
        let hour = startTime + Math.floor(i * periodDuration / 60);
        let minutes = (i * periodDuration) % 60;
        let timeLabel = `${hour}:${minutes === 0 ? '00' : minutes}`;
        th.textContent = timeLabel;
        headerRow.appendChild(th);
    }


    table.appendChild(headerRow);


    // Adding rows for working days
    for (let day of workingDays) {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = day;
        row.appendChild(dayCell);


        timetable[day].forEach(period => {
            const cell = document.createElement('td');
            cell.textContent = period === '' ? '→' : period;
            row.appendChild(cell);
        });


        table.appendChild(row);
    }


    const timetableDiv = document.getElementById('timetable');
    timetableDiv.innerHTML = '';
    timetableDiv.appendChild(table);


    // Show timetable section
    document.getElementById('timetableContainer').style.display = 'block';
});


function resetForm() {
    document.getElementById('timetableForm').reset();
    document.getElementById('timetableContainer').style.display = 'none';
}


function goBack() {
    document.getElementById('timetableContainer').style.display = 'none';
}


function downloadTimetable() {
    const element = document.getElementById('timetableContainer');
    html2canvas(element).then((canvas) => {
        const link = document.createElement('a');
        link.download = 'timetable.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}
