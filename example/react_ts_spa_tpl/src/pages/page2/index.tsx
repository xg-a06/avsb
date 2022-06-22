import styled from '@emotion/styled';

interface StyledButtonProps {
  primary?: boolean;
}

interface StyledContainerProps {
  column?: boolean;
}

const Button = styled.button<StyledButtonProps>`
  width: 200px;
  color: ${(props) => (props.primary ? 'hotpink' : 'turquoise')};
`;

const Container = styled.div<StyledContainerProps>`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
`;

const Index = () => {
  return (
    <Container column>
      <Button primary>222</Button>
      <Button>1111</Button>
    </Container>
  );
};

export default Index;
