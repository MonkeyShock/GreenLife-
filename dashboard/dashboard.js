const url1 = 'https://api.sheety.co/13efde5a09acd590a42c28ed033bd5b5/pythonSensorsTable/sensData';
const headers1 = { 'Authorization': 'Bearer ynd!7T0vMkissIZ3hNG8phwSnD&L4XToyG@Mq8h6wt%dzQcTF$' };

fetch(url1, { headers: headers1 })
    .then(response => response.json())
    .then(data => {
        // Create the table
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const headRow = document.createElement('tr');

        // Create header cells
        const headers = ['Sensor 0', 'Sensor 1', 'Sensor 2', 'Sensor 3', 'Sensor 4', 'Sensor 5'];
        headers.forEach(headerText => {
            const headCell = document.createElement('th');
            const headText = document.createTextNode(headerText);
            headCell.appendChild(headText);
            headRow.appendChild(headCell);
        });
        thead.appendChild(headRow);
        table.appendChild(thead);

        // Populate cells with API data
        data.sensData.forEach(item => {
            const row = document.createElement('tr');

            const sensor0Cell = document.createElement('td');
            const sensor0Text = document.createTextNode(item.sensor0);
            sensor0Cell.appendChild(sensor0Text);
            row.appendChild(sensor0Cell);

            const sensor1Cell = document.createElement('td');
            const sensor1Text = document.createTextNode(item.sensor1);
            sensor1Cell.appendChild(sensor1Text);
            row.appendChild(sensor1Cell);

            const sensor2Cell = document.createElement('td');
            const sensor2Text = document.createTextNode(item.sensor2);
            sensor2Cell.appendChild(sensor2Text);
            row.appendChild(sensor2Cell);

            const sensor3Cell = document.createElement('td');
            const sensor3Text = document.createTextNode(item.sensor3);
            sensor3Cell.appendChild(sensor3Text);
            row.appendChild(sensor3Cell);

            const sensor4Cell = document.createElement('td');
            const sensor4Text = document.createTextNode(item.sensor4);
            sensor4Cell.appendChild(sensor4Text);
            row.appendChild(sensor4Cell);

            const sensor5Cell = document.createElement('td');
            const sensor5Text = document.createTextNode(item.sensor5);
            sensor5Cell.appendChild(sensor5Text);
            row.appendChild(sensor5Cell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // Add the table to the element with class "tablem"
        const tablem = document.querySelector('.tablem');
        tablem.appendChild(table);
    })