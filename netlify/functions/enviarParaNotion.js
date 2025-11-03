import fetch from 'node-fetch';

export const handler = async (event) => {
  try {
    const { nome, telefone } = JSON.parse(event.body);

    // ⚙️ Substitua pelos seus dados do Notion:
    const NOTION_API_KEY = process.env.NOTION_API_KEY; // Defina no painel do Netlify
    const DATABASE_ID = process.env.NOTION_DATABASE_ID; // Defina no painel do Netlify

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
          Nome: { title: [{ text: { content: nome } }] },
          Telefone: { rich_text: [{ text: { content: telefone } }] },
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
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
