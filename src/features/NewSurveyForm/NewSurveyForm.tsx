import classes from "./NewSurveyForm.module.scss";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Input, Space } from "antd";
import { SizeType } from "antd/es/config-provider/SizeContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { submitForm } from "../../app/services/createForm";
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { produceWithPatches } from "immer";
interface NewSurveyFormProps {
    onClose: () => void
}

const DATE_FORMAT = 'DD.MM.YYYY'

const NewSurveyForm = (props: NewSurveyFormProps) => {
    const componentSize = "small";
    const { register, handleSubmit, clearErrors, reset, watch, control, formState: { errors } } = useForm();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = (data: any) => console.log(data);

    const submitFormHandle = async (data: any) => {

        const res = handleSubmit(async data => {
            console.log("data", data)
            await dispatch(submitForm({
                ...data,
                startDate: dayjs(data.startDate, DATE_FORMAT).toISOString(),
                finishDate: dayjs(data.finishDate, DATE_FORMAT).toISOString(),
            }));
            reset({})
            props.onClose();
        },
            (errors) => {
                console.log(errors)
            })
        res()

        // props.onClose();
        // handleSubmit()
    }

    const startDateProps = register("finishDate");
    const onClose = () => {
        reset({})
        props.onClose();
    }
    console.log("startDateProps", startDateProps)

    return <div className={classes.Form}>

        <Form
            layout="vertical"
            initialValues={{ size: componentSize }}
        >
            <Form.Item label="Введите название опроса: ">
                <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <Input
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        ref={field.ref}
                    />}
                />

                {errors.name && <div className={classes.Error}>Поле обязательно для заполнения</div>}
            </Form.Item>




            <Form.Item label="Дата начала опроса">

                <Controller
                    name="startDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => {
                        return <DatePicker
                            placeholder=""
                            style={{
                                width: "100%"
                            }}
                            format={'DD.MM.YYYY'}
                            value={field.value ? dayjs(field.value, 'DD.MM.YYYY') : null}
                            ref={field.ref} onBlur={field.onBlur} onChange={(date, dateString) => {
                                console.log("params", dateString)
                                field.onChange(dateString)
                            }} />
                    }}
                />

                {errors.startDate && <div className={classes.Error}>Поле обязательно для заполнения</div>}
            </Form.Item>

            <Form.Item label="Дата окончания опроса">
                <Controller
                    name="finishDate"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => <DatePicker
                        placeholder=""
                        style={{
                            width: "100%"
                        }}
                        format={'DD.MM.YYYY'}
                        value={field.value ? dayjs(field.value, 'DD.MM.YYYY') : null}
                        ref={field.ref} onBlur={field.onBlur} onChange={(date, dateString) => {
                            field.onChange(dateString)
                        }} />}
                />

                {errors.finishDate && <div className={classes.Error}>Поле обязательно для заполнения</div>}
            </Form.Item>

            <Space wrap style={{ width: '100%', justifyContent: 'right', paddingTop: 10 }}>
                <Button onClick={submitFormHandle} type="primary">Сохранить</Button>
                <Button onClick={onClose}>Отмена</Button>
            </Space>
        </Form>
    </div>
}

export default NewSurveyForm