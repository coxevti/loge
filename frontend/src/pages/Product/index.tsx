import cogoToast from 'cogo-toast';
import Button from 'components/Button';
import Modal from 'components/Modal';
import Table from 'components/Table';
import React, { useEffect, useState } from 'react';
import { Edit2, Plus, ThumbsDown, ThumbsUp, Trash2 } from 'react-feather';
import api from 'services/api';

import { Wrapper, Header, TableColumnStatus, ModalContent } from './styles';

interface ProductProps {
  id: string;
  name: string;
  unit: string;
  categoryId: string;
  price: number;
  formatPrice: string;
  status: boolean;
  actions: string;
}

interface ProductHeaderProps {
  id: string;
  name: string;
  unit: string;
  price: string;
  status: string;
  actions: string;
}

interface CategoryProps {
  id: string;
  name: string;
  status: boolean;
}

interface UnidProps {
  unid: string;
}

const Product: React.FC = () => {
  const [listProducts, setListProducts] = useState<ProductProps[]>([]);
  const [listCategories, setListCategories] = useState<CategoryProps[]>([]);
  const [listUnid, setListUnid] = useState<UnidProps[]>([]);
  const [idEdit, setIdEdit] = useState('');
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const [message, setMessage] = useState({
    name: '',
    category: '',
    unid: '',
    price: '',
  });
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unid, setUnid] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await api.get('/products');
      const data = response.data.products.map((item: ProductProps) => {
        const currencyPtBR = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        return {
          id: item.id,
          name: item.name,
          categoryId: item.categoryId,
          unit: item.unit,
          price: item.price,
          formatPrice: currencyPtBR.format(item.price),
          status: item.status,
          actions: '',
        };
      });
      setListProducts(data);
      setListUnid(response.data.unitOfMeasurement);
      const responseCategories = await api.get('/categories');
      const categories = responseCategories.data.categories.map(
        (item: CategoryProps) => {
          return {
            id: item.id,
            name: item.name,
            status: item.status,
            actions: '',
          };
        },
      );
      setListCategories(categories);
    })();
  }, []);

  function headers(): ProductHeaderProps {
    return {
      id: 'ID',
      name: 'Nome',
      unit: 'Unid',
      price: 'Preço',
      status: 'Status',
      actions: '',
    };
  }

  function clearAll(): void {
    setName('');
    setMessage({
      name: '',
      category: '',
      unid: '',
      price: '',
    });
    setPrice('');
    setCategory('');
    setUnid('');
    setStatus(true);
    setValidationError(false);
  }

  function handleEdit(data: ProductProps): void {
    setIdEdit(data.id);
    setName(data.name);
    setPrice(data.price.toString());
    setUnid(data.unit);
    setCategory(data.categoryId);
    setStatus(data.status);
    setShowModalEdit(true);
  }

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
      const deleteProduct = listProducts.filter((item) => item.id !== id);
      setListProducts(deleteProduct);
      clearAll();
      cogoToast.success('Produto excluido com sucesso', { hideAfter: 5 });
    } catch (error) {
      cogoToast.error(error.response.data.message, { hideAfter: 5 });
    }
  };

  function handleClose(): void {
    setShowModalNew(false);
    setShowModalEdit(false);
    clearAll();
  }

  const handleNewSubmit = async (): Promise<void> => {
    try {
      const response = await api.post('/products', {
        name,
        price,
        unit: unid,
        categoryId: category,
        status,
      });
      const currencyPtBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      const data = {
        id: response.data.product.id,
        name: response.data.product.name,
        unit: response.data.product.unit,
        price: response.data.product.price,
        categoryId: response.data.product.categoryId,
        formatPrice: currencyPtBR.format(response.data.product.price),
        status: true,
        actions: '',
      };
      setListProducts([...listProducts, data]);
      setShowModalNew(false);
      clearAll();
      cogoToast.success('Produto cadastrado com sucesso');
    } catch (error) {
      if (error && error.response && error.response.status === 422) {
        error.response.data.message.forEach((field: string) =>
          cogoToast.error(field),
        );
      } else {
        cogoToast.error(error.response.data.message);
      }
    }
  };

  const handleEditSubmit = async (): Promise<void> => {
    try {
      await api.put(`/products/${idEdit}`, {
        name,
        categoryId: category,
        price,
        unit: unid,
        status,
      });
      const currencyPtBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
      const updateList = listProducts.map((item) =>
        item.id === idEdit
          ? {
              ...item,
              name,
              status,
              formatPrice: currencyPtBR.format(item.price),
            }
          : item,
      );
      setListProducts([...updateList]);
      setShowModalEdit(false);
      clearAll();
      cogoToast.success('Produto editado com sucesso', { hideAfter: 5 });
    } catch (error) {
      if (error && error.response && error.response.status === 422) {
        error.response.data.message.forEach((field: string) =>
          cogoToast.error(field),
        );
      } else {
        cogoToast.error(error.response.data.message);
      }
    }
  };

  return (
    <Wrapper>
      <Header>
        <h1>Todos Produto(s)</h1>
        <Button
          type="button"
          width="auto"
          onClick={() => setShowModalNew(true)}
        >
          <Plus />
          Novo Produto
        </Button>
      </Header>
      <Table
        items={listProducts}
        headers={headers()}
        headersHide={['id', 'price', 'categoryId']}
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
        title="Novo Produto"
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
          <label htmlFor="category">
            <div>
              Categoria
              <span className="error">
                {validationError && message.category}
              </span>
            </div>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                selecione uma categoria
              </option>
              {listCategories.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="unid">
            <div>
              Unidade
              <span className="error">{validationError && message.unid}</span>
            </div>
            <select
              name="unid"
              id="unid"
              value={unid}
              onChange={(e) => setUnid(e.target.value)}
            >
              <option value="" disabled>
                selecione uma unidade
              </option>
              {listUnid.map((item) => (
                <option value={item.unid} key={item.unid}>
                  {item.unid}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="price">
            <div>
              Preço
              <span className="error">{validationError && message.price}</span>
            </div>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <div>
            <input
              type="radio"
              id="active"
              value={1}
              checked={status === true}
              onChange={() => setStatus(true)}
              name="active"
              className="checkbox-box"
            />
            <label htmlFor="active" className="active">
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
            <label htmlFor="inactive" className="inactive">
              <ThumbsDown />
              <span className="text">Inativo</span>
            </label>
          </div>
        </ModalContent>
      </Modal>
      <Modal
        title="Editar Produto"
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
          <label htmlFor="category">
            <div>
              Categoria
              <span className="error">
                {validationError && message.category}
              </span>
            </div>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                selecione uma categoria
              </option>
              {listCategories.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="unid">
            <div>
              Unidade
              <span className="error">{validationError && message.unid}</span>
            </div>
            <select
              name="unid"
              id="unid"
              value={unid}
              onChange={(e) => setUnid(e.target.value)}
            >
              <option value="" disabled>
                selecione uma unidade
              </option>
              {listUnid.map((item) => (
                <option value={item.unid} key={item.unid}>
                  {item.unid}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="price">
            <div>
              Preço
              <span className="error">{validationError && message.price}</span>
            </div>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <div>
            <input
              type="radio"
              id="active"
              value={1}
              checked={status === true}
              onChange={() => setStatus(true)}
              name="active"
              className="checkbox-box"
            />
            <label htmlFor="active" className="active">
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
            <label htmlFor="inactive" className="inactive">
              <ThumbsDown />
              <span className="text">Inativo</span>
            </label>
          </div>
        </ModalContent>
      </Modal>
    </Wrapper>
  );
};

export default Product;
