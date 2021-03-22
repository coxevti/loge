import React, { useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';

import { Wrapper, Header, ModalContent } from 'pages/User/styles';
import Button from 'components/Button';
import Table from 'components/Table';
import api from 'services/api';
import { Edit2, Trash2, Plus } from 'react-feather';
import Modal from 'components/Modal';

interface UserProps {
  id: string;
  name: string;
  email: string;
  actions: string;
}

const User: React.FC = () => {
  const [listUsers, setListUsers] = useState<UserProps[]>([]);
  const [showModalNewUser, setShowModalNewUser] = useState(false);
  const [showModalEditUser, setShowModalEditUser] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [message, setMessage] = useState({ name: '', email: '', password: '' });
  const [idEditUser, setIdEditUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      const response = await api.get('/users');
      const data = response.data.users.map((item: UserProps) => {
        return { id: item.id, name: item.name, email: item.email, actions: '' };
      });
      setListUsers(data);
    })();
  }, []);

  function headers(): UserProps {
    return { id: 'ID', name: 'Nome', email: 'Email', actions: '' };
  }

  function clearAll(): void {
    setName('');
    setEmail('');
    setPassword('');
    setMessage({ name: '', email: '', password: '' });
    setValidationError(false);
  }

  const handleNewSubmit = async (): Promise<void> => {
    try {
      const response = await api.post('/users', { name, email, password });
      const data = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        actions: '',
      };
      setListUsers([...listUsers, data]);
      setShowModalNewUser(false);
      clearAll();
      cogoToast.success('Usuário cadastrado com sucesso', { hideAfter: 5 });
    } catch (error) {
      setValidationError(true);
      setMessage(error.response.data.message);
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    try {
      await api.put(`/users/${idEditUser}`, { name, email, password });
      const updateListUser = listUsers.map((user) =>
        user.id === idEditUser ? { ...user, name, email } : user,
      );
      setListUsers([...updateListUser]);
      setShowModalEditUser(false);
      clearAll();
      cogoToast.success('Usuário editado com sucesso', { hideAfter: 5 });
    } catch (error) {
      setValidationError(true);
      cogoToast.error(error.response.data.message, { hideAfter: 5 });
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`);
      const deleteUser = listUsers.filter((user) => user.id !== id);
      setListUsers(deleteUser);
      cogoToast.success('Usuário excluido com sucesso', { hideAfter: 5 });
    } catch (error) {
      cogoToast.error(error.response.data.message, { hideAfter: 5 });
    }
  };

  function handleClose(): void {
    setShowModalNewUser(false);
    setShowModalEditUser(false);
    clearAll();
  }

  function handleEdit(user: UserProps): void {
    setIdEditUser(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword('');
    setShowModalEditUser(true);
  }

  return (
    <Wrapper>
      <Header>
        <h1>Todos Usuario(s)</h1>
        <Button
          type="button"
          width="auto"
          onClick={() => setShowModalNewUser(true)}
        >
          <Plus />
          Novo Usuario
        </Button>
      </Header>
      <Table
        items={listUsers}
        headers={headers()}
        customRenderers={{
          actions: (it) => (
            <>
              <Button
                type="button"
                width="auto"
                className="btn-edit"
                onClick={() => handleEdit(it)}
              >
                <Edit2 size={15} />
              </Button>
              <Button
                type="button"
                width="auto"
                className="btn-destroy"
                onClick={() => handleDelete(it.id)}
              >
                <Trash2 size={15} />
              </Button>
            </>
          ),
        }}
      />
      <Modal
        title="Novo Usuário"
        show={showModalNewUser}
        onClose={handleClose}
        onSubmit={handleNewSubmit}
      >
        <ModalContent>
          <label htmlFor="name">
            <div>
              Nome
              <span className="error">{validationError && message.name}</span>
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </ModalContent>
        <ModalContent>
          <label htmlFor="email">
            <div>
              Email
              <span className="error">{validationError && message.email}</span>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </ModalContent>
        <ModalContent>
          <label htmlFor="password">
            <div>
              Senha
              <span className="error">
                {validationError && message.password}
              </span>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </ModalContent>
      </Modal>
      <Modal
        title="Editar Usuário"
        show={showModalEditUser}
        onClose={handleClose}
        onSubmit={handleEditSubmit}
      >
        <ModalContent>
          <label htmlFor="name">
            <div>
              Nome
              <span className="error">{validationError && message.name}</span>
            </div>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </ModalContent>
        <ModalContent>
          <label htmlFor="email">
            <div>
              Email
              <span className="error">{validationError && message.email}</span>
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </ModalContent>
        <ModalContent>
          <label htmlFor="password">
            <div>
              Senha
              <span className="error">
                {validationError && message.password}
              </span>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default User;
