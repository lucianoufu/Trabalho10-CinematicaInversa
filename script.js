google.charts.load('current', {'packages':['line']});

function calculaAngulos(){
	let comprimento1    = parseFloat(document.getElementById("comprimento1").value);
	let comprimento2    = parseFloat(document.getElementById("comprimento2").value);
	let coordenadaX     = parseFloat(document.getElementById("coordenadaX").value);
	let coordenadaY     = parseFloat(document.getElementById("coordenadaY").value);
	let orientacaoGraus = parseFloat(document.getElementById("orientacao").value);
	let orientacaoRad   = grauParaRad(orientacaoGraus);


	let theta2 = Math.acos((Math.pow(coordenadaX, 2) + Math.pow(coordenadaY, 2) - Math.pow(comprimento1, 2) - Math.pow(comprimento2, 2)) / (2 * comprimento1 * comprimento2));
	let theta1;
	if(theta2 < 0){
		theta1 = Math.atan2(coordenadaY, coordenadaX) + Math.acos((Math.pow(coordenadaX, 2) + Math.pow(coordenadaY, 2) + Math.pow(comprimento1, 2) - Math.pow(comprimento2, 2)) / (2 * comprimento1 * Math.sqrt(Math.pow(coordenadaX, 2) + Math.pow(coordenadaY, 2))));
	}
	else{
		theta1 = Math.atan2(coordenadaY, coordenadaX) - Math.acos((Math.pow(coordenadaX, 2) + Math.pow(coordenadaY, 2) + Math.pow(comprimento1, 2) - Math.pow(comprimento2, 2)) / (2 * comprimento1 * Math.sqrt(Math.pow(coordenadaX, 2) + Math.pow(coordenadaY, 2))));
	}
	let theta3 = orientacaoRad - (theta1 + theta2);

	dadosDeSaida(theta1.toFixed(4), theta2.toFixed(4), theta3.toFixed(4), radParaGrau(theta1).toFixed(4), radParaGrau(theta2).toFixed(4), radParaGrau(theta3).toFixed(4));
	drawChart(comprimento1, theta1, comprimento2, theta2, orientacaoRad);
}


function radParaGrau(rad){
	return (180 * rad) / Math.PI
}

function grauParaRad(grau){
	return (Math.PI * grau) / 180;
}

function dadosDeSaida(anguloRad1, anguloRad2, anguloRad3, anguloGrau1, anguloGrau2, anguloGrau3){
	let dados = `<p>Ângulos:</p> 
	<p>&theta;<sub>1</sub>: ${anguloRad1} rad, ${anguloGrau1}º</p> 
	<p>&theta;<sub>2</sub>: ${anguloRad2} rad, ${anguloGrau2}º</p> 
	<p>&theta;<sub>3</sub>: ${anguloRad3} rad, ${anguloGrau3}º</p>`;
	document.getElementById("dadosSaida").innerHTML = dados;
}

function drawChart(diagonal1, angulo1Rad, diagonal2, angulo2Rad, angulo3Rad) {

	var data = new google.visualization.DataTable();

	ponto1 = [diagonal1 * Math.cos(angulo1Rad),  diagonal1 * Math.sin(angulo1Rad)];
	ponto2 = [(diagonal2 * Math.cos(angulo2Rad + angulo1Rad)) + ponto1[0],  (diagonal2 * Math.sin(angulo2Rad + angulo1Rad)) + ponto1[1]];
	ponto3 = [(1 * Math.cos(angulo3Rad)) + ponto2[0], (1 * Math.sin(angulo3Rad)) + ponto2[1]];
	data.addColumn('number', 'x');
	data.addColumn('number', 'y');

    data.addRows([
		[0, 0],
    	[ponto1[0], ponto1[1]],
    	[ponto2[0], ponto2[1]],
		[ponto3[0], ponto3[1]]
    ]);

    var options = {
		series: {
            0: { color: '#8a142a' }
		},
    	width: 900,
    	height: 500,
    	axes: {
    		x: {
    			0: {side: 'botton'}
    		}
    	}
    };

    var chart = new google.charts.Line(document.getElementById('line_top_x'));
    chart.draw(data, google.charts.Line.convertOptions(options));
}