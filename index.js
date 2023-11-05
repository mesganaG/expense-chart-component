// Description: This file is used to create a chart using chart.js library

fetch("./data.json")
.then(response => response.json()).then(data => {
    const days = data.map(day => day.day);
    const amount = data.map(day => day.amount);
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
       
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                data: amount,
                backgroundColor: 'hsl(10, 79%, 65%)',
                borderColor: 'hsl(10, 79%, 65%)',
                borderRadius: 5,
                borderWidth: 2,
            }]
        },
        option: {
            scales: {
                x: {
                    grid: {
                        beginAtZero: true,
                        display: false, // Hide x-axis gridlines
                        tickColor: 'blue'
                    }
                },
                y: {
                    grid: {
                        display: false, // Hide y-axis gridlines
                        tickColor: 'green'
                    }
                }
            },
            legend: {
                display: true,
                position: 'right',
                labels: {
                    fontColor: '#000'
                }
            },
            layout: {
                padding: {
                    left: 50,
                    right: 0,
                    bottom: 0,
                    top: 0
                }
            }
           
        }

    });

});

//chartMain.defaults.scale.gridLines.drawOnChartArea = false;
//const ctx = document.getElementById('myChart');



