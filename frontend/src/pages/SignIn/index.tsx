import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import cogoToast from 'cogo-toast';
import Button from 'components/Button';
import Input from 'components/Input';
import { useAuth } from 'context/AuthContext';
import {
  Background,
  Container,
  Content,
  AnimationContainer,
} from 'pages/SignIn/styles';
import React, { useCallback, useRef } from 'react';
import { Lock, Mail } from 'react-feather';
import getValidationErrors from 'utils/getValidationErrors';
import * as Yup from 'yup';
import { ParamsFormData } from './ParamsFormData';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: ParamsFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, { abortEarly: false });
        await signIn({ email: data.email, password: data.password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          error.errors.forEach((err: string) => {
            cogoToast.error(err, { hideAfter: 5 });
          });
        } else {
          cogoToast.error(error.response.data.message, { hideAfter: 5 });
        }
      }
    },
    [signIn],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <h1>Loge</h1>
          <h2>Gestão de Orçamento</h2>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              text="E-mail"
              icon={Mail}
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              text="Senha"
              icon={Lock}
            />
            <Button type="submit" width="100%">
              Entrar
            </Button>
            <div>
              <span>v0.0.1</span>
              <a href="/forgot">Esqueci minha senha</a>
            </div>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
