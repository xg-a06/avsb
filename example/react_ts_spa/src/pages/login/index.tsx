import { useLogin } from '@/services/userService';
// "react/jsx-uses-react": "off",
//     "react/react-in-jsx-scope": "off"
const test = {
  name: 'txdoctor1',
  password: 'a6b2df636ed296abfd1d3f9128d2a04ddc3a9621501920518a60493505e96c7d',
};
const Index = () => {
  const { mutate } = useLogin();
  return <button onClick={() => mutate(test)}>login</button>;
};

export default Index;
