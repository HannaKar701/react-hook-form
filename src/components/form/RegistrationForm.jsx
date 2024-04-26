import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Input, Radio, DatePicker, Button } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import { constants } from '../../constants/constants';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const RegistrationForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] = useState(false);
    const nameInput = useRef(null);
    const {
        handleSubmit,
        control,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
    });

    const togglePasswordVisibility = () => {
        setIsVisible((state) => !state);
    };
    const toggleConfirmPasswordVisibility = () => {
        setIsVisibleConfirmPassword((state) => !state);
    };

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
        reset();
        toast.success(constants.successSubmit);
    };

    useEffect(() => nameInput.current.focus(), []);

    const password = watch('password', '');

    return (
        <>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>{constants.labelName}</label>
                    <Controller
                        name="text"
                        control={control}
                        rules={{ required: constants.requiredInput }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                ref={nameInput}
                                placeholder={constants.namePlaceholder}
                            />
                        )}
                    />
                    {errors?.text && <p>{errors.text?.message || constants.error}</p>}
                </div>

                <div>
                    <label>{constants.labelEmail}</label>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: constants.requiredInput,
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                message: constants.correctMail,
                            },
                        }}
                        render={({ field }) => (
                            <Input {...field} placeholder={constants.emailPlaceholder} />
                        )}
                    />
                    {errors?.email && <p>{errors.email?.message || constants.error}</p>}
                </div>

                <div>
                    <label>{constants.passwordLabel}</label>
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: constants.requiredInput,
                            minLength: {
                                value: 6,
                                message: constants.passwordSymbolAmount,
                            },
                            pattern: {
                                value: /^(?=.*[A-Z]).+$/,
                                message: constants.passwordCapitalLetter,
                            },
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type={isVisible ? 'text' : 'password'}
                                placeholder={constants.passwordPlaceholder}
                                suffix={
                                    isVisible ? (
                                        <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
                                    ) : (
                                        <EyeOutlined onClick={togglePasswordVisibility} />
                                    )
                                }
                            />
                        )}
                    />
                    {errors?.password && <p>{errors.password?.message || constants.error}</p>}
                </div>

                <div>
                    <label>{constants.passwordConfirmLabel}</label>
                    <Controller
                        name="repeatPassword"
                        control={control}
                        rules={{
                            required: constants.requiredInput,
                            validate: (value) => value === password || constants.passwordMismatch,
                        }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type={isVisibleConfirmPassword ? 'text' : 'password'}
                                placeholder={constants.passwordConfirmationPlaceholder}
                                suffix={
                                    isVisibleConfirmPassword ? (
                                        <EyeInvisibleOutlined
                                            onClick={toggleConfirmPasswordVisibility}
                                        />
                                    ) : (
                                        <EyeOutlined onClick={toggleConfirmPasswordVisibility} />
                                    )
                                }
                            />
                        )}
                    />
                    {errors?.repeatPassword && (
                        <p>{errors.repeatPassword?.message || constants.error}</p>
                    )}
                </div>

                <div>
                    <label>{constants.phoneNumberLabel}</label>
                    <Controller
                        name="number"
                        control={control}
                        rules={{ required: constants.requiredInput }}
                        render={({ field }) => (
                            <Input
                                type="number"
                                {...field}
                                placeholder={constants.phoneNumberPlaceholder}
                            />
                        )}
                    />
                    {errors?.number && <p>{errors.number?.message || constants.error}</p>}
                </div>

                <div>
                    <label>{constants.dateLabel}</label>
                    <Controller
                        name="date"
                        control={control}
                        rules={{
                            required: constants.requiredInput,
                            validate: (value) => {
                                const selectedDate = value && value.toDate();
                                const currentDate = new Date();
                                return selectedDate <= currentDate || constants.chooseCorrectDate;
                            },
                        }}
                        render={({ field }) => (
                            <DatePicker {...field} placeholder={constants.datePlaceholder} />
                        )}
                    />
                    {errors?.date && <p>{errors.date?.message || constants.error}</p>}
                </div>

                <div>
                    <label>{constants.genderLabel}</label>
                    <Controller
                        name="gender"
                        control={control}
                        rules={{ required: constants.requiredInput }}
                        render={({ field }) => (
                            <Radio.Group {...field}>
                                <Radio className="form-gender" value="male">
                                    {constants.male}
                                </Radio>
                                <Radio className="form-gender" value="female">
                                    {constants.female}
                                </Radio>
                            </Radio.Group>
                        )}
                    />
                    {errors?.gender && <p>{errors.gender?.message || constants.error}</p>}
                </div>

                <Button type="primary" htmlType="submit">
                    {constants.registrationButton}
                </Button>
            </form>
            <ToastContainer position="top-center" />
        </>
    );
};

export default RegistrationForm;
