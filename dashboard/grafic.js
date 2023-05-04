const url = 'https://api.sheety.co/13efde5a09acd590a42c28ed033bd5b5/pythonSensors/sensData';
const headers = { 'Authorization': 'Bearer jy2MgiNE$I7lC$YUb%lv0HwaMndN36#k3raGTTt2uhiFDy644VeNQ4d0eJMp_u' };

fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
        // Extrai os dados dos sensores da tabela
        const labels = data.sensData.map(item => item.id);
        const sensor0Data = data.sensData.map(item => item.sensor0);
        const sensor1Data = data.sensData.map(item => item.sensor1);
        const sensor2Data = data.sensData.map(item => item.sensor2);
        const sensor3Data = data.sensData.map(item => item.sensor3);
        const sensor4Data = data.sensData.map(item => item.sensor4);
        const sensor5Data = data.sensData.map(item => item.sensor5);

        // Cria o gráfico
        const chart = document.querySelector("#chart").getContext('2d');
        new Chart(chart, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Sensor 0',
                        data: sensor0Data,
                        borderColor: 'green',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 4,
                        tension: 0.5
                    },
                    {
                        label: 'Sensor 1',
                        data: sensor1Data,
                        borderColor: 'blue',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 4,
                        tension: 0.5
                    },
                    {
                        label: 'Sensor 2',
                        data: sensor2Data,
                        borderColor: 'red',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 4,
                        tension: 0.5
                    },
                    {
                        label: 'Sensor 3',
                        data: sensor3Data,
                        borderColor: 'purple',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 4,
                        tension: 0.5
                    },
                    {
                        label: 'Sensor 4',
                        data: sensor4Data,
                        borderColor: 'orange',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 4,
                        tension: 0.5
                    },
                    {
                        label: 'Sensor 5',
                        data: sensor5Data,
                        borderColor: 'purple',
                        borderWidth: 2,
                        pointBorderColor: 'transparent',
                        pointBorderWidth: 4,
                        tension: 0.5
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        ticks: {
                            min: 2,
                            max: 10,
                            maxTicksLimit: 7,

                            ticks: {
                                stepSize: 2,
                                callback: (value) => value + 'K'
                            },
                            grid: {
                                borderDash: [10]
                            }
                        }
                    }
                }
            }
        });
    });


