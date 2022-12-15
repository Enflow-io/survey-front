import React, { useCallback, useEffect, useState } from 'react';
import MainLayout from '../Layout/Layout';
import { StylesManager, Model, SurveyModel } from 'survey-core';
import "./../Layout/theme.css"
import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react-ui';
import classes from "./PublicServeyPage.module.scss"
import { useParams } from 'react-router-dom';
import { useGetSurveyByIdQuery, useGetSurveyByLinkQuery } from '../app/services/survey';
import { useAddNewAnswerMutation } from '../app/services/answer.service';
import { RingLoader } from "react-spinners"
import "survey-core/survey.i18n";
StylesManager.applyTheme("defaultV2");



function PublicSurveyPage() {
    let { id } = useParams();
    const { data, isLoading } = useGetSurveyByLinkQuery((id || "1"))
    const [addNewAnswer] = useAddNewAnswerMutation()

    const [survey, setSurvey] = useState<Model | undefined>(undefined);


    useEffect(() => {
        if (!data?.config) {
            return;
        }
        const surveyComplete = async (sender: any) => {
            addNewAnswer({
                data: sender.data,
                surveyLink: id
            })
        }

        const survey = new Model(JSON.parse(data?.config));
        survey.onComplete.add(surveyComplete);
        survey.locale = "ru";

        setSurvey(survey);
    }, [data])



    const isReady = data?.config && survey;
    // return <div className={classes.Page}>

    if(!data?.config && data?.id){
        return <div>Опрос не сконфигурирован</div>
    }
    return <div >
        {(!isReady) && <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <RingLoader size={160} color="#1677ff" cssOverride={{
                margin: "0 auto"
            }} />
        </div>}
        {isReady &&
            <div id='survey-public-page'>
                <Survey
                    // onComplete={(data: any) => {
                    //     addNewAnswer({
                    //         data: data.data,
                    //         surveyId: id
                    //     })
                    // }}
                    model={survey}
                />
            </div>
            }

    </div>;

}

export default PublicSurveyPage;
