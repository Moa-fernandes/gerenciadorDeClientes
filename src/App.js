import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './App.css'; // Importe o arquivo de estilo App.css

function App() {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [coordenadaX, setCoordenadaX] = useState('');
  const [coordenadaY, setCoordenadaY] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [rotaOtimizada, setRotaOtimizada] = useState([]);

  const calcularRotaOtimizada = () => {
    axios.get('http://localhost:3001/rota-otimizada')
      .then(response => {
        setRotaOtimizada(response.data);
        setModalIsOpen(true);
      })
      .catch(error => console.error('Erro ao calcular rota otimizada:', error));
  };

  const voltarPagina = () => {
    setModalIsOpen(false);
    window.history.back(); // Use window.history.back() para voltar à página anterior
  };

  useEffect(() => {
    axios.get('http://localhost:3001/clientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error('Erro ao buscar clientes:', error));
  }, []);

  const cadastrarCliente = () => {
    axios.post('http://localhost:3001/clientes', { nome, email, telefone, coordenada_x: coordenadaX, coordenada_y: coordenadaY })
      .then(response => {
        alert(response.data);
        setClientes(prevClientes => [
          ...prevClientes,
          { id: response.data.id, nome, email, telefone, coordenada_x: coordenadaX, coordenada_y: coordenadaY }
        ]);
      })
      .catch(error => console.error('Erro ao cadastrar cliente:', error));
  };

  return (


    
    <div className="App-container">
      <button onClick={calcularRotaOtimizada} className="Calculate-button">Calcule Aqui - Rota Otimizada</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={voltarPagina}
        style={{
          content: {
            padding: '20px', 
            borderRadius: '8px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#3498db', // Cor de fundo da modal
            color: 'white', // Cor do texto
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo do overlay
          },
        }}
      >
        
        <h2>Ordem de Visitação na Rota Otimizada</h2>
        <ul>
          {rotaOtimizada.map(cliente => (
            <li key={cliente.id}>Cliente {cliente.id} - Coordenadas: ({cliente.coordenada_x}, {cliente.coordenada_y})</li>
          ))}
        </ul>
        <button onClick={voltarPagina}>Voltar</button>
      </Modal>

      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome} - {cliente.email} - {cliente.telefone}</li>
        ))}
      </ul>
      <h2>Cadastrar Novo Cliente</h2>
      <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
      <input type="text" placeholder="Coordenada X" value={coordenadaX} onChange={e => setCoordenadaX(e.target.value)} />
      <input type="text" placeholder="Coordenada Y" value={coordenadaY} onChange={e => setCoordenadaY(e.target.value)} />
      <button onClick={cadastrarCliente}>Cadastrar</button>
    </div>
  );
}

export default App;
