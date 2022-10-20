import React, { useState } from 'react'

import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import millify from 'millify';
import {Col, Row,Typography,Select} from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../../services/cryptoApi';
import LineChart from './LineChart';



const  {Title,Text} =Typography;
const {Option}=Select;

function Cryptodetails() {

  const {coinId}=useParams();
  const [timePeriod,setTimePeriod]=useState('1y');

  const {data, isFetching}= useGetCryptoDetailsQuery(coinId);
  const {data:coinHistory}=useGetCryptoHistoryQuery({coinId,timePeriod});

  console.log(timePeriod);

  const cryptoDetails=data?.data?.coin;

  const time=['3m','3h','24h','30d','7d','1y','3y','5y'];

  const stats=
    [
      {title:'Price to USD', value:`$ ${cryptoDetails?.price && millify(cryptoDetails?.price) }`, icon: <DollarCircleOutlined/>},
      {title:'Rank', value:cryptoDetails?.rank, icon:<NumberOutlined/>},
      {title:'24h Volume' , value:`$ ${cryptoDetails?.['24hVolume'] && millify(cryptoDetails?.['24hVolume'])}`, icon: <ThunderboltOutlined/> },
      {title:'Market Cap', value:`$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon:<DollarCircleOutlined/>},
      {title:'All-time-high', value:`$${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon:<TrophyOutlined/> }
    ];  
  
   const genericStats=
   [
    {title:'Number of Markets', value:cryptoDetails?.numberOfMarkets, icon:<FundOutlined/>},
    {title:'Numer of Exchanges', value:cryptoDetails?.numberOfExchanges,icon:<MoneyCollectOutlined/>},
    {title:'Approved Supply', value:cryptoDetails?.supply?.confirmed ? <CheckOutlined/>: <StopOutlined/>, icon:<ExclamationCircleOutlined/>},
    {title:'Total Supply', value:`$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`, icon:<ExclamationCircleOutlined/>},
    {title:'Circulating Supply', value:`$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon:<ExclamationCircleOutlined/>}
   ]   

    
   if(isFetching) return ( 'Loading Crypto Details... ')

   return (
      <Col className='coin-detail-container'>
          <Col className='coin-heading-container'>
              <Title level={2} className='coin-name'> {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price </Title>
                <p>{cryptoDetails?.name} live price in US Dollars. View live statistics,market cap and supply</p>
          </Col>
            <Select className='select-timeperiod' defaultValue='7d' placeholder='Select Time Period' onChange={(value)=>setTimePeriod(value)}>
              {
                time.map( (time)=> <Option key={time}> {time} </Option>
              
              )}
            </Select>      
          
          {/*********** Grafico *******************/}
          <LineChart coinHistory={coinHistory} currentPrice={cryptoDetails?.price} coinName={cryptoDetails?.name}/>
          
          <Col className='stats-container'>
              <Col className='coin-value-statistics'>
                <Col className='coin-value-statistics-heading'>
                   <Title level={3} className='coin-details-heading'>{cryptoDetails?.name} Value Statistics</Title>
                   <p>An overview showing the stats of {cryptoDetails?.name}, such as the base and quote currency, the rank, and trading volume.</p> 
                </Col>
                  {stats.map(({icon,title,value})=>(
                    <Col className='coin-stats' key={title}>
                        <Col className='coin-stats-name' >
                            <Text>{icon}</Text>
                            <Text>{title}</Text>
                        </Col>
                        <Text className='stats'> {value}</Text>                          
                    </Col>
                  ))}
              </Col>

              <Col className='other-value-statistics'>
                <Col className='coin-value-statistics-heading'>
                   <Title level={3} className='coin-details-heading'>Other Statistics</Title>
                   <p>An overview showing the stats of other cryptocurrencies, such as the base and quote currency, the rank, and trading volume </p> 
                </Col>
                {genericStats.map(({icon,title,value})=>(
                  <Col className='coin-stats' key={title}>
                      <Col className='coin-stats-name' >
                          <Text>{icon}</Text>
                          <Text>{title}</Text>
                      </Col>
                      <Text className='stats'> {value}</Text>                          
                  </Col>
                ))}
              </Col>   
          </Col>
          <Col className='coin-desc-link'>
                <Row className='coin-desc'>
                    <Title level={3} className='coin-details-heading'> What is {cryptoDetails?.name}? </Title>
                     {HTMLReactParser(' '+cryptoDetails?.description)} 
                </Row>
                <Col className='coin-links'>
                  <Title level={3} className='coin-details-heading'> {cryptoDetails?.name} Links </Title>
                    {
                      cryptoDetails?.links.map((link)=>(
                        <Row className='coin-link' key={link?.name}>
                          <Title level={4} className='link-name'>{link?.type} </Title>
                          <a href={link?.url} target='_blank' rel='norefer'> {link?.name}</a>
                        </Row>
                      ))
                    }
                </Col>
          </Col>      

      </Col>
  )
}

export default Cryptodetails