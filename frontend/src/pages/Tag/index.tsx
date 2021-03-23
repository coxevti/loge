import React, { useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';

import {
  Wrapper,
  Header,
  ModalContent,
  TableColumnStatus,
} from 'pages/Tag/styles';
import Button from 'components/Button';
import Table from 'components/Table';
import api from 'services/api';
import { Edit2, Trash2, Plus, ThumbsUp, ThumbsDown } from 'react-feather';
import Modal from 'components/Modal';

interface TagProps {
  id: string;
  name: string;
  status: boolean;
  actions: string;
}

interface TagHeaderProps {
  id: string;
  name: string;
  status: string;
  actions: string;
}

const Tag: React.FC = () => {
  const [listTags, setListTags] = useState<TagProps[]>([]);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [message, setMessage] = useState({ name: '', status: false });
  const [idEditTag, setIdEditTag] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await api.get('/tags');
      const data = response.data.tags.map((item: TagProps) => {
        return {
          id: item.id,
          name: item.name,
          status: item.status,
          actions: '',
        };
      });
      setListTags(data);
    })();
  }, []);

  function headers(): TagHeaderProps {
    return { id: 'ID', name: 'Nome', status: 'Status', actions: '' };
  }

  function clearAll(): void {
    setName('');
    setMessage({ name: '', status: false });
    setValidationError(false);
  }

  const handleNewSubmit = async (): Promise<void> => {
    try {
      const response = await api.post('/tags', { name, status });
      const data = {
        id: response.data.tag.id,
        name: response.data.tag.name,
        status: false,
        actions: '',
      };
      setListTags([...listTags, data]);
      setShowModalNew(false);
      clearAll();
      cogoToast.success('Tag cadastrado com sucesso', { hideAfter: 5 });
    } catch (error) {
      setValidationError(true);
      setMessage({ ...message, name: error.response.data.message });
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    try {
      await api.put(`/tags/${idEditTag}`, { name, status });
      const updateList = listTags.map((item) =>
        item.id === idEditTag ? { ...item, name, status } : item,
      );
      setListTags([...updateList]);
      setShowModalEdit(false);
      clearAll();
      cogoToast.success('Tag editado com sucesso', { hideAfter: 5 });
    } catch (error) {
      setValidationError(true);
      cogoToast.error(error.response.data.message, { hideAfter: 5 });
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await api.delete(`/tags/${id}`);
      const deleteTag = listTags.filter((item) => item.id !== id);
      setListTags(deleteTag);
      cogoToast.success('Tag excluido com sucesso', { hideAfter: 5 });
    } catch (error) {
      cogoToast.error(error.response.data.message, { hideAfter: 5 });
    }
  };

  function handleClose(): void {
    setShowModalNew(false);
    setShowModalEdit(false);
    clearAll();
  }

  function handleEdit(data: TagProps): void {
    setIdEditTag(data.id);
    setName(data.name);
    setStatus(data.status);
    setShowModalEdit(true);
  }

  return (
    <Wrapper>
      <Header>
        <h1>Todas Tag(s)</h1>
        <Button
          type="button"
          width="auto"
          onClick={() => setShowModalNew(true)}
        >
          <Plus />
          Nova Tag
        </Button>
      </Header>
      <Table
        items={listTags}
        headers={headers()}
        customRenderers={{
          status: (item) => (
            <TableColumnStatus status={item.status}>
              {item.status ? 'Ativo' : 'Inativo'}
            </TableColumnStatus>
          ),
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
        title="Nova Tag"
        show={showModalNew}
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
      </Modal>
      <Modal
        title="Editar Tag"
        show={showModalEdit}
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
          <input
            type="radio"
            id="active"
            value={1}
            checked={status === true}
            onChange={() => setStatus(true)}
            name="active"
            className="checkbox-box"
          />
          <label htmlFor="active">
            <ThumbsUp />
            <span className="text">Ativo</span>
          </label>
          <input
            className="checkbox-box"
            type="radio"
            name="inactive"
            id="inactive"
            value={0}
            checked={status === false}
            onChange={() => setStatus(false)}
          />
          <label htmlFor="inactive">
            <ThumbsDown />
            <span className="text">Inativo</span>
          </label>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default Tag;
