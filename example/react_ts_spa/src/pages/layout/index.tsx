import { Outlet, NavLink } from 'react-router-dom';

const Index = () => (
  <div>
    <NavLink to='/page1'>page1</NavLink>
    <NavLink to='/page2'>page2</NavLink>
    <div style={{ paddingTop: '20px' }}>
      <Outlet />
    </div>
  </div>
);

export default Index;
