# SmartGardens

## 📋 Descrição do Projeto
O **SmartGardens** é um aplicativo desenvolvido em React Native com Expo, que tem como objetivo facilitar a gestão e compra de produtos relacionados a jardins inteligentes. O projeto inclui funcionalidades como cadastro de usuários, listagem de produtos, carrinho de compras e integração com recursos nativos do dispositivo.

---

## 🛠️ Funcionalidades Implementadas

### **1AF**
- **Organização da Estrutura**:
  - O projeto está organizado em pastas e arquivos bem estruturados, com separação de responsabilidades.
- **5 Telas do Projeto**:
  - **Screen1**: Tela de cadastro de usuários com validações.
  - **Screen2**: Tela de listagem de produtos com FlatList.
  - **Screen3**: Tela de carrinho de compras com cálculo de totais.
  - **Screen4**: Tela de detalhes do produto com navegação.
  - **LoginScreen**: Tela de login (opcional para demonstração).
- **Formulários com Validações**:
  - Validações implementadas na tela de cadastro (Screen1), como campos obrigatórios e validação de CEP.
- **Visual e Estilização**:
  - O aplicativo possui uma interface estilizada e responsiva, com botões, imagens e mensagens de feedback.

### **2AF**
- **Todas as Telas do Aplicativo**:
  - O projeto contempla todas as telas necessárias para o fluxo do aplicativo.
- **Sistema de Navegação**:
  - Implementado com `React Navigation` utilizando `Stack.Navigator`.
- **Qualidade do Código e Organização**:
  - Código limpo, organizado e com comentários explicativos.
- **Visual e Usabilidade**:
  - Interface intuitiva e estilizada, com navegação fluida entre as telas.
- **Listagem de Itens com FlatList**:
  - Tela de listagem de produtos (Screen2) utiliza `FlatList` para exibição otimizada.
- **Uso de Recursos Nativos**:
  - **Câmera**: Implementada na tela de cadastro para capturar a foto do usuário.
  - **API de CEP**: Busca de endereço na tela de cadastro utilizando a API do ViaCEP.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js instalado.
- Expo CLI instalado globalmente:
  ```bash
  npm install -g expo-cli