let users = JSON.parse(localStorage.getItem('users') || '[]');
let alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
let turmas = JSON.parse(localStorage.getItem('turmas') || '[]');

function seedTurmas() {
  if (turmas.length === 0) {
    turmas = [
      { nome: "Boxe", modalidade: "Luta" },
      { nome: "Muay Thai", modalidade: "Luta" },
      { nome: "Jiu-Jitsu", modalidade: "Luta" },
      { nome: "CrossFit", modalidade: "Treinamento Funcional" },
      { nome: "Funcional", modalidade: "Treinamento Funcional" }
    ];
    localStorage.setItem('turmas', JSON.stringify(turmas));
  }
}

function seedAlunos() {
  if (alunos.length === 0) {
    alunos = [
      { nome: "Ana Souza", idade: 23, foto: "perfil1.png", turma: "Boxe" },
      { nome: "Carlos Silva", idade: 30, foto: "perfil2.png", turma: "CrossFit" },
      { nome: "Beatriz Lima", idade: 28, foto: "perfil3.png", turma: "Muay Thai" },
      { nome: "Lucas Costa", idade: 26, foto: "perfil4.png", turma: "Jiu-Jitsu" },
      { nome: "Mariana Dias", idade: 22, foto: "perfil5.png", turma: "Funcional" }
    ];
    localStorage.setItem('alunos', JSON.stringify(alunos));
  }
}

function login() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;

  if (!email || !password) {
    alert('Por favor, preencha email e senha!');
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    alert('Login realizado com sucesso!');
    // Aqui você pode redirecionar para a página principal ou dashboard, ex:
    // window.location.href = 'dashboard.html';
  } else {
    alert('Credenciais inválidas!');
  }
}

function register() {
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;

  if (!email || !password || !confirmPassword) {
    alert('Preencha todos os campos!');
    return;
  }

  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    alert('Este email já está cadastrado!');
    return;
  }

  users.push({ email, password });
  localStorage.setItem('users', JSON.stringify(users));

  alert('Cadastro realizado com sucesso! Agora faça login.');
  showLogin();
}

function showRegister() {
  document.getElementById('login-card').style.display = 'none';
  document.getElementById('register-card').style.display = 'block';
}

function showLogin() {
  document.getElementById('register-card').style.display = 'none';
  document.getElementById('login-card').style.display = 'block';
}

window.onload = () => {
  seedTurmas();
  seedAlunos();
  showLogin();
};
