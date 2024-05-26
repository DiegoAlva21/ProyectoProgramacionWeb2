let csvData = [];

        // Function to read CSV file
        document.getElementById('csvFileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const text = e.target.result;
                parseCSV(text);
                mostrarCSV();
            };
            reader.readAsText(file);
        });

        // Function to parse CSV text into an array
        function parseCSV(text) {
            csvData = text.trim().split('\n').map(row => row.split(','));
        }

        // Function to display CSV data in a table
        function mostrarCSV() {
            const table = document.getElementById('csvTable');
            table.innerHTML = '';
            csvData.forEach((row, rowIndex) => {
                const tr = document.createElement('tr');
                row.forEach((cell, cellIndex) => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                table.appendChild(tr);
            });
        }

        // Function to insert a new row into the CSV data
        function agregarData() {
            const newData = document.getElementById('newData').value;
            const newRow = newData.split(',');
            csvData.push(newRow);
            mostrarCSV();
        }

        // Function to delete a row from the CSV data
        function borrarData() {
            const rowIndex = parseInt(document.getElementById('rowIndex').value, 10);
            if (!isNaN(rowIndex) && rowIndex >= 0 && rowIndex < csvData.length) {
                csvData.splice(rowIndex, 1);
                mostrarCSV();
            } else {
                alert('Invalid row index');
            }
        }

        // Function to download the modified CSV file
        function descargarCSV() {
            const csvContent = csvData.map(row => row.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'modified.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }




