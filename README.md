# Chatbot Flow Builder

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A simple chatbot flow builder built using React. This project allows users to create chatbot flows by connecting messages together.

---

<img width="1470" alt="image" src="https://github.com/saum2000/chatbot-flow-reactflow/assets/65463471/e0cf786f-06f6-4dfd-b186-2ba974c15215">


## Features

- **Text Node:** Supports adding multiple text nodes to the flow.
- **Nodes Panel:** Houses different types of nodes. Easily extensible for adding more node types in the future.
- **Edge:** Connects two nodes together.
- **Source Handle:** Originates a connecting edge. Supports only one edge per source handle.
- **Target Handle:** Receives a connecting edge. Supports multiple edges per target handle.
- **Settings Panel:** Replaces the Nodes Panel when a node is selected. Allows editing text of the selected text node.
- **Save Button:** Saves the flow. Shows an error if there are more than one nodes and any node has empty target handles.

## Usage

1. Drag and drop nodes from the Nodes Panel to the Flow Canvas to create your chatbot flow.
2. Connect nodes together using edges to define the flow of messages.
3. Use the Settings Panel to edit the text of selected text nodes.
4. Click the Save button to save your chatbot flow. Ensure all nodes are connected to avoid errors.

## Installation

1. Clone the repository:

   ```git clone https://github.com/saum2000/chatbot-flow-builder.git```
2. run `npm i`
3. run `npm run dev`


