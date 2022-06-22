import { Outlet, NavLink } from 'react-router-dom';
import reactImage from '@/assets/images/react.png'

const Index = () => (
  <div>
    <img src='/static/react.png'/>
    <img src={reactImage}/>
    <NavLink to='/page1'>page1</NavLink>
    <NavLink to='/page2'>page2</NavLink>
    <div style={{ paddingTop: '20px' }}>
      <Outlet />
    </div>
  </div>
);

export default Index;
