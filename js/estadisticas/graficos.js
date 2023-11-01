grafico_lineas()
grafico_barras()

function grafico_lineas(){
    let ctx = document.getElementById('lineChart').getContext('2d');
    let lineChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
          datasets: [{
              label: 'Ventas',
              data: [12, 19, 3, 5, 2, 3],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function grafico_barras(){
    let ctx = document.getElementById('barChart').getContext('2d');
    let barChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Actron 600', 'Desodorante Dove', 'Jabón Rexona', 'Agua Oxigenada'],
        datasets: [{        
            label: 'Ventas por producto',
            data: [150, 120, 80, 90],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}