let users = JSON.parse(localStorage.getItem('users') || '[]');
let alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
let turmas = JSON.parse(localStorage.getItem('turmas') || '[]');

function showRegister() {
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('register-screen').classList.remove('hidden');
}

function showLogin() {
  document.getElementById('register-screen').classList.add('hidden');
  document.getElementById('login-screen').classList.remove('hidden');
}

function register() {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  users.push({ name, email, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registrado com sucesso!');
  showLogin();
}

function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    showMenu(user.name);
  } else {
    alert('Credenciais inválidas!');
  }
}

function showMenu(name) {
  document.querySelectorAll('#app > div').forEach(el => el.classList.add('hidden'));
  document.getElementById('menu-screen').classList.remove('hidden');
  document.getElementById('welcome-user').innerText = `Olá, ${name}!`;
}

function logout() {
  localStorage.removeItem('loggedUser');
  location.reload();
}

function showRegistroFrequencia() {
  document.querySelectorAll('#app > div').forEach(el => el.classList.add('hidden'));
  document.getElementById('frequencia-screen').classList.remove('hidden');
  renderAlunosFrequencia();
}

function renderAlunosFrequencia() {
  const lista = document.getElementById('lista-alunos');
  if (alunos.length === 0) {
    lista.innerHTML = '<p>Sem alunos cadastrados.</p>';
    return;
  }
  lista.innerHTML = alunos.map((a, i) => `
    <div style="margin-bottom: 10px;">
      <img src="${a.foto}" alt="${a.nome}" style="width:50px;height:50px;border-radius:50%;"><br>
      <strong>${a.nome}</strong> (${a.idade} anos)<br>
      <button onclick="marcarPresenca(${i}, true)">Frequente</button>
      <button onclick="marcarPresenca(${i}, false)">Ausente</button>
    </div>
  `).join('');
}

function marcarPresenca(index, presente) {
  if (!alunos[index].frequencias) alunos[index].frequencias = [];
  alunos[index].frequencias.push({ data: new Date().toISOString().split('T')[0], presente });
  localStorage.setItem('alunos', JSON.stringify(alunos));
  alert(`${alunos[index].nome} marcado como ${presente ? 'Frequente' : 'Ausente'}.`);
}

function showCadastrarTurma() {
  document.querySelectorAll('#app > div').forEach(el => el.classList.add('hidden'));
  document.getElementById('cadastrar-turma-screen').classList.remove('hidden');
}

function salvarTurma() {
  const nome = document.getElementById('turma-nome').value;
  const modalidade = document.getElementById('turma-modalidade').value;
  if (!nome || !modalidade) return alert('Preencha todos os campos!');
  turmas.push({ nome, modalidade });
  localStorage.setItem('turmas', JSON.stringify(turmas));
  atualizarSelectTurmas();
  alert('Turma cadastrada!');
  voltarMenu();
}

function showCadastrarAluno() {
  document.querySelectorAll('#app > div').forEach(el => el.classList.add('hidden'));
  document.getElementById('cadastrar-aluno-screen').classList.remove('hidden');
  atualizarSelectTurmas();
}

function salvarAluno() {
  const nome = document.getElementById('aluno-nome').value;
  const idade = document.getElementById('aluno-idade').value;
  const foto = document.getElementById('aluno-foto').value;
  const turma = document.getElementById('aluno-turma').value;
  if (!nome || !idade || !foto || !turma) return alert('Preencha todos os campos!');
  alunos.push({ nome, idade, foto, turma });
  localStorage.setItem('alunos', JSON.stringify(alunos));
  alert('Aluno cadastrado!');
  voltarMenu();
}

function showRelatorioMensal() {
  document.querySelectorAll('#app > div').forEach(el => el.classList.add('hidden'));
  document.getElementById('relatorio-screen').classList.remove('hidden');
  atualizarSelectTurmas();
}

function gerarRelatorio() {
  const mes = document.getElementById('relatorio-mes').value;
  const turma = document.getElementById('relatorio-turma').value;
  if (!mes || !turma) return alert('Selecione mês e turma!');

  const resultado = alunos.filter(a => a.turma === turma).map(a => {
    const freq = a.frequencias?.filter(f => f.data.startsWith(mes)).length || 0;
    return `${a.nome}: ${freq} presença(s)`;
  }).join('<br>');

  document.getElementById('relatorio-resultado').innerHTML = resultado || 'Nenhum aluno ou frequência encontrada.';
}

function atualizarSelectTurmas() {
  const selects = document.querySelectorAll('#aluno-turma, #relatorio-turma');
  selects.forEach(sel => {
    sel.innerHTML = '<option value="">Selecione a turma</option>' +
      turmas.map(t => `<option value="${t.nome}">${t.nome}</option>`).join('');
  });
}

function voltarMenu() {
  showMenu(JSON.parse(localStorage.getItem('loggedUser')).name);
}

window.onload = () => {
  const logged = JSON.parse(localStorage.getItem('loggedUser'));
  if (logged) showMenu(logged.name);
  atualizarSelectTurmas();
}
