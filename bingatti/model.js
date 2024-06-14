function gerarNumerosAleatorios(qtd, min, max) {
	let numeros = new Set();
	while (numeros.size < qtd) {
		let num = Math.floor(Math.random() * (max - min + 1)) + min;
		numeros.add(num);
	}
	return Array.from(numeros);
}

function gerarCartela() {
	let cartela = {
		'B': gerarNumerosAleatorios(5, 1, 15),
		'I': gerarNumerosAleatorios(5, 16, 30),
		'N': gerarNumerosAleatorios(4, 31, 45),
		'G': gerarNumerosAleatorios(5, 46, 60),
		'O': gerarNumerosAleatorios(5, 61, 75)
	};
	return cartela;
}

function verificarNumeroNaCartela(numero, cartela) {
	for (let coluna in cartela) {
		if (cartela[coluna].includes(numero)) {
			return true;
		}
	}
	return false;
}

function verificarCartelaCompleta(cartela, numerosSorteados) {
	for (let coluna in cartela) {
		if (cartela[coluna].some(numero => !numerosSorteados.has(numero))) {
			return false;
		}
	}
	return true;
}

module.exports = {
	gerarCartela,
	verificarNumeroNaCartela,
	verificarCartelaCompleta
};
