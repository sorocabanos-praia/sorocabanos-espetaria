document.getElementById('formNotion').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const mensagem = document.getElementById('mensagem');

  try {
    const resposta = await fetch('/.netlify/functions/enviarParaNotion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, telefone }),
    });

    const data = await resposta.json();

    if (resposta.ok) {
      mensagem.textContent = '✅ Dados enviados com sucesso!';
    } else {
      mensagem.textContent = `❌ Erro: ${data.error}`;
    }
  } catch (err) {
    mensagem.textContent = '❌ Erro de conexão com o servidor.';
    console.error(err);
  }
});
