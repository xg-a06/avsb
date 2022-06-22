import { FC } from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { User } from '@/services/types/user';
import { useCheckLogin } from '@/services/userService';
import routes from './config';

interface PropTypes {
  auth: User | undefined;
}

const Routes: FC<PropTypes> = ({ auth = {} }) => {
  const routing = useRoutes(routes(auth));
  return routing;
};

const Router = () => {
  const { data } = useCheckLogin();

  return (
    <BrowserRouter>
      <Routes auth={data} />
    </BrowserRouter>
  );
};

export default Router;
