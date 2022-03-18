import styled from "styled-components";
import {Auth} from "../../api/backend/Auth";
import {useFormik} from "formik";
import {Users} from "../../api/backend/Users";
import {useDispatch, useSelector} from 'react-redux';
import {LoginSuccess} from "../../api/Types";
import {login} from "../../redux/reducers/auth/actionsAuth";
import {Input} from "../../components/common/Input";
import {ButtonPrimary} from "../../components/common/Button";
import {Navigate} from "react-router-dom";
import {StateApp} from "../../redux/Types";


const BG = styled.div`
  display: grid;
  grid-template: ". login register .";
  gap: 2em;
  align-content: center;
  align-items: center;
  min-height: 100vh;
`

const FormRegisterStyle = styled.form`
  grid-area: register;
  display: grid;
  gap: 10px;
`
const FormLoginStyle = styled.form`
  grid-area: login;
  display: grid;
  gap: 10px;
`
export const Login = () => {
    const auth = useSelector((state: StateApp) => state.auth)
    if (auth && auth.token) return <Navigate to={'/admin'}/>
    return (
        <BG>
            <FormLogin/>
            <FormRegister/>
        </BG>
    )
}
const FormLogin = () => {

    const dispatch = useDispatch();
    const onLogin = ({user, token}: LoginSuccess) => {
        dispatch(login(user, token))

    }
    const auth = new Auth(onLogin);

    const {handleChange, handleSubmit, errors, isValid} = useFormik(auth.loginForm);
    return (
        <FormLoginStyle onSubmit={handleSubmit}>
            <Input onChange={handleChange} name={'email'} type="email" placeholder={'usuario'}/>
            <Input onChange={handleChange} name={'password'} type="password" placeholder={'contraseña'}/>
            {errors && <p>{errors.password}</p>}
            {errors && <p>{errors.email}</p>}
            <ButtonPrimary disabled={!isValid} type={'submit'}>Ingresar <i
                className='bx bxs-right-arrow'/></ButtonPrimary>
        </FormLoginStyle>
    )
}
const FormRegister = () => {
    const users = new Users(() => `Bearer ${process.env.REACT_APP_MASTER_KEY}`);
    const {handleChange, handleSubmit, errors, isValid} = useFormik(users.forms);
    return <FormRegisterStyle onSubmit={handleSubmit}>
        <Input onChange={handleChange} name={'name'} type="text" placeholder={'Nombre'}/>
        <Input onChange={handleChange} name={'email'} type="email" placeholder={'usuario'}/>
        <Input onChange={handleChange} name={'password'} type="password" placeholder={'contraseña'}/>
        {errors && <p>{errors.password}</p>}
        {errors && <p>{errors.email}</p>}
        <ButtonPrimary disabled={!isValid} type={'submit'}>Registrarse <i
            className='bx bxs-right-arrow'/></ButtonPrimary>
    </FormRegisterStyle>
}
