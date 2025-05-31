let users = JSON.parse(localStorage.getItem('users') || '[]');
let alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
let turmas = JSON.parse(localStorage.getItem('turmas') || '[]');

function seedTurmas() {
  if (turmas.length === 0) {
    turmas = [
      { nome: "Boxe", modalidade: "Luta" },
      { nome: "Muay Thai", modalidade: "Luta" },
      { nome: "Jiu-Jitsu", modalidade: "Luta" },
      { nome: "CrossFit", modalidade: "Funcional" },
      { nome: "Funcional", modalidade: "Funcional" }
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

function seedUsuarios() {
  if (users.length === 0) {
    users = [
      { name: "Administrador", email: "admin@academia.com", password: "1234" }
    ];
    localStorage.setItem('users', JSON.stringify(users));
  }
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    window.location.href = "dashboard.html";
  } else {
    alert('Credenciais inválidas!');
  }
}

window.onload = () => {
  seedUsuarios();
  seedTurmas();
  seedAlunos();
}
