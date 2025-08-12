// Datos por departamento
const datos = [
    { dep: "Tarija", mujeres: 1587, hombres: 2942, interp: "Tarija: los hombres casi duplican a las mujeres." },
    { dep: "Potosí", mujeres: 2788, hombres: 4726, interp: "Potosí: patrón similar, más hombres aplazados." },
    { dep: "Beni", mujeres: 2920, hombres: 5121, interp: "Beni: la brecha sigue, más hombres." },
    { dep: "Oruro", mujeres: 1449, hombres: 2543, interp: "Oruro: casi el doble de hombres." },
    { dep: "Pando", mujeres: 826, hombres: 1401, interp: "Pando: otra vez, más hombres." },
    { dep: "Chuquisaca", mujeres: 2134, hombres: 3860, interp: "Chuquisaca: hombres superan a mujeres." },
    { dep: "La Paz", mujeres: 3382, hombres: 7507, interp: "La Paz: diferencia brutal, hombres arriba." },
    { dep: "Cochabamba", mujeres: 6175, hombres: 12636, interp: "Cochabamba: brecha enorme, hombres lideran." },
    { dep: "Santa Cruz", mujeres: 16275, hombres: 28217, interp: "Santa Cruz: récord, hombres casi el doble." }
];

const graficasDiv = document.getElementById('graficas');

datos.forEach((d, i) => {
    const div = document.createElement('div');
    div.className = 'grafica-dep';
    div.innerHTML = `<h2>${d.dep}</h2><canvas id="dep${i}"></canvas>`;
    graficasDiv.appendChild(div);
    new Chart(document.getElementById(`dep${i}`), {
        type: 'bar',
        data: {
            labels: ['Mujeres', 'Hombres'],
            datasets: [{
                label: 'Aplazados',
                data: [d.mujeres, d.hombres],
                backgroundColor: [
                    'rgba(255,99,132,0.7)',
                    'rgba(54,162,235,0.7)'
                ]
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                title: { display: false }
            },
            onClick: () => {
                document.getElementById('interpretacion').innerText = d.interp;
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
});
