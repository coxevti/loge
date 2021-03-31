import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 1;
  padding: 35px 20px 20px 20px;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: 800px) {
    grid-template-columns: repeat(1, 1fr);
  }
  gap: 20px;
  width: 100%;
  padding: 30px 0px;
  label {
    input {
      width: 100%;
      margin-top: 10px;
    }
  }
`;

export const ProfileContent = styled.div`
  position: relative;
`;

export const ProfileImage = styled.div`
  border-radius: 1000px !important;
  overflow: hidden;
  width: 128px;
  height: 128px;
  border: 8px solid rgba(255, 255, 255, 0.7);
  top: 72px;
  img {
    max-width: 100%;
    height: auto;
  }
`;

export const ProfileUpload = styled.div`
  position: absolute;
  top: 90px;
  right: 8px;
  color: #666;
  transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
  &:hover {
    transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
  }
  svg {
    cursor: pointer;
    font-size: 1.2em;
    &:hover {
      transition: all .3s cubic-bezier(.175, .885, .32, 1.275);
      color: #999;
    }
  }
  .file-upload {
    display: none;
  }
`;
