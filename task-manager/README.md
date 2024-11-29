# Gerenciamento de Tarefas com Prioridades

Este é um aplicativo em **React Native** desenvolvido como parte de uma prova prática para a disciplina **Projeto Desenvolvimento de Dispositivos Móveis**. O aplicativo permite gerenciar uma lista de tarefas, organizadas por prioridades. Ele inclui funcionalidades como adição, edição, exclusão e ordenação de tarefas. 

---

## 📝 **Funcionalidades**

1. **Exibição de Tarefas**: 
   - Nome da tarefa.
   - Descrição da tarefa.
   - Indicador visual de prioridade (Alta, Média, Baixa).

2. **Adição de Tarefas**:
   - Formulário para inserir nome, descrição e prioridade da tarefa.

3. **Edição de Tarefas**:
   - Seleção de uma tarefa existente para atualizar suas informações.

4. **Exclusão de Tarefas**:
   - Remoção de tarefas com um botão dedicado.

5. **Ordenação de Tarefas**:
   - Possibilidade de organizar as tarefas por ordem de prioridade (maior para menor ou vice-versa).

6. **Componentização**:
   - Código modularizado com componentes reutilizáveis, como **TaskForm**, **TaskListItem**.

---

## 🚀 **Tecnologias Utilizadas**

- **React Native** (Expo Framework)
- **Hooks** do React (`useState`)
- **FlatList** para renderização eficiente de listas
- **StyleSheet** para estilização
- **Pressable** para ações interativas

---

## 📁 **Estrutura do Projeto**

```bash
/task-manager
├── /components
│   ├── TaskForm.jsx 
│   ├── TaskListItem.jsx    
├── App.js
├── /assets
└── /styles
    └── styles.js
```

## 🛠️ **Como Executar**

### 1. **Pré-requisitos**
- Node.js instalado na máquina.
- Expo CLI globalmente instalado:

```bash
npm install -g expo-cli
```

- Aplicativo **Expo Go** instalado no dispositivo móvel (disponível para [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) e [iOS](https://apps.apple.com/app/expo-go/id982107779)).

### 2. **Clonando o Repositório**
Clone este repositório em sua máquina:

```bash
git clone <URL-DO-SEU-REPOSITORIO> cd task-manager
```

### 3. **Instalando Dependências**
Execute o seguinte comando no diretório do projeto:

```bash
npm install
```

### 4. **Executando o Projeto**
Inicie o servidor do Expo:

```bash
npx expo start --tunnel
```
### 5. **Executando no Dispositivo**
1. No terminal, será exibido um QR Code.
2. Abra o aplicativo **Expo Go** no seu dispositivo.
3. Escaneie o QR Code para carregar o app no dispositivo.

## 📷 **Preview do App**

### Lista de Tarefas
- Mostra nome, descrição e prioridade com indicador visual.

### Formulário de Tarefas
- Interface limpa e intuitiva para adicionar ou editar tarefas.

## 🧑‍💻 **Contribuidores**

- **Nome do Desenvolvedor**: Rafael Andrade Prado  
- **Disciplina**: Projeto Desenvolvimento de Dispositivos Móveis  
- **Professor**: Edson Angoti Júnior  

