import React, { useEffect, useState } from 'react';
import MainLayout from '../Layout/Layout';
import 'survey-core/defaultV2.min.css';
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-creator-core/survey-creator-core.css";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-core/defaultV2.css";
import "./../Layout/theme.css"
import { Button, Col, Row, Space, Statistic } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import LayoutPage from '../Layout/LayoutPage';
import { Avatar, Divider, List, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

interface DataType {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  }
  


function DashboardPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<DataType[]>([]);
  
    const loadMoreData = () => {
        if (loading) {
          return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
          .then((res) => res.json())
          .then((body) => {
            setData([...data, ...body.results]);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      };
    
      useEffect(() => {
        loadMoreData();
      }, []);


    const options = {
        showLogicTab: true
    };
    const navigate = useNavigate();
    const creator = new SurveyCreator(options);

    console.log(SurveyCreatorComponent)
    const hContent = <></>
    return <LayoutPage headerContent={hContent}>
        <div style={{
            paddingLeft: 20
        }}>
            <Row gutter={16}>
                <Col span={4}>
                    <Statistic title="Активных опросов" value={2} />

                </Col>
                <Col span={4}>
                    <Statistic title="Ответов за сутки" value={10} precision={2} />
                </Col>
                <Col span={4}>
                    <Statistic title="Просмотров за сутки" value={100} />
                </Col>
            </Row>
            <Row gutter={16}>
                

                <Col span={12}>
                <h2>Последние действия</h2>
                    <div
                        id="scrollableDiv"
                        style={{
                            height: 400,
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={data.length}
                            next={loadMoreData}
                            hasMore={data.length < 50}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                dataSource={data}
                                renderItem={(item) => (
                                    <List.Item key={item.email}>
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.picture.large} />}
                                            title={<a href="https://ant.design">{item.name.last}</a>}
                                            description={item.email}
                                        />
                                        <div>Content</div>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    </div>
                </Col>
            </Row>

        </div>


    </LayoutPage>



}

export default DashboardPage;
