const bingattiModel = require('./model');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let cartelaJogador = null;
let numerosSorteados = new Set();

function imprimirCartela(cartela) {
	let cartelaFormatada = {
		'B': [],
		'I': [],
		'N': [],
		'G': [],
		'O': []
	};

	for (let coluna in cartela) {
		let linha = [];
		for (let i = 0; i < cartela[coluna].length; i++) {
			if (coluna === 'N' && i === 2) {
				linha.push('X');
			} else {
				linha.push(cartela[coluna][i]);
			}
		}
		cartelaFormatada[coluna] = linha;
	}

	console.log('  B   I   N   G   O');
	for (let i = 0; i < 5; i++) {
		let linha = `${cartelaFormatada['B'][i] || ' '}  ${cartelaFormatada['I'][i] || ' '}  ${cartelaFormatada['N'][i] || ' '}  ${cartelaFormatada['G'][i] || ' '}  ${cartelaFormatada['O'][i] || ' '}`;
		console.log(linha);
	}
}

function jogarBingo() {
	cartelaJogador = bingattiModel.gerarCartela();
	console.log('Sua cartela de bingo:');
	imprimirCartela(cartelaJogador);

	numerosSorteados.clear();
	let bingo = false;

	// Loop de sorteio
	while (!bingo && numerosSorteados.size < 75) {
		// Simular sorteio de um número
		let numeroSorteado = Math.floor(Math.random() * 75) + 1;
		if (!numerosSorteados.has(numeroSorteado)) {
			numerosSorteados.add(numeroSorteado);

			// Verificar se o número sorteado está na cartela do jogador
			if (bingattiModel.verificarNumeroNaCartela(numeroSorteado, cartelaJogador)) {
				console.log(`Número sorteado: ${numeroSorteado} (presente na sua cartela)`);
			} else {
				console.log(`Número sorteado: ${numeroSorteado}`);
			}

			bingo = bingattiModel.verificarCartelaCompleta(cartelaJogador, numerosSorteados);
		}
	}

	if (bingo) {
		console.log('Parabéns! Você completou sua cartela de bingo!');
	} else {
		console.log('Infelizmente não foi dessa vez. Tente novamente!');
	}

	rl.close();
}

rl.question('Pressione Enter para iniciar o jogo de bingo...', () => {
	console.log('Iniciando o jogo...');
	jogarBingo();
});

module.exports = {
	jogarBingo
};
