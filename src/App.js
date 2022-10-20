 
//import { Link,BrowserRouter,Routes,Route } from 'react-router-dom';
//import {Layout,Space,Typography} from 'antd';

import { Layout, Typography,Space } from 'antd';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import {Navbar,Home, Exchanges, Cryptocurrencies, Cryptodetails, News} from './components';


function App() {
  return (
    <div className="app">
        <div className='navbar'>
          <Navbar/>
        </div>
        
        <div className='main'>
          <Layout>
             <div className='routes'>
                <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/exchanges' element={<Exchanges/>}/>
                  <Route path='/cryptocurrencies' element={<Cryptocurrencies/>}/>
                  <Route path='/crypto/:coinId' element={<Cryptodetails/>}/>
                  <Route path='/news' element={<News/>}/>
                </Routes>
             </div>
          </Layout>
       
        
            <div className='footer' >
              <Typography.Title level={4} style={{color:'white', textAlign:'center'}}>
                  Crypto Verse<br/>
                  All rights Reserved 
                  <br/>
                  <Space>
                    <Link to="/">Home</Link>
                    <Link to="/exchanges">Exchanges</Link>
                    <Link to="/news">News</Link>
                  </Space>  
              </Typography.Title>
            </div>
        </div>
    </div>
  );
}

export default App;
