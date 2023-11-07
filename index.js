// Description: This file is used to create a chart using chart.js library
fetch("./data.json")
    .then(response => response.json()).then(data => {
        // Get the data from the json file
        const days = data.map(day => day.day);
        const amount = data.map(day => day.amount);
        const ctx = document.getElementById('myChart');
        const maxAmount = Math.max(...amount);

        // Get the total expense and my balance
        const expenseEl = document.getElementById('total-expense');
        const myBalanceEl = document.getElementById('my-balance');
        const percentageEl = document.getElementById('percentage');
        const startingBalance = 921.48;
        const totalExpense = amount.reduce((total, curr) => total + curr);
        myBalanceEl.innerText = `$${startingBalance - totalExpense}`;
        expenseEl.innerText = `$${totalExpense}`;
        percentageEl.innerText = `${Math.round((totalExpense / startingBalance) * 100)}%`;

        // Custom background color for the bar chart
        const customBackgroundColor = amount.map(value => {
            return value === maxAmount ? 'hsl(186, 34%, 60%)' : 'hsl(10, 79%, 65%)';
        });
        const hoverEffect = amount.map(value => {
            return value === maxAmount ? 'hsl(186, 34%, 60%,0.7)' : 'hsl(10, 79%, 65%,0.7)';
        });

        let x = window.matchMedia("(max-width: 799px)");

        let updateAspectRatio = (x) => {
            if (x.matches) { // If media query matches
                return 1.2;
            } else {
                return true;
            }
        };

        const updatedRatio = updateAspectRatio(x);

        // Create a chart using chart.js library
        new Chart(ctx, {

            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    data: amount,
                    backgroundColor: customBackgroundColor,
                    borderRadius: 5,
                    borderWidth: 0,
                    hoverBackgroundColor: hoverEffect,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                aspectRatio: updatedRatio,
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        callbacks: {
                            title: function (context) {
                                return '';
                            },
                            label: function (context) {
                                return '';
                            },
                            beforeLabel: function (context) {
                                return '$' + context.dataset.data[context.dataIndex];
                            },
                        },
                        enabled: true,
                        yAlign: 'bottom',
                        caretSize: 0,
                        caretPadding: 7,
                        displayColors: false,
                        titleColor: 'hsl(0, 0%, 100%)',
                        padding: 8,
                    

                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            display: false, // Hide x-axis gridlines
                        }
                    },
                    y: {
                        beginAtZero: true,
                        display: false,
                    }
                },
                layout: {
                    padding: {
                        left: 30,
                        right: 30,
                        bottom: 40,
                        top: 10
                    }


                }


            }

        });

    });



