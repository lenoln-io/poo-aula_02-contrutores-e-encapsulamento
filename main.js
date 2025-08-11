// Global variables
let currentSlide = 0;
let currentSlideIndex = 0;
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let currentQuizQuestion = 0;
let quizAnswers = [];
let selectedAnswer = null;
let currentBankAccount = null;

// Quiz questions
const quizQuestions = [
	{
		question: "Qual é a principal função de um construtor?",
		options: [
			"A) Destruir objetos da memória",
			"B) Inicializar os atributos de um objeto",
			"C) Criar métodos estáticos",
			"D) Definir herança entre classes",
		],
		correct: 1,
	},
	{
		question: "Qual modificador de acesso oferece maior proteção?",
		options: ["A) public", "B) protected", "C) private", "D) default"],
		correct: 2,
	},
	{
		question: "O que é sobrecarga de construtores?",
		options: [
			"A) Ter múltiplos construtores com diferentes parâmetros",
			"B) Usar herança para criar construtores",
			"C) Chamar construtores de outras classes",
			"D) Criar construtores estáticos",
		],
		correct: 0,
	},
	{
		question: "Para que servem os métodos getter?",
		options: [
			"A) Modificar atributos privados",
			"B) Acessar atributos privados de forma controlada",
			"C) Criar novos objetos",
			"D) Validar dados de entrada",
		],
		correct: 1,
	},
	{
		question:
			"Qual palavra-chave é usada para chamar outro construtor da mesma classe?",
		options: ["A) super()", "B) new()", "C) this()", "D) call()"],
		correct: 2,
	},
];

// Slide navigation functions
function initializeSlides() {
	showSlide(0);
}

function showSlide(index) {
	slides.forEach((slide, i) => {
		slide.style.display = i === index ? "block" : "none";
		if (i === index) {
			slide.classList.add("slide-enter");
		}
	});

	updateSlidePosition();
	updateSlideIndicators();
	updateSlideCounter();
	updateProgress();
}

function changeSlide(direction) {
	const newIndex = currentSlideIndex + direction;
	if (newIndex >= 0 && newIndex < totalSlides) {
		currentSlideIndex = newIndex;
		showSlide(currentSlideIndex);
	}
}

function goToSlide(slideIndex) {
	if (slideIndex >= 0 && slideIndex < totalSlides) {
		currentSlideIndex = slideIndex;
		showSlide(currentSlideIndex);
		updateSlidePosition();
		updateSlideIndicators();
		updateSlideCounter();
		updateProgress();
	}
}

function updateSlidePosition() {
	/*const container = document.getElementById("slideContainer");
	const translateX = -currentSlide * (100 / totalSlides); // 16.67% per slide (100% / total slides)
	container.style.transform = `translateX(${translateX}%)`;
	console.log(currentSlide);
	// Update navigation buttons*/
	document.getElementById("prevBtn").disabled = currentSlideIndex === 0;
	document.getElementById("nextBtn").style.display =
		currentSlide === totalSlides - 1 ? "none" : "flex";
}

function updateSlideIndicators() {
	const indicators = document.querySelectorAll(".slide-indicator");

	indicators.forEach((indicator, index) => {
		if (index === currentSlideIndex) {
			indicator.classList.remove("bg-sage-300");
			indicator.classList.add("bg-sage-600");
		} else {
			indicator.classList.remove("bg-sage-600");
			indicator.classList.add("bg-sage-300");
		}
	});
}

function updateSlideCounter() {
	document.getElementById("currentSlideNumber").textContent =
		currentSlideIndex + 1;
	document.getElementById("totalSlides").textContent = totalSlides;
}

function updateProgress() {
	const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
	document.getElementById("globalProgress").style.width = `${progress}%`;
}

// Keyboard navigation
document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowRight") {
		event.preventDefault();
		changeSlide(1);
	} else if (event.key === "ArrowLeft") {
		event.preventDefault();
		changeSlide(-1);
	} else if (event.key >= "1" && event.key <= totalSlides) {
		event.preventDefault();
		goToSlide(parseInt(event.key) - 1);
	}
});

// Constructor demonstration
function demonstrateConstructor(type) {
	const output = document.getElementById("constructorDemo");

	switch (type) {
		case "default":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-sage-800 mb-2">✅ Construtor Padrão</div>
                            <div class="bg-sage-100 p-3 rounded-lg mb-3 code-block text-sm">
                                <code>Pessoa p1 = new Pessoa();</code>
                            </div>
                            <div class="text-sage-700 space-y-1">
                                <div>• Nome: "Não informado"</div>
                                <div>• Idade: 0</div>
                            </div>
                        </div>
                    `;
			break;
		case "parameterized":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-sage-800 mb-2">✅ Construtor Parametrizado</div>
                            <div class="bg-sage-100 p-3 rounded-lg mb-3 code-block text-sm">
                                <code>Pessoa p2 = new Pessoa("João", 25);</code>
                            </div>
                            <div class="text-sage-700 space-y-1">
                                <div>• Nome: "João"</div>
                                <div>• Idade: 25</div>
                            </div>
                        </div>
                    `;
			break;
		case "overloaded":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-sage-800 mb-2">✅ Sobrecarga de Construtores</div>
                            <div class="bg-sage-100 p-3 rounded-lg mb-3 code-block text-sm space-y-1">
                                <div><code>Pessoa p1 = new Pessoa();</code></div>
                                <div><code>Pessoa p2 = new Pessoa("Maria");</code></div>
                                <div><code>Pessoa p3 = new Pessoa("João", 30);</code></div>
                            </div>
                            <div class="text-sage-700">
                                <div class="font-semibold">Múltiplas formas de criar objetos! 🎯</div>
                            </div>
                        </div>
                    `;
			break;
	}
}

// Validation testing
function testValidation(type) {
	const output = document.getElementById("validationResult");

	if (type === "valid") {
		output.innerHTML = `
                    <div class="text-left animate-slide-up">
                        <div class="font-semibold text-green-800 mb-2">✅ Dados Válidos</div>
                        <div class="bg-green-100 p-3 rounded-lg mb-3 code-block text-sm space-y-1">
                            <div><code>conta.setTitular("João Silva");</code></div>
                            <div><code>conta.setSaldo(1000.0);</code></div>
                        </div>
                        <div class="text-green-700 font-semibold">
                            Sucesso! Dados armazenados corretamente. ✨
                        </div>
                    </div>
                `;
	} else {
		output.innerHTML = `
                    <div class="text-left animate-slide-up">
                        <div class="font-semibold text-red-800 mb-2">❌ Dados Inválidos</div>
                        <div class="bg-red-100 p-3 rounded-lg mb-3 code-block text-sm space-y-1">
                            <div><code>conta.setTitular("");</code></div>
                            <div><code>conta.setSaldo(-500.0);</code></div>
                        </div>
                        <div class="text-red-700">
                            <div class="font-semibold mb-1">Erro: IllegalArgumentException!</div>
                            <div class="text-sm space-y-1">
                                <div>• Titular não pode ser vazio</div>
                                <div>• Saldo não pode ser negativo</div>
                            </div>
                        </div>
                    </div>
                `;
	}
}

// Product creation
function createProduct(type) {
	const output = document.getElementById("productDemo");

	switch (type) {
		case "default":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-sage-800 mb-2">🛍️ Produto Padrão</div>
                            <div class="bg-sage-100 p-3 rounded-lg mb-3 code-block text-sm">
                                <code>Produto p1 = new Produto();</code>
                            </div>
                            <div class="text-sage-700 space-y-1">
                                <div>• Nome: "Sem nome"</div>
                                <div>• Preço: R$ 0,00</div>
                                <div>• Quantidade: 0</div>
                                <div>• Categoria: "Geral"</div>
                            </div>
                        </div>
                    `;
			break;
		case "basic":
			const codigo1 = "PRD" + Math.floor(Math.random() * 10000);
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-sage-800 mb-2">🛍️ Produto Básico</div>
                            <div class="bg-sage-100 p-3 rounded-lg mb-3 code-block text-sm">
                                <code>Produto p2 = new Produto("Notebook", 2500.00);</code>
                            </div>
                            <div class="text-sage-700 space-y-1">
                                <div>• Nome: "Notebook"</div>
                                <div>• Preço: R$ 2.500,00</div>
                                <div>• Quantidade: 0</div>
                                <div>• Categoria: "Geral"</div>
                                <div>• Código: ${codigo1}</div>
                            </div>
                        </div>
                    `;
			break;
		case "complete":
			const codigo2 = "PRD" + Math.floor(Math.random() * 10000);
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-sage-800 mb-2">🛍️ Produto Completo</div>
                            <div class="bg-sage-100 p-3 rounded-lg mb-3 code-block text-sm">
                                <code>Produto p3 = new Produto("Mouse", 45.90, 50, "Informática");</code>
                            </div>
                            <div class="text-sage-700 space-y-1">
                                <div>• Nome: "Mouse"</div>
                                <div>• Preço: R$ 45,90</div>
                                <div>• Quantidade: 50</div>
                                <div>• Categoria: "Informática"</div>
                                <div>• Código: ${codigo2}</div>
                                <div class="font-semibold text-green-700">• Valor Total: R$ 2.295,00</div>
                            </div>
                        </div>
                    `;
			break;
	}
}

// Quiz functions
function selectAnswer(index) {
	selectedAnswer = index;

	// Reset all buttons
	document.querySelectorAll(".answer-btn").forEach((btn) => {
		btn.classList.remove("bg-sage-200", "border-sage-400");
	});

	// Highlight selected
	document
		.querySelectorAll(".answer-btn")
		[index].classList.add("bg-sage-200", "border-sage-400");

	// Enable next button
	document.getElementById("nextQuizBtn").disabled = false;
}

function nextQuestion() {
	if (selectedAnswer !== null) {
		quizAnswers[currentQuizQuestion] = selectedAnswer;
		currentQuizQuestion++;

		if (currentQuizQuestion < quizQuestions.length) {
			loadQuestion();
		} else {
			showQuizResults();
		}

		selectedAnswer = null;
	}
}

function previousQuestion() {
	if (currentQuizQuestion > 0) {
		currentQuizQuestion--;
		loadQuestion();
		selectedAnswer = quizAnswers[currentQuizQuestion] || null;

		if (selectedAnswer !== null) {
			document
				.querySelectorAll(".answer-btn")
				[selectedAnswer].classList.add("bg-sage-200", "border-sage-400");
			document.getElementById("nextQuizBtn").disabled = false;
		}
	}
}

function loadQuestion() {
	const question = quizQuestions[currentQuizQuestion];

	document.getElementById("currentQuestion").textContent =
		currentQuizQuestion + 1;
	document.getElementById("questionText").textContent = question.question;

	const answersContainer = document.getElementById("answersContainer");
	answersContainer.innerHTML = "";

	question.options.forEach((option, index) => {
		const button = document.createElement("button");
		button.className =
			"answer-btn w-full text-left p-4 rounded-lg border border-sage-200 hover:bg-sage-50 transition-all duration-300";
		button.textContent = option;
		button.onclick = () => selectAnswer(index);
		answersContainer.appendChild(button);
	});

	// Update progress
	const progress = ((currentQuizQuestion + 1) / quizQuestions.length) * 100;
	document.getElementById("quizProgress").style.width = progress + "%";

	// Update buttons
	document.getElementById("prevQuizBtn").disabled = currentQuizQuestion === 0;
	document.getElementById("nextQuizBtn").disabled = true;
	document.getElementById("nextQuizBtn").textContent =
		currentQuizQuestion === quizQuestions.length - 1
			? "Finalizar"
			: "Próxima →";
}

function showQuizResults() {
	let score = 0;
	quizAnswers.forEach((answer, index) => {
		if (answer === quizQuestions[index].correct) {
			score++;
		}
	});

	document.getElementById("quizContainer").classList.add("hidden");
	document.getElementById("quizResults").classList.remove("hidden");
	document.getElementById("finalScore").textContent = score;

	let message = "";
	if (score === 5) message = "Perfeito! Você domina o assunto! 🏆";
	else if (score >= 4) message = "Excelente trabalho! 🎉";
	else if (score >= 3) message = "Bom trabalho! Continue estudando! 👍";
	else message = "Continue praticando! Você vai conseguir! 💪";

	document.getElementById("scoreMessage").textContent = message;
}

function restartQuiz() {
	currentQuizQuestion = 0;
	quizAnswers = [];
	selectedAnswer = null;

	document.getElementById("quizContainer").classList.remove("hidden");
	document.getElementById("quizResults").classList.add("hidden");

	loadQuestion();
}

// Bank Account Activity Functions
function showBankAccountActivity() {
	const activity = document.getElementById("bankAccountActivity");
	activity.classList.toggle("hidden");
}

// Bank Account Simulator
function createBankAccount(type) {
	const output = document.getElementById("bankAccountDemo");
	const operations = document.getElementById("bankOperations");

	switch (type) {
		case "default":
			currentBankAccount = {
				numero: generateAccountNumber(),
				titular: "TITULAR NÃO INFORMADO",
				saldo: 0.0,
				tipoConta: "Corrente",
				ativa: true,
				historico: [],
			};
			break;
		case "basic":
			currentBankAccount = {
				numero: generateAccountNumber(),
				titular: "MARIA SILVA",
				saldo: 0.0,
				tipoConta: "Corrente",
				ativa: true,
				historico: [],
			};
			break;
		case "withBalance":
			currentBankAccount = {
				numero: generateAccountNumber(),
				titular: "JOÃO SANTOS",
				saldo: 1500.0,
				tipoConta: "Corrente",
				ativa: true,
				historico: [
					{
						tipo: "Depósito Inicial",
						valor: 1500.0,
						data: new Date().toLocaleDateString(),
					},
				],
			};
			break;
		case "complete":
			currentBankAccount = {
				numero: generateAccountNumber(),
				titular: "ANA COSTA",
				saldo: 2500.0,
				tipoConta: "Poupança",
				ativa: true,
				historico: [
					{
						tipo: "Depósito Inicial",
						valor: 2500.0,
						data: new Date().toLocaleDateString(),
					},
				],
			};
			break;
	}

	displayBankAccount();
	operations.classList.remove("hidden");
}

function displayBankAccount() {
	const output = document.getElementById("bankAccountDemo");
	const account = currentBankAccount;

	const statusColor = account.ativa ? "text-green-700" : "text-red-700";
	const statusIcon = account.ativa ? "✅" : "❌";
	const statusText = account.ativa ? "Ativa" : "Inativa";

	output.innerHTML = `
                <div class="text-left animate-slide-up">
                    <div class="flex justify-between items-start mb-4">
                        <div>
                            <div class="font-bold text-sage-800 text-lg mb-1">🏦 Conta Bancária</div>
                            <div class="text-sm text-sage-600">Número: ${account.numero}</div>
                        </div>
                        <div class="text-right">
                            <div class="${statusColor} font-semibold">${statusIcon} ${statusText}</div>
                            <div class="text-sm text-sage-600">${account.tipoConta}</div>
                        </div>
                    </div>
                    
                    <div class="bg-sage-50 rounded-lg p-4 mb-4">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <div class="text-sm text-sage-600">Titular</div>
                                <div class="font-semibold text-sage-800">${account.titular}</div>
                            </div>
                            <div>
                                <div class="text-sm text-sage-600">Saldo Atual</div>
                                <div class="font-bold text-2xl text-sage-800">R$ ${account.saldo.toFixed(2).replace(".", ",")}</div>
                            </div>
                        </div>
                    </div>
                    
                    ${
											account.historico.length > 0
												? `
                        <div class="text-sm">
                            <div class="font-semibold text-sage-700 mb-2">Últimas Transações:</div>
                            <div class="space-y-1 max-h-20 overflow-y-auto">
                                ${account.historico
																	.slice(-3)
																	.map(
																		(h) => `
                                    <div class="flex justify-between text-xs">
                                        <span>${h.tipo}</span>
                                        <span class="font-semibold">R$ ${h.valor.toFixed(2).replace(".", ",")}</span>
                                    </div>
                                `,
																	)
																	.join("")}
                            </div>
                        </div>
                    `
												: ""
										}
                </div>
            `;
}

function performOperation(operation) {
	if (!currentBankAccount) {
		alert("Primeiro crie uma conta bancária!");
		return;
	}

	const valueInput = document.getElementById("operationValue");
	const valor = parseFloat(valueInput.value) || 0;

	switch (operation) {
		case "deposit":
			if (valor <= 0) {
				alert("Valor deve ser positivo!");
				return;
			}
			if (!currentBankAccount.ativa) {
				alert("Conta inativa! Não é possível depositar.");
				return;
			}
			currentBankAccount.saldo += valor;
			currentBankAccount.historico.push({
				tipo: "Depósito",
				valor: valor,
				data: new Date().toLocaleDateString(),
			});
			alert(
				`Depósito de R$ ${valor.toFixed(2).replace(".", ",")} realizado com sucesso!`,
			);
			break;

		case "withdraw":
			if (valor <= 0) {
				alert("Valor deve ser positivo!");
				return;
			}
			if (!currentBankAccount.ativa) {
				alert("Conta inativa! Não é possível sacar.");
				return;
			}
			if (valor > currentBankAccount.saldo) {
				alert(
					`Saldo insuficiente! Saldo atual: R$ ${currentBankAccount.saldo.toFixed(2).replace(".", ",")}`,
				);
				return;
			}
			currentBankAccount.saldo -= valor;
			currentBankAccount.historico.push({
				tipo: "Saque",
				valor: -valor,
				data: new Date().toLocaleDateString(),
			});
			alert(
				`Saque de R$ ${valor.toFixed(2).replace(".", ",")} realizado com sucesso!`,
			);
			break;

		case "activate":
			currentBankAccount.ativa = true;
			alert("Conta ativada com sucesso!");
			break;

		case "deactivate":
			currentBankAccount.ativa = false;
			alert("Conta desativada!");
			break;

		case "statement":
			showStatement();
			return;
	}

	valueInput.value = "";
	displayBankAccount();
}

function showStatement() {
	const account = currentBankAccount;
	let statement = `=== EXTRATO BANCÁRIO ===\n`;
	statement += `Conta: ${account.numero}\n`;
	statement += `Titular: ${account.titular}\n`;
	statement += `Tipo: ${account.tipoConta}\n`;
	statement += `Status: ${account.ativa ? "Ativa" : "Inativa"}\n\n`;
	statement += `=== TRANSAÇÕES ===\n`;

	if (account.historico.length === 0) {
		statement += `Nenhuma transação realizada.\n`;
	} else {
		account.historico.forEach((transacao, index) => {
			const sinal = transacao.valor >= 0 ? "+" : "";
			statement += `${index + 1}. ${transacao.tipo} - ${sinal}R$ ${Math.abs(transacao.valor).toFixed(2).replace(".", ",")} (${transacao.data})\n`;
		});
	}

	statement += `\n=== SALDO ATUAL ===\n`;
	statement += `R$ ${account.saldo.toFixed(2).replace(".", ",")}\n`;

	alert(statement);
}

function generateAccountNumber() {
	return (
		String(Math.floor(Math.random() * 1000000)).padStart(6, "0") +
		"-" +
		Math.floor(Math.random() * 10)
	);
}

// Practical Exercises Functions
function showPracticalExercises() {
	const exercises = document.getElementById("practicalExercises");
	exercises.classList.toggle("hidden");
}

function showSupportMaterial() {
	const material = document.getElementById("supportMaterial");
	material.classList.toggle("hidden");
}

function demonstrateExercise(type) {
	const output = document.getElementById("exerciseDemo");

	switch (type) {
		case "aluno":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-blue-800 mb-4 text-lg">🎓 Classe Aluno - Demonstração</div>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div class="bg-blue-100 p-4 rounded-lg mb-4 code-block text-sm">
                                        <div class="font-semibold mb-2">Construtor Completo:</div>
                                        <code>Aluno a1 = new Aluno("João Silva", "2024001", 8.5, 7.0, 9.2);</code>
                                    </div>
                                    <div class="space-y-2 text-sm">
                                        <div><strong>Nome:</strong> JOÃO SILVA</div>
                                        <div><strong>Matrícula:</strong> 2024001</div>
                                        <div><strong>Notas:</strong> 8.5, 7.0, 9.2</div>
                                        <div><strong>Média:</strong> 8.23</div>
                                        <div class="text-green-700 font-semibold">✅ Situação: APROVADO</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="bg-red-100 p-4 rounded-lg mb-4">
                                        <div class="font-semibold text-red-800 mb-2">Validações:</div>
                                        <ul class="text-sm text-red-700 space-y-1">
                                            <li>• Nome deve ter pelo menos 3 caracteres</li>
                                            <li>• Matrícula deve ser única</li>
                                            <li>• Notas devem estar entre 0 e 10</li>
                                            <li>• Média ≥ 7.0 = Aprovado</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "funcionario":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-green-800 mb-4 text-lg">💼 Classe Funcionario - Demonstração</div>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div class="bg-green-100 p-4 rounded-lg mb-4 code-block text-sm">
                                        <div class="font-semibold mb-2">Construtor Completo:</div>
                                        <code>Funcionario f1 = new Funcionario("Maria Santos", "123.456.789-00", 5500.00, "Analista", "01/01/2020");</code>
                                    </div>
                                    <div class="space-y-2 text-sm">
                                        <div><strong>Nome:</strong> MARIA SANTOS</div>
                                        <div><strong>CPF:</strong> 123.456.789-00</div>
                                        <div><strong>Salário:</strong> R$ 5.500,00</div>
                                        <div><strong>Cargo:</strong> Analista</div>
                                        <div><strong>Tempo de Empresa:</strong> 4 anos</div>
                                        <div class="text-green-700 font-semibold">💰 Após aumento 10%: R$ 6.050,00</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="bg-yellow-100 p-4 rounded-lg mb-4">
                                        <div class="font-semibold text-yellow-800 mb-2">Validações:</div>
                                        <ul class="text-sm text-yellow-700 space-y-1">
                                            <li>• CPF deve ter formato válido</li>
                                            <li>• Salário deve ser positivo</li>
                                            <li>• Nome não pode ser vazio</li>
                                            <li>• Data de admissão válida</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "validacao":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-purple-800 mb-4 text-lg">⚡ Sistema de Validação - Teste</div>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div class="bg-green-100 p-4 rounded-lg mb-4">
                                        <div class="font-semibold text-green-800 mb-2">✅ Dados Válidos:</div>
                                        <div class="text-sm text-green-700 space-y-1">
                                            <div>• Aluno("Ana", "2024002", 8.0, 9.0, 7.5)</div>
                                            <div>• Funcionario("Pedro", "987.654.321-00", 3000.00)</div>
                                            <div>• ContaBancaria("Carlos", 1500.00, "Poupança")</div>
                                        </div>
                                        <div class="mt-2 text-green-800 font-semibold">Resultado: Todos criados com sucesso! 🎉</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="bg-red-100 p-4 rounded-lg mb-4">
                                        <div class="font-semibold text-red-800 mb-2">❌ Dados Inválidos:</div>
                                        <div class="text-sm text-red-700 space-y-1">
                                            <div>• Aluno("", "2024003", 11.0, -2.0, 8.0)</div>
                                            <div>• Funcionario("José", "123", -1000.00)</div>
                                            <div>• ContaBancaria("", -500.00, "Investimento")</div>
                                        </div>
                                        <div class="mt-2 text-red-800 font-semibold">Resultado: IllegalArgumentException! 🚫</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "veiculo":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-orange-800 mb-4 text-lg">🚙 Classe Veiculo - Demonstração</div>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div class="bg-orange-100 p-4 rounded-lg mb-4 code-block text-sm">
                                        <div class="font-semibold mb-2">Construtor Completo:</div>
                                        <code>Veiculo v1 = new Veiculo("Toyota", "Corolla", 2020, "Prata", 85000.00, 45000);</code>
                                    </div>
                                    <div class="space-y-2 text-sm">
                                        <div><strong>Marca:</strong> Toyota</div>
                                        <div><strong>Modelo:</strong> Corolla</div>
                                        <div><strong>Ano:</strong> 2020</div>
                                        <div><strong>Cor:</strong> Prata</div>
                                        <div><strong>Preço Original:</strong> R$ 85.000,00</div>
                                        <div><strong>Quilometragem:</strong> 45.000 km</div>
                                        <div class="text-orange-700 font-semibold">📉 Valor Atual: R$ 68.000,00 (20% depreciação)</div>
                                        <div class="text-red-700 font-semibold">🔧 Revisão necessária em 5.000 km</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="bg-blue-100 p-4 rounded-lg mb-4">
                                        <div class="font-semibold text-blue-800 mb-2">Funcionalidades:</div>
                                        <ul class="text-sm text-blue-700 space-y-1">
                                            <li>• Cálculo de depreciação por ano</li>
                                            <li>• Verificação de revisão (a cada 10.000 km)</li>
                                            <li>• Validação de ano (1900-2024)</li>
                                            <li>• Preço e quilometragem positivos</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "livro":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-teal-800 mb-4 text-lg">📖 Classe Livro - Demonstração</div>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div>
                                    <div class="bg-teal-100 p-4 rounded-lg mb-4 code-block text-sm">
                                        <div class="font-semibold mb-2">Construtor Completo:</div>
                                        <code>Livro l1 = new Livro("978-85-7522-123-4", "Clean Code", "Robert Martin", "Alta Books", 2009, 464);</code>
                                    </div>
                                    <div class="space-y-2 text-sm">
                                        <div><strong>ISBN:</strong> 978-85-7522-123-4</div>
                                        <div><strong>Título:</strong> Clean Code</div>
                                        <div><strong>Autor:</strong> Robert Martin</div>
                                        <div><strong>Editora:</strong> Alta Books</div>
                                        <div><strong>Ano:</strong> 2009</div>
                                        <div><strong>Páginas:</strong> 464</div>
                                        <div class="text-teal-700 font-semibold">📅 Idade: 15 anos</div>
                                        <div class="text-green-700 font-semibold">✅ Status: Disponível</div>
                                    </div>
                                </div>
                                <div>
                                    <div class="bg-purple-100 p-4 rounded-lg mb-4">
                                        <div class="font-semibold text-purple-800 mb-2">Validações:</div>
                                        <ul class="text-sm text-purple-700 space-y-1">
                                            <li>• ISBN deve ter formato válido</li>
                                            <li>• Ano entre 1450 e ano atual</li>
                                            <li>• Número de páginas positivo</li>
                                            <li>• Título e autor não vazios</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "integrado":
			output.innerHTML = `
                        <div class="text-left animate-slide-up">
                            <div class="font-semibold text-red-800 mb-4 text-lg">🏢 Sistema Integrado - Folha de Pagamento</div>
                            <div class="space-y-4">
                                <div class="bg-red-100 p-4 rounded-lg">
                                    <div class="font-semibold text-red-800 mb-2">Simulação do Sistema:</div>
                                    <div class="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <div class="font-semibold mb-2">👨‍💼 Funcionário:</div>
                                            <div>• Nome: CARLOS SILVA</div>
                                            <div>• CPF: 111.222.333-44</div>
                                            <div>• Cargo: Desenvolvedor</div>
                                            <div>• Salário: R$ 6.000,00</div>
                                        </div>
                                        <div>
                                            <div class="font-semibold mb-2">🏦 Conta Bancária:</div>
                                            <div>• Número: 123456-7</div>
                                            <div>• Titular: CARLOS SILVA</div>
                                            <div>• Tipo: Corrente</div>
                                            <div>• Saldo: R$ 2.500,00</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-green-100 p-4 rounded-lg">
                                    <div class="font-semibold text-green-800 mb-2">💰 Processamento do Pagamento:</div>
                                    <div class="text-sm text-green-700 space-y-1">
                                        <div>1. Validação dos dados do funcionário ✅</div>
                                        <div>2. Verificação da conta bancária ✅</div>
                                        <div>3. Depósito do salário: R$ 6.000,00 ✅</div>
                                        <div>4. Novo saldo: R$ 8.500,00 ✅</div>
                                        <div class="font-semibold mt-2">Pagamento processado com sucesso! 🎉</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;
	}
}

// Assignment Functions
function showExerciseDetails(type) {
	const details = document.getElementById("exerciseDetails");
	const content = document.getElementById("exerciseContent");

	let exerciseContent = "";

	switch (type) {
		case "funcionarios":
			exerciseContent = `
                        <div class="text-left animate-slide-up">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-2xl font-bold text-blue-800">👨‍💼 Sistema de Funcionários - Detalhes</h3>
                                <button onclick="hideExerciseDetails()" class="text-sage-500 hover:text-sage-700">✕</button>
                            </div>
                            
                            <div class="grid lg:grid-cols-2 gap-8">
                                <div class="space-y-6">
                                    <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                        <h4 class="font-semibold text-blue-800 mb-4">Estrutura das Classes:</h4>
                                        <div class="bg-blue-900 rounded-lg p-4 text-blue-100 code-block text-sm">
                                            <pre>public class Funcionario {
    private String nome;
    private String cpf;
    private double salario;
    private String cargo;
    private LocalDate dataAdmissao;
    
    // Construtores
    // Getters e Setters com validação
    // Métodos de negócio
}

public class Empresa {
    private String nome;
    private List&lt;Funcionario&gt; funcionarios;
    
    // Métodos de gerenciamento
}</pre>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                                        <h4 class="font-semibold text-green-800 mb-4">Validações Obrigatórias:</h4>
                                        <ul class="text-sm text-green-700 space-y-2">
                                            <li>• CPF: formato XXX.XXX.XXX-XX</li>
                                            <li>• Salário: valor positivo</li>
                                            <li>• Nome: não vazio, mínimo 3 caracteres</li>
                                            <li>• Data admissão: não futura</li>
                                            <li>• Cargo: não vazio</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="space-y-6">
                                    <div class="bg-purple-50 rounded-lg p-6 border border-purple-200">
                                        <h4 class="font-semibold text-purple-800 mb-4">Métodos Obrigatórios:</h4>
                                        <ul class="text-sm text-purple-700 space-y-2">
                                            <li><strong>calcularTempoEmpresa():</strong> retorna anos/meses</li>
                                            <li><strong>aplicarAumento(percentual):</strong> aumenta salário</li>
                                            <li><strong>calcularSalarioAnual():</strong> salário * 12</li>
                                            <li><strong>contratar(funcionario):</strong> adiciona à lista</li>
                                            <li><strong>demitir(cpf):</strong> remove da lista</li>
                                            <li><strong>listarPorCargo(cargo):</strong> filtra funcionários</li>
                                            <li><strong>calcularFolhaSalarial():</strong> soma todos salários</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-amber-50 rounded-lg p-6 border border-amber-200">
                                        <h4 class="font-semibold text-amber-800 mb-4">Exemplo de Uso:</h4>
                                        <div class="bg-amber-900 rounded-lg p-4 text-amber-100 code-block text-sm">
                                            <pre>Empresa empresa = new Empresa("TechCorp");
Funcionario f1 = new Funcionario(
    "João Silva", 
    "123.456.789-00", 
    5000.0, 
    "Desenvolvedor", 
    LocalDate.of(2020, 1, 15)
);

empresa.contratar(f1);
f1.aplicarAumento(10.0); // 10% de aumento
System.out.println(f1.calcularTempoEmpresa());</pre>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "bancario":
			exerciseContent = `
                        <div class="text-left animate-slide-up">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-2xl font-bold text-green-800">🏦 Sistema Bancário - Detalhes</h3>
                                <button onclick="hideExerciseDetails()" class="text-sage-500 hover:text-sage-700">✕</button>
                            </div>
                            
                            <div class="grid lg:grid-cols-2 gap-8">
                                <div class="space-y-6">
                                    <div class="bg-green-50 rounded-lg p-6 border border-green-200">
                                        <h4 class="font-semibold text-green-800 mb-4">Funcionalidades Principais:</h4>
                                        <ul class="text-sm text-green-700 space-y-2">
                                            <li>• <strong>Depositar:</strong> adicionar valor ao saldo</li>
                                            <li>• <strong>Sacar:</strong> retirar valor (verificar saldo)</li>
                                            <li>• <strong>Transferir:</strong> entre contas do mesmo banco</li>
                                            <li>• <strong>Consultar Saldo:</strong> exibir saldo atual</li>
                                            <li>• <strong>Extrato:</strong> histórico de transações</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                        <h4 class="font-semibold text-blue-800 mb-4">Tipos de Conta:</h4>
                                        <ul class="text-sm text-blue-700 space-y-2">
                                            <li>• <strong>Corrente:</strong> sem limite de saques</li>
                                            <li>• <strong>Poupança:</strong> rendimento mensal</li>
                                            <li>• <strong>Salário:</strong> limitações específicas</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="space-y-6">
                                    <div class="bg-red-50 rounded-lg p-6 border border-red-200">
                                        <h4 class="font-semibold text-red-800 mb-4">Validações Críticas:</h4>
                                        <ul class="text-sm text-red-700 space-y-2">
                                            <li>• Saldo nunca negativo</li>
                                            <li>• Valores de transação positivos</li>
                                            <li>• Conta de destino válida para transferências</li>
                                            <li>• Titular não vazio</li>
                                            <li>• Número da conta único</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-purple-50 rounded-lg p-6 border border-purple-200">
                                        <h4 class="font-semibold text-purple-800 mb-4">Relatórios do Banco:</h4>
                                        <ul class="text-sm text-purple-700 space-y-2">
                                            <li>• Total de contas por tipo</li>
                                            <li>• Saldo total do banco</li>
                                            <li>• Contas com maior movimento</li>
                                            <li>• Estatísticas de transações</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "loja":
			exerciseContent = `
                        <div class="text-left animate-slide-up">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-2xl font-bold text-purple-800">🛒 Loja Virtual - Detalhes</h3>
                                <button onclick="hideExerciseDetails()" class="text-sage-500 hover:text-sage-700">✕</button>
                            </div>
                            
                            <div class="grid lg:grid-cols-2 gap-8">
                                <div class="space-y-6">
                                    <div class="bg-purple-50 rounded-lg p-6 border border-purple-200">
                                        <h4 class="font-semibold text-purple-800 mb-4">Gestão de Produtos:</h4>
                                        <ul class="text-sm text-purple-700 space-y-2">
                                            <li>• Cadastro com código único</li>
                                            <li>• Controle de estoque automático</li>
                                            <li>• Categorização de produtos</li>
                                            <li>• Preços com validação</li>
                                            <li>• Busca por nome/categoria</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-orange-50 rounded-lg p-6 border border-orange-200">
                                        <h4 class="font-semibold text-orange-800 mb-4">Sistema de Pedidos:</h4>
                                        <ul class="text-sm text-orange-700 space-y-2">
                                            <li>• Carrinho de compras</li>
                                            <li>• Cálculo automático do total</li>
                                            <li>• Verificação de estoque</li>
                                            <li>• Histórico de pedidos</li>
                                            <li>• Status do pedido</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="space-y-6">
                                    <div class="bg-teal-50 rounded-lg p-6 border border-teal-200">
                                        <h4 class="font-semibold text-teal-800 mb-4">Gestão de Clientes:</h4>
                                        <ul class="text-sm text-teal-700 space-y-2">
                                            <li>• Cadastro completo</li>
                                            <li>• Validação de CPF e email</li>
                                            <li>• Endereço para entrega</li>
                                            <li>• Histórico de compras</li>
                                            <li>• Programa de fidelidade</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                                        <h4 class="font-semibold text-indigo-800 mb-4">Relatórios Gerenciais:</h4>
                                        <ul class="text-sm text-indigo-700 space-y-2">
                                            <li>• Produtos mais vendidos</li>
                                            <li>• Vendas por categoria</li>
                                            <li>• Faturamento mensal</li>
                                            <li>• Clientes mais ativos</li>
                                            <li>• Produtos em falta</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;

		case "escolar":
			exerciseContent = `
                        <div class="text-left animate-slide-up">
                            <div class="flex items-center justify-between mb-6">
                                <h3 class="text-2xl font-bold text-orange-800">🎓 Sistema Escolar - Detalhes</h3>
                                <button onclick="hideExerciseDetails()" class="text-sage-500 hover:text-sage-700">✕</button>
                            </div>
                            
                            <div class="grid lg:grid-cols-2 gap-8">
                                <div class="space-y-6">
                                    <div class="bg-orange-50 rounded-lg p-6 border border-orange-200">
                                        <h4 class="font-semibold text-orange-800 mb-4">Gestão Acadêmica:</h4>
                                        <ul class="text-sm text-orange-700 space-y-2">
                                            <li>• Matrícula de alunos</li>
                                            <li>• Cadastro de disciplinas</li>
                                            <li>• Lançamento de notas por bimestre</li>
                                            <li>• Cálculo automático de médias</li>
                                            <li>• Controle de frequência</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-cyan-50 rounded-lg p-6 border border-cyan-200">
                                        <h4 class="font-semibold text-cyan-800 mb-4">Sistema de Notas:</h4>
                                        <ul class="text-sm text-cyan-700 space-y-2">
                                            <li>• Notas de 0 a 10</li>
                                            <li>• 4 bimestres por ano</li>
                                            <li>• Média mínima: 7.0</li>
                                            <li>• Recuperação automática</li>
                                            <li>• Situação final do aluno</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <div class="space-y-6">
                                    <div class="bg-pink-50 rounded-lg p-6 border border-pink-200">
                                        <h4 class="font-semibold text-pink-800 mb-4">Relatórios Acadêmicos:</h4>
                                        <ul class="text-sm text-pink-700 space-y-2">
                                            <li>• Boletim individual do aluno</li>
                                            <li>• Estatísticas da turma</li>
                                            <li>• Ranking de notas</li>
                                            <li>• Alunos em recuperação</li>
                                            <li>• Desempenho por disciplina</li>
                                        </ul>
                                    </div>
                                    
                                    <div class="bg-lime-50 rounded-lg p-6 border border-lime-200">
                                        <h4 class="font-semibold text-lime-800 mb-4">Validações Acadêmicas:</h4>
                                        <ul class="text-sm text-lime-700 space-y-2">
                                            <li>• Matrícula única por aluno</li>
                                            <li>• Notas entre 0 e 10</li>
                                            <li>• Carga horária mínima</li>
                                            <li>• Professor por disciplina</li>
                                            <li>• Semestre válido (1-8)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
			break;
	}

	content.innerHTML = exerciseContent;
	details.classList.remove("hidden");
}

function hideExerciseDetails() {
	document.getElementById("exerciseDetails").classList.add("hidden");
}

function showProjectDetails(type) {
	const details = document.getElementById("projectDetails");
	const content = document.getElementById("projectContent");

	if (type === "biblioteca") {
		content.innerHTML = `
                    <div class="text-left animate-slide-up">
                        <div class="flex items-center justify-between mb-6">
                            <h3 class="text-2xl font-bold text-emerald-800">📚 Sistema de Biblioteca - Especificações Completas</h3>
                            <button onclick="hideProjectDetails()" class="text-sage-500 hover:text-sage-700">✕</button>
                        </div>
                        
                        <div class="grid lg:grid-cols-2 gap-8 mb-8">
                            <div class="space-y-6">
                                <div class="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
                                    <h4 class="font-semibold text-emerald-800 mb-4">Classes Principais:</h4>
                                    <div class="bg-emerald-900 rounded-lg p-4 text-emerald-100 code-block text-sm">
                                        <pre>public class Livro {
    private String isbn;
    private String titulo;
    private String autor;
    private String editora;
    private int anoPublicacao;
    private String categoria;
    private boolean disponivel;
}

public class Usuario {
    private String codigo;
    private String nome;
    private String email;
    private TipoUsuario tipo;
    private List&lt;Emprestimo&gt; historico;
}

public class Emprestimo {
    private Livro livro;
    private Usuario usuario;
    private LocalDate dataEmprestimo;
    private LocalDate dataDevolucao;
    private boolean devolvido;
}</pre>
                                    </div>
                                </div>
                                
                                <div class="bg-blue-50 rounded-lg p-6 border border-blue-200">
                                    <h4 class="font-semibold text-blue-800 mb-4">Funcionalidades Obrigatórias:</h4>
                                    <ul class="text-sm text-blue-700 space-y-2">
                                        <li>• <strong>Cadastro de Livros:</strong> ISBN único, validações completas</li>
                                        <li>• <strong>Cadastro de Usuários:</strong> diferentes tipos (aluno, professor, funcionário)</li>
                                        <li>• <strong>Empréstimos:</strong> controle de prazos e multas</li>
                                        <li>• <strong>Devoluções:</strong> atualização automática de status</li>
                                        <li>• <strong>Consultas:</strong> por título, autor, categoria, disponibilidade</li>
                                        <li>• <strong>Relatórios:</strong> livros mais emprestados, usuários ativos</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="space-y-6">
                                <div class="bg-purple-50 rounded-lg p-6 border border-purple-200">
                                    <h4 class="font-semibold text-purple-800 mb-4">Regras de Negócio:</h4>
                                    <ul class="text-sm text-purple-700 space-y-2">
                                        <li>• <strong>Prazo de Empréstimo:</strong> 15 dias para alunos, 30 para professores</li>
                                        <li>• <strong>Limite de Livros:</strong> 3 para alunos, 5 para professores</li>
                                        <li>• <strong>Multa por Atraso:</strong> R$ 1,00 por dia</li>
                                        <li>• <strong>Renovação:</strong> máximo 2 vezes se não há fila</li>
                                        <li>• <strong>Reserva:</strong> sistema de fila de espera</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-amber-50 rounded-lg p-6 border border-amber-200">
                                    <h4 class="font-semibold text-amber-800 mb-4">Interface do Sistema:</h4>
                                    <ul class="text-sm text-amber-700 space-y-2">
                                        <li>• Menu principal bem estruturado</li>
                                        <li>• Submenu para cada funcionalidade</li>
                                        <li>• Mensagens de erro claras</li>
                                        <li>• Confirmações para operações críticas</li>
                                        <li>• Formatação adequada de relatórios</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div class="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h4 class="font-semibold text-red-800 mb-4 flex items-center">
                                <span class="text-2xl mr-3">📋</span>
                                Entregáveis do Projeto
                            </h4>
                            <div class="grid md:grid-cols-3 gap-6">
                                <div>
                                    <h5 class="font-semibold text-red-700 mb-2">1. Código Fonte</h5>
                                    <ul class="text-sm text-red-600 space-y-1">
                                        <li>• Todas as classes implementadas</li>
                                        <li>• Código bem comentado</li>
                                        <li>• Validações funcionando</li>
                                        <li>• Interface completa</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 class="font-semibold text-red-700 mb-2">2. Documentação</h5>
                                    <ul class="text-sm text-red-600 space-y-1">
                                        <li>• Diagrama de classes</li>
                                        <li>• Manual do usuário</li>
                                        <li>• Casos de teste</li>
                                        <li>• Relatório de desenvolvimento</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 class="font-semibold text-red-700 mb-2">3. Apresentação</h5>
                                    <ul class="text-sm text-red-600 space-y-1">
                                        <li>• Demonstração ao vivo</li>
                                        <li>• Explicação do código</li>
                                        <li>• Defesa das escolhas técnicas</li>
                                        <li>• Tempo: 15 minutos</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
	}

	details.classList.remove("hidden");
}

function hideProjectDetails() {
	document.getElementById("projectDetails").classList.add("hidden");
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
	initializeSlides();
	updateSlidePosition();
	updateSlideIndicators();
	updateSlideCounter();
	updateProgress();
	loadQuestion();
});
