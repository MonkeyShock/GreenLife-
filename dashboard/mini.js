Promise.all([
    fetch('./Umidade.txt').then(response => response.text()),
    fetch('./Temperatura.txt').then(response => response.text()),
    fetch('./Desempenho.txt').then(response => response.text())
]).then(([umidadeData, temperaturaData, desempenhoData]) => {
    const umidadeLines = umidadeData.split('\n');
    const umidade = umidadeLines.slice(-10)[0].replace(/\D/g, ''); // pega o último valor e remove tudo que não for número
    console.log('Umidade:', umidade);


    const temperaturaLines = temperaturaData.split('\n');
    const temperatura = temperaturaLines.slice(-10)[0].replace(/\D/g, ''); // pega o último valor e remove tudo que não for número
    console.log('Temperatura:', temperatura);


    const desempenhoLines = desempenhoData.split('\n');
    const desempenho = desempenhoLines.slice(-10)[0].replace(/\D/g, ''); // pega o último valor e remove tudo que não for número
    console.log('Desempenho:', desempenho);


    // Calcula a porcentagem com base nos dados fornecidos
    const tempPercentage = (temperatura / 100) * 100;
    const humidityPercentage = (umidade / 100) * 100;
    const performancePercentage = (desempenho / 100) * 100;

    // Atualiza os valores das porcentagens nos elementos HTML correspondentes
    document.getElementById('temp-percentage').innerText = `${tempPercentage}%`;
    document.getElementById('humidity-percentage').innerText = `${humidityPercentage}%`;
    document.getElementById('performance-percentage').innerText = `${performancePercentage}%`;

    // Atualiza o valor da propriedade stroke-dashoffset do círculo SVG
    const tempCircle = document.querySelector('.expenses svg circle');
    tempCircle.style.strokeDashoffset = (120 - (tempPercentage * 110) / 100);

    const humidityCircle = document.querySelector('.sales svg circle');
    humidityCircle.style.strokeDashoffset = (110 - (humidityPercentage * 110) / 100);

    const performanceCircle = document.querySelector('.income svg circle');
    performanceCircle.style.strokeDashoffset = (110 - (performancePercentage * 100) / 100);
});
