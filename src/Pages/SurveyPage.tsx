import React, { useEffect, useState } from 'react';
import MainLayout from '../Layout/Layout';

import { StylesManager } from 'survey-core';
import { localization } from "survey-creator-core";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import { ExclamationCircleFilled } from '@ant-design/icons';
import "survey-creator-core/survey-creator-core.css";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-core/defaultV2.css";
import "./../Layout/theme.css"
import { Button, Space, Spin, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LayoutPage from '../Layout/LayoutPage';
import { RingLoader } from "react-spinners"
import { useBulkDeleteSurveysMutation, useGetSurveyByIdQuery, usePublicateSurveyMutation, useUpdateSurveyMutation } from '../app/services/survey';
import { ToastContainer, toast } from 'react-toastify';
import 'survey-core/defaultV2.min.css';

import 'react-toastify/dist/ReactToastify.css';
import "./tagbox.scss";
const { confirm } = Modal;

StylesManager.applyTheme("defaultV2");
localization.currentLocale = "ru";



function SurveyPage() {
    const [updateSurvey, response] = useUpdateSurveyMutation();
    const [localConfig, setLocalConfig] = useState<any>(undefined);
    const [creator, setCreator] = useState<any>(undefined);
    const [configUpdated, setConfigUpdated] = useState(false)
    const navigate = useNavigate();
    let { id } = useParams();
    const { data, isLoading } = useGetSurveyByIdQuery((id || "1"))
    const [publicateSurvey, response2] = usePublicateSurveyMutation()
    const [deleteBulkSurvey, response3] = useBulkDeleteSurveysMutation()

    const options = {
        showLogicTab: true,

    };

    // const creator = new SurveyCreator(options);



    useEffect(() => {


        if (data === undefined || configUpdated) {
            return;
        }
        setLocalConfig(data?.config ? data.config : "{}");

        setConfigUpdated(true)

        const creator = new SurveyCreator(options);
        // @ts-ignore
        creator.text = data.config



        {/* @ts-ignore */ }
        creator.saveSurveyFunc = async (saveNo: number, callback: any) => {
            {/* @ts-ignore */ }
            // setLocalConfig(creator.text);
            await updateSurvey({
                id: id,
                // @ts-ignore
                config: creator.text
            })





            {/* @ts-ignore */ }
            // callback(saveNo, true);
        };

        setCreator(creator)



    }, [data])

    // @ts-ignore
    // creator.text = localConfig


    const deleteConfirm = () => {
        confirm({
            title: 'Вы уверены, что хотите удалить этот опрос?',
            icon: <ExclamationCircleFilled />,
            content: 'Нажимая кнопку "ок" вы подтверждаете, что информация будет удалена.',
            onOk: async () => {
                await deleteBulkSurvey({
                    ids: [id]
                })
                navigate("/")
            },
            onCancel() { },
        });
    };


    const hContent = <>
        <Space>
            <label style={{
                fontSize: 25,
                left: 50,
                position: "absolute",
                top: 0
            }}>Опрос</label>
        </Space>

        <Space style={{
            position: "absolute",
            right: "15px"
        }}>
            <Button type="primary" onClick={async () => {
                console.log(creator);
                creator.doSave();
                toast("Сохранено");
            }} icon={<DownloadOutlined />}>Сохранить</Button>
            <Button onClick={() => {
                navigate('/survey/' + id + '/analytics')
            }}>Анализ результатов</Button>
            {data?.link &&
                <Button onClick={() => {
                    window.open('/s/' + data?.link, '_blank');
                }}>Открыть публикацию</Button>

            }
            {!data?.link &&
                <Button loading={response2.isLoading} onClick={() => {
                    publicateSurvey(data?.id)
                }}>Опубликовать</Button>
            }
            <Button danger onClick={deleteConfirm} >Удалить</Button>

        </Space></>

    // debugger
    return <LayoutPage headerContent={hContent}>
        <>
            {(isLoading || !configUpdated) && <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <RingLoader size={160} color="#1677ff" cssOverride={{
                    margin: "0 auto"
                }} /></div>}

            {/* @ts-ignore */}
            {!isLoading && configUpdated && creator && <SurveyCreatorComponent
                creator={creator}
            />}
            <ToastContainer position="bottom-right" autoClose={1400}/>
        </>


    </LayoutPage>



}

export default SurveyPage;
