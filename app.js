let csvData = [];

        // Funcion para leer csv
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

        
        function parseCSV(text) {
            csvData = text.trim().split('\n').map(row => row.split(','));
        }

        // Funcion para mostrar el csv en una tabla
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

        // Funcion para agregar datos
        function agregarData() {
            const newData = document.getElementById('newData').value;
            const newRow = newData.split(',');
            csvData.push(newRow);
            mostrarCSV();
        }

        // Funcion para eliminar datos
        function borrarData() {
            const rowIndex = parseInt(document.getElementById('rowIndex').value, 10);
            if (!isNaN(rowIndex) && rowIndex >= 0 && rowIndex < csvData.length) {
                csvData.splice(rowIndex, 1);
                mostrarCSV();
            } else {
                alert('Invalid row index');
            }
        }

        // Funcion para descargar el csv editado
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




