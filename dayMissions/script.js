const tableBody = document.querySelector('#missionsTable tbody');
const addMissionBtn = document.getElementById('addMissionBtn');
const finishBtn = document.getElementById('finishBtn');

addMissionBtn.addEventListener('click', () => {
  const newRow = document.createElement('tr');

  // Phone cell
  const phoneCell = document.createElement('td');
  const phoneInput = document.createElement('input');
  phoneInput.type = 'tel';
  phoneInput.placeholder = 'Enter phone';
  phoneInput.title = 'Enter the phone';
  phoneCell.appendChild(phoneInput);

  // Time select cell
  const timeCell = document.createElement('td');
  const timeSelect = document.createElement('select');
  timeSelect.title = 'Choose the time';

  const times = [
    '', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '18:00'
  ];

  times.forEach(time => {
    const option = document.createElement('option');
    option.value = time;
    option.textContent = time === '' ? 'Select time' : time;
    timeSelect.appendChild(option);
  });

  timeCell.appendChild(timeSelect);

  // Checkbox cells
  const statusTitles = ['Completed', 'Sold', 'Thinking'];
  const checkboxCells = statusTitles.map(title => {
    const cell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.title = title;
    cell.appendChild(checkbox);
    return cell;
  });

  // Delete button cell
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '🗑️ Delete';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', () => {
    newRow.remove();
  });
  deleteCell.appendChild(deleteButton);

  // Append all cells
  newRow.appendChild(phoneCell);
  newRow.appendChild(timeCell);
  checkboxCells.forEach(cell => newRow.appendChild(cell));
  newRow.appendChild(deleteCell);

  tableBody.appendChild(newRow);
});

finishBtn.addEventListener('click', () => {
  let soldedCount = 0;
  let thinkingCount = 0;
 

  // Select all table rows
  const rows = document.querySelectorAll('#missionsTable tbody tr');

  rows.forEach(row => {
    const checkboxes = row.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length >= 3) {
      if (checkboxes[1].checked) soldedCount++;  // Solded is first checkbox
      if (checkboxes[2].checked) thinkingCount++;   // Thinking is third checkbox
    }
  });

  // Create message
  const message = `Mission Summary:%0A✅ solded: ${soldedCount}%0A💭 Thinking: ${thinkingCount}`;

  // WhatsApp URL
  const phoneNumber = '972534522102'; // Use international format without '+'
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

  // Open WhatsApp
  window.open(whatsappURL, '_blank');
});
