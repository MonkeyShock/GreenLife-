Promise.all([
    fetch('./Umidade.txt').then(response => response.text()),
    fetch('./Temperatura.txt').then(response => response.text()),
    fetch('./Desempenho.txt').then(response => response.text()),
    fetch('./Data.txt').then(response => response.text())
]).then(([umidadeData, temperaturaData, desempenhoData, dataAtualFormatada]) => {
    const umidadeLines = umidadeData.split('\n');
    const umidade = umidadeLines.slice(-1)[0].replace(/\D/g, ''); // pega o último valor e remove tudo que não for número
    console.log('Umidade:', umidade);
    document.querySelector('.income h1').textContent = umidade;

    const temperaturaLines = temperaturaData.split('\n');
    const temperatura = temperaturaLines.slice(-1)[0].replace(/\D/g, ''); // pega o último valor e remove tudo que não for número
    console.log('Temperatura:', temperatura);
    document.querySelector('.expenses h1').textContent = temperatura + '°C';

    const desempenhoLines = desempenhoData.split('\n');
    const desempenho = desempenhoLines.slice(-1)[0].replace(/\D/g, ''); // pega o último valor e remove tudo que não for número
    console.log('Desempenho:', desempenho);
    document.querySelector('.sales h1').textContent = desempenho + '%';

})

