🧪 Testes Automatizados – OrangeHRM (Playwright)

Este repositório contém a automação criada para o teste técnico, incluindo plano de testes, casos de teste, evidências e relatório de execução.

📌 Tecnologias

Playwright (TypeScript)

Node.js

Page Object Model (POM)

📁 Estrutura do Projeto
/tests               → Cenários automatizados
/pages               → Page Objects
/fixtures            → Massa de dados (se aplicável)
/planos              → Plano de testes e casos de teste
/evidencias          → Prints adicionais
/playwright-report   → Relatório de execução HTML

▶️ Como executar

Instalar dependências:

npm install


Rodar os testes:

npx playwright test


Gerar o relatório HTML:

npx playwright show-report

📄 Entregáveis incluídos

Plano de Testes

Casos de Teste

Código da Automação

Relatório de Execução (HTML Playwright)

Evidências (prints + screenshots automáticos)

📌 Observações

O projeto segue boas práticas de organização, com Page Object Model e casos de teste independentes.

As credenciais estão configuradas via variáveis de ambiente (.env).
