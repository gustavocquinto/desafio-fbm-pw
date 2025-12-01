## 📜 Desafio FBM - Automação E2E

Este repositório contém o projeto de automação de testes End-to-End (E2E) construído com **Playwright** e **TypeScript** para validação da plataforma OrangeHRM Demo.

---

### 🚀 Tecnologias e Dependências

| Tecnologia | Função |
| :--- | :--- |
| **Playwright** | Framework de automação E2E. |
| **TypeScript** | Linguagem de programação para tipagem forte. |
| **Node.js/npm** | Gerenciamento de pacotes e ambiente de execução. |
| **npx** | Execução de pacotes Node.js. |
| **`dotenv`** | Gerenciamento de variáveis de ambiente. |
| **`faker-js`** | Geração de dados randômicos para testes (demonstração). |

---

### 🏗️ Arquitetura do Projeto

O projeto adota uma arquitetura robusta para garantir manutenibilidade, escalabilidade e clareza.

#### **1. Page Object Model (POM) e Orientação a Objetos (OO)**

Utilizei o **Page Object Model (POM)** para separar os localizadores e a lógica de interação da página da lógica dos testes. Isso é combinado com a **Programação Orientada a Objetos (OO)**:
* **Page Objects** (Classes) representam as páginas da aplicação e contêm os métodos de interação.
* **Objetos de Domínio** (Exemplo: `Employee`) são modelados como classes para encapsular a estrutura de dados e auxiliar na manipulação de informações no contexto do teste.

#### **2. Variáveis de Ambiente (`.env`)**

* Implementei o arquivo `.env` e a biblioteca `dotenv` para gerenciar **variáveis de ambiente**, como URLs de ambientes e, mais importante, **credenciais críticas**.
* Isso **evita o commit de informações sensíveis** diretamente no repositório.
* A arquitetura está pronta para uma futura implementação e controle de ambiente via **Docker** e **Pipelines**.

#### **3. Fixtures**

* Implementei as **Fixtures** do Playwright que são utilizadas para configurar estados iniciais ou instanciar objetos necessários para os testes.
* Utilizado para cenários de testes que **dependem de um login** prévio ou de uma **configuração de dados** específica, garantindo que o teste comece de um ponto conhecido.

#### **4. Factory e Model**

* **Model:** Define a estrutura e os tipos de um objeto de domínio (exemplo: `Employee`).
* **Factory:** É responsável por criar instâncias concretas do objeto (exemplo: `EmployeeFactory`).
    * Pode gerar um objeto com dados **específicos** sob demanda.
    * Implementei, por exemplo, o objeto `Employee` que carrega toda a informação de um funcionário.
    * Também foi implementado a geração de um `Employee` com dados **totalmente randômicos** utilizando o `faker-js` apenas para fins de demonstração, simulando um novo usuário a cada execução.

---

### ⚙️ Como Executar os Testes

Para executar os testes, siga os passos abaixo:

#### **1. Baixar o Repositório**

Clone o projeto para a sua máquina local.

```bash
git clone https://github.com/gustavocquinto/desafio-fbm-pw.git
```

#### **2. Pré-requisitos**

Certifique-se de ter o **Node.js** instalado.

#### **3. Instalação das Dependências**

Abra o terminal na pasta raiz do projeto e instale as dependências utilizando o npm:

```bash
npm install
```

```bash
npx playwright install
```
#### **4. Configuração das Variáveis de Ambiente**

Copie e cole o arquivo .env.example, e o renomeie para ".env" e preencha com suas informações.

```bash
TEST_BASE_URL=https://opensource-demo.orangehrmlive.com/web/index.php/auth/login
TEST_USER_LOGIN=SeuUsuario
TEST_USER_PASSWORD=SuaSenha
```
#### **5. Execução dos testes**

Utilize o comando abaixo para executar todos os testes.

```bash
npx playwright test
```

**Observação: Você também pode executar _"npx playwright test --ui"_ para acompanhar a execução via interface**

---

### 📊 Relatórios Automáticos

O Playwright gera relatórios de execução de testes automaticamente após cada ciclo de teste.

Ao final da execução, abra o relatório para visualizar os resultados detalhados (pass/fail, logs, screenshots, etc.):

```bash
npx playwright show-report
```

---

### 🚧 Desafios Encontrados e Soluções Adotadas

Durante o desenvolvimento e execução dos testes, os seguintes desafios foram notados na aplicação sob teste:

* Plataforma Extremamente Instável: A aplicação exibe comportamento não determinístico (flaky). Solução: O Playwright é configurado com retries (tentativas) para testes falhos e timeouts mais agressivos onde necessário, aumentando a tolerância do teste a falhas temporárias da aplicação.

* Múltiplos Testers Realizando Alterações Simultâneas: O ambiente de teste é volátil devido a intervenções humanas. Solução: A arquitetura com Fixtures e o uso de faker-js (Factory) ajudam a isolar o teste, garantindo que ele crie e use dados próprios e únicos sempre que possível, minimizando a dependência de dados estáticos compartilhados.

* Automações de Outros Testers Quebrando a Aplicação: Outros scripts de automação ou testes estão corrompendo o estado da aplicação. Solução: Ênfase na limpeza de dados (data cleanup) após a execução dos testes e a execução em paralelo com isolamento de contexto (Context Isolation), onde cada teste tem sua própria sessão limpa de navegador.

* Dados Inconsistentes no Ambiente: A falta de controle sobre os dados leva a cenários inesperados. Solução: Implementação de Soluções Pragmáticas (como esperar mais por um dado, aplicar verificações de fallback ou usar lógica condicional nos testes) para contornar a inconsistência.

⚠️ **Nota de Cenário Profissional:** É fundamental ressaltar que a aplicação de "soluções pragmáticas" foi necessária de adoção pois a plataforma é instável e sem massa de dados preparada. Em ambientes profissionais implementaríamos um padrão tanto de funcionamento para automações, quanto para os dados, aumentando a confiabilidade dos tests, e despencando a necessidade de manutenções.

---

### ✅ O que implementaria com maior tempo?

* Pipeline para gerar imagem Docker já com o Playwright base image (mcr.microsoft.com/playwright)
que já inclui browsers + dependencies, e enviar para um repositório de imagens, possibilitando o projeto principal incluir em sua pipeline e realizar os testes dentro da esteira do repositório em desenvolvimento. (Exemplo: Alteração na branch de homologação dispararia esses testes.)

* Subir relatório HTML de sucesso/erro/evidências do playwright no GitHub Pages (veja /assets para exemplo) via pipeline. (Exemplo de OUTRO projeto de minha autoria: https://gustavocquinto.github.io/PlayWright-qa)

* Se possível, construiria uma cultura dentro do projeto à ser automatizado, trazendo boas práticas não só de qualidade, como desenvolvimento, que facilitam tanto à incrementação da aplicação, quanto automação de testes.

---

### Thats all folks!