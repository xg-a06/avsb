import { Outlet, NavLink } from 'react-router-dom';
import reactImage from '@/assets/images/react.png'


const Index = () => (
  <div>
    <img style={{"vertical-align": "middle"}} src='/static/react.png'/>
    <img style={{"vertical-align": "middle"}}  src={reactImage}/>
    <NavLink style={{"color": "#1890ff"}} class="" to='/page1'>page1</NavLink>
    <NavLink style={{"color": "#1890ff"}} to='/page2'>page2</NavLink>
    <div style={{ paddingTop: '20px' }}>
      <Outlet />
    </div>
  </div>
);

export default Index;
