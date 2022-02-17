import React, { useState } from 'react';
import { Typography, Card, Row, Col, Avatar, Select } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://www.uptobrain.com/business/wp-content/uploads/2021/02/Bitcoin-news-Cryptocurrency-news-Blockchain-news-ICOs.jpg';

const News = ({ simplified }) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });
    const { data } = useGetCryptosQuery(100);
    if(isFetching) return <Loader />
    return (
        <>
            <Row gutter={[12, 12]}>
                {
                    !simplified && (
                        <Col span={24}>
                            <Select
                                showSearch
                                className='select-news'
                                placeholder="select a crypto"
                                optionFilterProp='children'
                                onChange={(value) => setNewsCategory(value)}
                                filterOption={(input, option) => option.children.toLowercase().indexOf(input.toLowerCase())}
                            >
                                <Option value="Cryptocurrency"></Option>
                                {data?.data?.coins?.map((coin) => <Option value={coin?.name}>{coin?.name}</Option>)}
                            </Select>
                        </Col>
                    )
                }
                {cryptoNews?.value?.map((news, i) => (
                    <Col xs={24} sm={12} lg={8} key={i}>
                        <Card hoverable className='news-card'>
                            <a href={news.url} rel='noreferrer' target='_blank'>
                                <div className="news-image-container">
                                    <Title className='news-title' level={4}>
                                        {
                                            news.name.length > 100
                                                ? `${news.name.substring(0, 100)}...`
                                                : news.name
                                        }
                                    </Title>
                                    <img style={{ maxWidth: '100px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="image" />
                                </div>
                            </a>
                            <p>
                                {news?.description.length >= 100
                                    ? `${news?.description.substring(0, 100)}...`
                                    : news.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='image' />
                                    <Text className='provider-name'>{news?.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news?.datePublished).startOf('seconds').fromNow()}</Text>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default News;