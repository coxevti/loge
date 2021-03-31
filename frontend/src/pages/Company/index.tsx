import React, { ChangeEvent, useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';

import {
  Wrapper,
  Header,
  Container,
  Content,
  ProfileContent,
  ProfileImage,
  ProfileUpload,
} from 'pages/Company/styles';
import Button from 'components/Button';

import { Camera } from 'react-feather';
import api from 'services/api';

const Company: React.FC = () => {
  const [id, setId] = useState('');
  const [cnpjCpf, setCnpjCpf] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [fantasyName, setFantasyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [companyLogo, setCompanyLogo] = useState<string>('');

  const handleFileUpload = (): void => {
    const fileUpload = document.querySelector('.file-upload') as HTMLElement;
    fileUpload.click();
  };

  const uploadFile = async (file: File): Promise<void> => {
    const formData = new FormData();
    formData.append('companyLogo', file);
    try {
      await api.patch('/companies/logo', formData);
      cogoToast.success('Logo atualizado com sucesso', { hideAfter: 5 });
    } catch (error) {
      cogoToast.error('Erro ao fazer upload', { hideAfter: 5 });
    }
  };

  const handleFileChange = (event: ChangeEvent): void => {
    const target = event.target as HTMLInputElement;
    const upFile = (target.files as FileList)[0];
    if (!upFile) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setCompanyLogo(String(e.target?.result));
    };
    reader.readAsDataURL(upFile);
    uploadFile(upFile);
  };

  useEffect(() => {
    (async (): Promise<void> => {
      const response = await api.get('/companies');
      const { company } = response.data;
      setId(company.id);
      setCnpjCpf(company.cnpjCpf);
      setCompanyName(company.companyName);
      setFantasyName(company.fantasyName);
      setEmail(company.email);
      setPhone1(company.phone1);
      setPhone2(company.phone2);
      setAddress(company.address);
      setCity(company.city);
      setNeighborhood(company.neighborhood);
      setZip(company.zip);
      setState(company.state);
      setCompanyLogo(
        `${process.env.REACT_APP_BACK_FILES_API}/${company.companyLogo}`,
      );
    })();
  }, []);

  const handleUpdateCompany = async (): Promise<void> => {
    try {
      await api.put(`/companies/${id}`, {
        cnpjCpf,
        companyName,
        fantasyName,
        email,
        phone1,
        phone2,
        address,
        neighborhood,
        city,
        state,
        zip,
      });
      cogoToast.success('Dados da empresa atualizado');
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
        <h1>Dados cadastrais da minha empresa</h1>
      </Header>
      <Container>
        <ProfileContent>
          <ProfileImage>
            <img src={companyLogo} alt="Logo da empresa" />
          </ProfileImage>
          <ProfileUpload>
            <Camera onClick={handleFileUpload} />
            <input
              type="file"
              className="file-upload"
              accept="image/*"
              onChange={handleFileChange}
            />
          </ProfileUpload>
        </ProfileContent>
        <Content>
          <label htmlFor="companyName">
            <div>Razão Social</div>
            <input
              type="text"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>
          <label htmlFor="fantasyName">
            <div>Nome Fantasia</div>
            <input
              type="text"
              id="fantasyName"
              value={fantasyName}
              onChange={(e) => setFantasyName(e.target.value)}
            />
          </label>
          <label htmlFor="cnpjCpf">
            <div>CNPJ</div>
            <input
              type="text"
              id="cnpjCpf"
              value={cnpjCpf}
              onChange={(e) => setCnpjCpf(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <div>E-mail</div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="phone1">
            <div>Telefone 1</div>
            <input
              type="text"
              id="phone1"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
            />
          </label>
          <label htmlFor="phone2">
            <div>Telefone 2</div>
            <input
              type="text"
              id="phone2"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
            />
          </label>
          <label htmlFor="address">
            <div>Endereço</div>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setPhone2(e.target.value)}
            />
          </label>
          <label htmlFor="zip">
            <div>CEP</div>
            <input
              type="text"
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </label>
          <label htmlFor="neighborhood">
            <div>Bairro</div>
            <input
              type="text"
              id="neighborhood"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </label>
          <label htmlFor="city">
            <div>Cidade</div>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </label>
          <label htmlFor="state">
            <div>Estado</div>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </label>
        </Content>
        <Button type="button" width="20%" onClick={handleUpdateCompany}>
          Salvar
        </Button>
      </Container>
    </Wrapper>
  );
};

export default Company;
