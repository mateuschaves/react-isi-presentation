import React, { useState, useEffect } from 'react';
import { FormEvent } from 'react';
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from './components/Input';
import User from './components/User';

import api from './services/api';

interface UserProps {
  name: string;
  phone: string;
  email: string;
}

function App() {

  const [users, setUsers] = useState<UserProps[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers()
      
  }, []);

  async function fetchUsers() {
    api.get<UserProps[]>('/users')
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(() => toast.error('Não foi possível listar os usuários 😭'));
  }

  async function createUser(user: UserProps) {
    return await api.post('/users', user);
  }

  async function addUser(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newUser = {
      name,
      phone,
      email,
    }
    createUser(newUser)
      .then(() => {
        toast.success('Usuário cadastrado 😀');
        fetchUsers();
      })
      .catch(() => toast.error('Erro ao cadastrar usuário 🥺'))
  }

  return (
    <div className="app">
     <aside>
      <h1>Cadastrar usuário</h1>
      <form onSubmit={addUser}>
        <Input label="Nome" value={name} maxLength={20} onChange={e => setName(e.target.value)} placeholder="Ex. Mateus" required/>
        <Input label="Telefone" value={phone} onChange={e => setPhone(e.target.value)} required type="phone"/>
        <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} required type="email"/>

        <button type="submit">
          Cadastrar
        </button>
      </form>
     </aside>
     <main>
      <ul>
       {
          users.map(user => <User 
            avatar="https://i.pravatar.cc/54"
            email={user.email}
            name={user.name}
          />)
        }
      </ul>
     </main>

     <ToastContainer />
    </div>
  );
}

export default App;
