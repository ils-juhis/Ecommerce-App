import './App.scss';
import { BrowserRouter} from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import { useEffect} from 'react';
import { checkAuthStatus } from './store/actions/AuthActions/AuthActions';
import { useDispatch } from 'react-redux';
import Routers from './routes/Routers';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(checkAuthStatus())
  },[])

  return (
    <BrowserRouter>
      <ScrollToTop/>
      <Routers/>
      <Toaster/>
    </BrowserRouter>
  );
}

export default App;
