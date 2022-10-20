import React, { useEffect, useState } from 'react'
import { Avatar, Card, Col, Row, Select, Typography } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../../services/cryptoApi';


function News({simplified}) {

  const [coin,setCoins]=useState('Bitcoin');
  const{data:cryptosList}=useGetCryptosQuery(100);  

  const count= simplified? 6:100; 
  const{Text,Title} =Typography;
  const {Option}=Select;
  

  const{data:cryptoNews, isFetching}=useGetCryptoNewsQuery(coin);

  const demoImage='http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

  //console.log(cryptoNews?.news);
  //console.log(cryptosList?.data?.coins)
  
  const list_news=cryptoNews?.news;
  
  if(isFetching) return 'Loading News... '

  //(input,option)=>option?.children.toLowerCase().indexOf(input.toLowerCase())=>0
  return (
    <div>
       {!simplified &&( 

          <Col span={24}>
              <Select className='select-news' showSearch placeholder='Select Crypto' 
                optionFilterProp='children' onChange={(value)=>setCoins(value)} 
                filterOption={(input,option)=> option.children.toLowerCase().indexOf(input.toLowerCase())>=0} 
              >
                    {
                      cryptosList?.data?.coins?.map((coin)=> <Option value={coin.name} key={coin.uuid}> {coin.name} </Option>)
                    }
              </Select>
          </Col>

       )} 

      <Row gutter={[24,24]}>
        { 
          list_news.slice(0,count).map((news,i)=>(
            <Col xs={24} sm={12} lg={8} key={i}>
                <Card className='news-card' hoverable>
                  <a href={news.url} target='_blank' rel="noopener noreferrer" >
                    
                    <div className='news-image-container'>
                        <Title className='news-title' level={4}>{news.title}</Title>
                        <img src={demoImage} className='ímg' alt="" style={{width: 200, height:100}}/>
                    </div>
                    
                    <p> {news.title.length>30 ? `${news.title.substring(0,30)}...`:news.title} </p>
                    <div className='provider-container'>
                        <div>
                            <Avatar src={demoImage} alt=''/>
                            <Text>{news.source_name}</Text>
                        </div>
                        <Text>{moment(news.created_at).startOf('ss').fromNow()}</Text>
                    </div>
                  </a>                
                </Card>
            </Col>
          ))
        }
      </Row>

    </div>
  )
}

export default News