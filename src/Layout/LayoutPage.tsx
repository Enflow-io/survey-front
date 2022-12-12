import { Content, Header } from "antd/es/layout/layout";
import { Button, Layout, Menu, Space, theme } from 'antd';
import { ReactElement } from "react";
interface LayoutPageProps {
    children: ReactElement
    headerContent: ReactElement
}
const LayoutPage = (props: LayoutPageProps) => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();


    return <>
        <Header style={{
            padding: 0,
            background: colorBgContainer
        }}>
            <div style={{
                paddingLeft: 60,
                paddingRight: 20
            }}>
                {props.headerContent}
            </div>
        </Header>
        <Content
            style={{
                margin: '20px 0px',
                height: 'calc(100vh - 105px)',

                padding: 10,
                minHeight: 280,
                background: colorBgContainer,
                overflow: "scroll"
            }}
        >
            {props.children}
        </Content>
    </>
}

export default LayoutPage;