// Datos de aplazados por departamento y género
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

const ctx = document.getElementById('grafico').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: datos.map(d => d.dep),
        datasets: [
            {
                label: 'Mujeres',
                data: datos.map(d => d.mujeres),
                backgroundColor: 'rgba(255,99,132,0.7)'
            },
            {
                label: 'Hombres',
                data: datos.map(d => d.hombres),
                backgroundColor: 'rgba(54,162,235,0.7)'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: false
            }
        },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                document.getElementById('interpretacion').innerText = datos[index].interp;
            }
        }
    }
});

// Mostrar interpretación inicial del primer departamento
window.onload = () => {
    document.getElementById('interpretacion').innerText = datos[0].interp;
};
