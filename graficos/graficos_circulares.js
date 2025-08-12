// Datos por departamento (solo para gráficos circulares)
const datosCircular = [
    { dep: "Tarija", mujeres: 1587, hombres: 2942, interp: "Tarija: ¿Quién se esfuerza más?" },
    { dep: "Potosí", mujeres: 2788, hombres: 4726, interp: "Potosí: ¿Quién tiene la culpa?" },
    { dep: "Beni", mujeres: 2920, hombres: 5121, interp: "Beni: ¿Ellas o ellos?" },
    { dep: "Oruro", mujeres: 1449, hombres: 2543, interp: "Oruro: ¿Quién se defiende mejor?" },
    { dep: "Pando", mujeres: 826, hombres: 1401, interp: "Pando: ¿Quién gana el debate?" },
    { dep: "Chuquisaca", mujeres: 2134, hombres: 3860, interp: "Chuquisaca: ¿Quién tiene razón?" },
    { dep: "La Paz", mujeres: 3382, hombres: 7507, interp: "La Paz: ¿Quién se aplaza más?" },
    { dep: "Cochabamba", mujeres: 6175, hombres: 12636, interp: "Cochabamba: ¿Quién lo justifica mejor?" },
    { dep: "Santa Cruz", mujeres: 16275, hombres: 28217, interp: "Santa Cruz: ¿Quién se defiende mejor?" }
];

const colores = ["rgb(38,186,165)", "rgb(55,95,122)"];
const iconos = [
    '<span class="icono-gen" style="color:rgb(38,186,165)">♀️</span>',
    '<span class="icono-gen" style="color:rgb(55,95,122)">♂️</span>'
];

const graficasCircularesDiv = document.getElementById('graficas_circulares');

function animarPorcentaje(element, target) {
    let current = 0;
    const step = () => {
        if (current < target) {
            current++;
            element.textContent = current + '%';
            requestAnimationFrame(step);
        } else {
            element.textContent = target + '%';
        }
    };
    step();
}


datosCircular.forEach((d, i) => {
    const total = d.mujeres + d.hombres;
    const porcM = Math.round((d.mujeres / total) * 100);
    const porcH = 100 - porcM;

    // Card
    const card = document.createElement('div');
    card.className = 'card-dep';
        // Crear el h2 de interpretación ANTES del card

        // Interpretación como h1 con colores llamativos, pegada al gráfico
        const interpH1 = document.createElement('h1');
        // Colores de bandera por departamento
        const banderaColores = {
            'LA PAZ': 'linear-gradient(90deg, #388e3c 50%, #e53935 50%)', // verde con rojo
            'COCHABAMBA': '#00bcd4', // celeste
            'SANTA CRUZ': '#388e3c', // verde
            'ORURO': '#e53935', // rojowww
            'POTOSI': '#e53935', // rojo
            'CHUQUISACA': '#e53935', // rojo (no blanco)
            'TARIJA': '#e53935', // rojo
            'BENI': '#388e3c', // verde
            'PANDO': '#388e3c', // verde
        };
        const depMayus = d.dep.toUpperCase();
        let depColor = banderaColores[depMayus] || '#e67e22';
        let depNombre;
        if(depMayus === 'LA PAZ') {
            // Degradado para La Paz: verde con rojo
            depNombre = `<span style=\"background:linear-gradient(90deg,#388e3c 50%,#e53935 50%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-weight:bold;text-transform:uppercase;font-size:1.1em;letter-spacing:2px;\">${d.dep}</span>`;
        } else {
            depNombre = `<span style=\"color:${depColor};font-weight:bold;text-transform:uppercase;font-size:1.1em;letter-spacing:2px;\">${d.dep}</span>`;
        }
        interpH1.innerHTML = depNombre + ': ' + d.interp
            .replace(/(mujeres?)/i, '<span style="color:#26baa5;font-weight:bold;">$1</span>')
            .replace(/(hombres?)/i, '<span style="color:#375f7a;font-weight:bold;">$1</span>')
            .replace(/(más|menos|doble|culpa|gana|razón|defiende|justifica|debate)/gi, '<span style="color:#e67e22;font-weight:bold;">$1</span>');
        interpH1.style.textAlign = 'center';
        interpH1.style.fontSize = '5vw';
        interpH1.style.fontWeight = 'bold';
        interpH1.style.margin = '2vw 0 0.2vw 0';
        interpH1.style.lineHeight = '1.1';
        interpH1.style.letterSpacing = '1px';

        card.appendChild(interpH1);
        card.innerHTML += `
            <div class="card-body" style="width:100%;display:flex;justify-content:center;align-items:center;">
                <div class="grafica-circular-wrap">
                    <canvas id="circular${i}" style="width:95vw;max-width:700px;height:95vw;max-height:700px;" width="700" height="700"></canvas>
                    <!-- Hombre: centro-izquierda -->
                    <div class="icono-porc-circular" style="top:50%;left:28%;transform:translate(-50%,-50%);width:40%;flex-direction:column;align-items:center;">
                        <span class="icono-gen fa-solid fa-person" style="color:rgb(55,95,122);text-shadow:none;"></span>
                        <span class="porcentaje" id="ph${i}" style="color:rgb(55,95,122);font-size:2.5em;text-shadow:none;">0%</span>
                    </div>
                    <!-- Mujer: centro-derecha -->
                    <div class="icono-porc-circular" style="top:50%;left:72%;transform:translate(-50%,-50%);width:40%;flex-direction:column;align-items:center;">
                        <span class="icono-gen fa-solid fa-person-dress" style="color:rgb(38,186,165);text-shadow:none;"></span>
                        <span class="porcentaje" id="pm${i}" style="color:rgb(38,186,165);font-size:2.5em;text-shadow:none;">0%</span>
                    </div>
                </div>
            </div>
        `;
    graficasCircularesDiv.appendChild(card);

    // Gráfico
    const ctx = document.getElementById(`circular${i}`).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Mujeres', 'Hombres'],
            datasets: [{
                data: [d.mujeres, d.hombres],
                backgroundColor: colores,
                borderWidth: 2,
                borderColor: '#fff',
                hoverOffset: 10
            }]
        },
        options: {
            cutout: '65%',
            animation: {
                animateRotate: true,
                animateScale: true
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const percent = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percent}%)`;
                        }
                    }
                }
            }
        }
    });

    // Porcentajes animados
    setTimeout(() => {
        animarPorcentaje(document.getElementById(`pm${i}`), porcM);
        animarPorcentaje(document.getElementById(`ph${i}`), porcH);
    }, 400);
});

