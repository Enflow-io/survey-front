import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../Layout/Layout';
import 'survey-analytics/survey.analytics.min.css';
import { Model } from 'survey-core';
import { VisualizationPanel } from 'survey-analytics';
import * as SurveyAnalyticsTabulator from "survey-analytics/survey.analytics.tabulator";
import { Button, Space } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import LayoutPage from '../Layout/LayoutPage';
import { useGetSurveyByIdQuery } from '../app/services/survey';
import { Answer, useGetAnswersQuery } from '../app/services/answer.service';
import { Spinner } from '../features/Spinner';
import "./../Layout/theme.css"
import "tabulator-tables/dist/css/tabulator.css";
import "survey-analytics/survey.analytics.tabulator.css";

function AnalyticsPage() {
    let { id } = useParams();
    const { data, isLoading } = useGetSurveyByIdQuery((id || "1"))
    const { data: answersData, error: answersErr, isLoading: answersIsLoading } = useGetAnswersQuery(id, {
        refetchOnMountOrArgChange: 1
    })
    const [survey, setSurvey] = useState<any>(null);
    const [vizPanel, setVizPanel] = useState<any>(null);
    const navigate = useNavigate();

    const results = answersData ? answersData.map((el: Answer) => el.data) : []


    // all data is ready
    useEffect(() => {
        if (data && answersData) {
            const survey = new Model(data?.config);
            setSurvey(survey);

            const vizPanelOptions = {
                allowHideQuestions: false
            }

            console.log("qustions", survey.getAllQuestions())
            console.log("results", results)

            const vizPanel = new VisualizationPanel(
                survey.getAllQuestions(),
                results,
                vizPanelOptions
            );
            setVizPanel(vizPanel);

            const surveyAnalyticsTabulator = new SurveyAnalyticsTabulator.Tabulator(survey, results);
            const panel1Node = document.getElementById("surveyVizTabulator");
            if(panel1Node){
                surveyAnalyticsTabulator.render(panel1Node);
            }
            
        }

    }, [data, answersData]);




    // Render results if vizPanel exists
    useEffect(() => {
        if (vizPanel) {
            vizPanel.render("surveyVizPanel");
            return () => {
                if (document && document.getElementById) {
                    const item = document.getElementById("surveyVizPanel")
                    if (item) {
                        item.innerHTML = "";
                    }
                }
            }
        }
    }, [vizPanel]);

    return <LayoutPage headerContent={<>
        <label style={{
            fontSize: 25,
            position: "absolute",
            top: 0,
            left: 50,
        }}>Результаты опроса</label>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: "end" }}>
            <Button onClick={() => {
                // alert(`/survey/${id}/analytics`)
                navigate(`/survey/${id}`)
            }} >Назад к опросу</Button>

        </Space>
    </>}>

        <>
            {!vizPanel && <Spinner />}
            <div id="surveyVizPanel" />
            <div id="surveyVizTabulator" />
        </>
    </LayoutPage >


}
export default AnalyticsPage;
