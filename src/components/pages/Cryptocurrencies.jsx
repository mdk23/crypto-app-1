import React, { useState,useEffect } from 'react';
import millify from 'millify';
import {Link} from 'react-router-dom';
import{Card,Row,Col,Input} from 'antd';
import { useGetCryptosQuery } from '../../services/cryptoApi';
//import { ConsoleSqlOutlined } from '@ant-design/icons';


function Cryptocurrencies({simplified}) {
  const count= simplified? 10:100; 
  const{data:cryptosList,isFetching}=useGetCryptosQuery(count);  
  const[cryptos,setCryptos]=useState([]);

  const [searchTerm,setSearchTerm]=useState('');

  console.log(searchTerm);

 useEffect(()=>{
    const coinLowerCase=searchTerm.toLowerCase();

    const filteredData=cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(coinLowerCase));

    setCryptos(filteredData);
 },[cryptosList,searchTerm])

  if(isFetching) return 'Loading CryptoCurrencies List'

  return ( 
    <>
        
        { !simplified &&(
             <div className='search-crypto'>
             <Input placeholder='Search for cryptocurrencies' onChange={(e)=>setSearchTerm(e.target.value)} />
             </div>
          )
        }
        
        <Row gutter={[32,32]} className='crypto-card-container'>
            {
                cryptos?.map((currency)=>(
                  <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.uuid}> 
                      <Link to={`/crypto/${currency.uuid}`}>
                          <Card title={`${currency.rank}. ${currency.name}`} extra={<img className='crypto-image' src={currency.iconUrl} alt=""/>} hoverable>
                              <p>Price: {millify(currency.price)} </p>
                              <p>Market Cap: {millify(currency.marketCap)} </p>
                              <p>Daily Change: {currency.change}% </p>
                          </Card>
                      </Link>
                  </Col>
                ))
            }
        </Row>
    </>
  )
}

export default Cryptocurrencies