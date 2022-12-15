import React, { useEffect, useState } from 'react';
import { Button, Space } from 'antd';
import { Table, Modal, theme } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useNavigate } from "react-router-dom";
import { ExclamationCircleFilled } from '@ant-design/icons';
import LayoutPage from '../Layout/LayoutPage';
import { DateTime } from "luxon";
import { Survey, useAddNewSurveyMutation, useBulkDeleteSurveysMutation, useGetSurveysQuery } from '../app/services/survey';
import NewSurveyForm from '../features/NewSurveyForm/NewSurveyForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useAuth } from '../app/hooks';
const { confirm } = Modal;


const columns: ColumnsType<Survey> = [
    {
        title: 'ID',
        dataIndex: 'id',

    },
    {
        title: 'Название',
        dataIndex: 'name',
    },
    {
        title: 'Дата создания',
        dataIndex: 'createdDate',
        render: (val) => val ? DateTime.fromISO(val).toLocaleString(DateTime.DATETIME_MED) : "–"
    },
    // {
    //     title: 'Дата окончания',
    //     dataIndex: 'finishDate',
    //     render: (val) => val ? DateTime.fromISO(val).toLocaleString(DateTime.DATETIME_MED) : "–"
    // },
    {
        title: 'Ссылка',
        dataIndex: 'link',
        render: (val) => val ? <a onClick={(e) => {
            e.stopPropagation();
        }} href={'/s/' + val} target={"_blank"}>открыть</a> : "–"

    },
];


function MainPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const auth = useAuth();
    useEffect(() => {
        if (!auth?.token) {
            return navigate("/login")
        }
    }, [auth])



    const [selectedRows, setSelectedRows] = useState<Survey[]>([]);
    const { data, error, isLoading } = useGetSurveysQuery({
        // refetchOnMountOrArgChange: true
    })
    const [createModalOpened, setCreateModalOpened] = useState(false);
    const [addNewSurvey, response] = useAddNewSurveyMutation()
    const [deleteBulkSurvey, response2] = useBulkDeleteSurveysMutation()


    const deleteConfirm = () => {
        confirm({
            title: 'Вы действительно хотите удалить элемент',
            icon: <ExclamationCircleFilled />,
            content: 'После удаления элемент будет невозможно восстановить.',
            onOk() {
                return deleteBulkSurvey({
                    ids: [...selectedRows.map(el => el.id)]
                })
            },
            onCancel() { },
        });
    };



    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: Survey[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectedRows(selectedRows)
        },
        getCheckboxProps: (record: Survey) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('checkbox');

    const headerContent = <>
        <label style={{
            fontSize: 25,
            position: "absolute",
            left: 50
        }}>Список опросов</label>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: "end" }}>
            <Button onClick={() => setCreateModalOpened(true)}>Создать опрос</Button>
            {selectedRows?.length > 0 &&
                <Button danger onClick={deleteConfirm}>Удалить</Button>
            }

        </Space></>
    return <>

        <LayoutPage headerContent={headerContent}>



            <Table
                loading={isLoading}
                scroll={{ y: 'calc(100vh - 250px)', x: 500 }}
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ pageSize: 50 }}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: async (event) => {
                            navigate(`/survey/${record.id}`);
                            console.log(record.id);
                        }, // click row
                        onDoubleClick: (event) => { }, // double click row
                        onContextMenu: (event) => { }, // right button click row
                        onMouseEnter: (event) => { }, // mouse enter row
                        onMouseLeave: (event) => { }, // mouse leave row
                    };
                }}
            />
        </LayoutPage>


        <Modal
            title="Создание опроса"
            open={createModalOpened}
            onCancel={() => setCreateModalOpened(false)}
            footer={null}
            width={320}
        >
            <NewSurveyForm onClose={() => setCreateModalOpened(false)} />
        </Modal>

    </>;
}

export default MainPage;
