export const handler = async (event) => {
  try {
    const { nome, telefone, endereco, itens, total } = JSON.parse(event.body);

    // ⚙️ Variáveis de ambiente
    const NOTION_API_KEY = process.env.NOTION_API_KEY;
    const DATABASE_ID = process.env.NOTION_DATABASE_ID;

    const resposta = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
          'Nome': { 
            title: [{ text: { content: nome } }] 
          },
          'Telefone': { 
            rich_text: [{ text: { content: telefone } }] 
          },
          'Endereço': { 
            rich_text: [{ text: { content: endereco } }] 
          },
          'Itens': { 
            rich_text: [{ text: { content: itens } }] 
          },
          'Total': { 
            rich_text: [{ text: { content: `R$ ${total}` } }] // ⚡ CORREÇÃO AQUI!
          },
          'Status': {
            select: { name: 'Novo Pedido' }
          }
        },
      }),
    });

    if (!resposta.ok) {
      const erro = await resposta.text();
      throw new Error(erro);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error('Erro na função:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
