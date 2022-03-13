import styled from "styled-components";
import {Auth} from "../../api/backend/Auth";
import {useFormik} from "formik";
import {Users} from "../../api/backend/Users";
import {useDispatch} from "react-redux";
import {LoginSuccess} from "../../api/Types";
import {login} from "../../redux/reducers/auth/actionsAuth";

const BG = styled.div`
  height: 100vh;
  width: 100%;
  background: ##1E2533;
`
const Box = styled.div`
  position: relative;
  top: 25%;
  left: 25%;
  height: 50vh;
  width: 50%;
  background: #181818;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 16px;
  display: grid;
  grid-template-rows: 50px auto;
  justify-items: center;
`
const Form = styled.form`
  display: grid;
  gap: 10px;
  width: 100%;
  align-content: center;
  justify-items: center;
  padding: 2em 0;

  input[type="email"], input[type="password"], input[type="text"] {
    padding: 1em;
    font-size: 19px;
    width: 50%;
    background-color: #181818 !important;
    color: white;
    border: none;
    border-bottom: 1px solid #DDD;
  }
`
export const Login = () => {
    return <BG>
        <Box>
            <Navigation/>
            <NavigationStyle>
                <NavigationStyleItem><FormLogin/></NavigationStyleItem>
                <NavigationStyleItem><FormRegister/></NavigationStyleItem>
            </NavigationStyle>
        </Box>
    </BG>
}
const NavigationStyle = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: auto auto;
  text-align: center;
  align-items: center;
  justify-items: center;
`

const NavigationStyleItem = styled.li`
  list-style: none;
  color: white;
  width: 50%;
  border-bottom: 1px solid black;
  margin: 3em 0;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

`

const Navigation = () => {
    return (
        <NavigationStyle>
            <NavigationStyleItem>Login</NavigationStyleItem>
            <NavigationStyleItem>Signup</NavigationStyleItem>
        </NavigationStyle>
    )
}
const FormLogin = () => {

    const dispatch = useDispatch();
    const onLogin = ({user, token}: LoginSuccess) => {
        dispatch(login(user, token))
    }

    const auth = new Auth(onLogin);

    const {handleChange, handleSubmit, errors, isValid} = useFormik(auth.loginForm);
    return <Form onSubmit={handleSubmit}>
        <input onChange={handleChange} name={'email'} type="email" placeholder={'usuario'}/>
        <input onChange={handleChange} name={'password'} type="password" placeholder={'contraseña'}/>
        <p>{errors.password}</p>
        <p>{errors.email}</p>
        <button disabled={!isValid} type={'submit'}>Submit</button>
    </Form>
}
const FormRegister = () => {
    const users = new Users();
    const {handleChange, handleSubmit, errors, isValid} = useFormik(users.signUpForm);
    return <Form onSubmit={handleSubmit}>
        <input onChange={handleChange} name={'name'} type="text" placeholder={'Nombre'}/>
        <input onChange={handleChange} name={'email'} type="email" placeholder={'usuario'}/>
        <input onChange={handleChange} name={'password'} type="password" placeholder={'contraseña'}/>
        <p>{errors.password}</p>
        <p>{errors.email}</p>
        <p>{JSON.stringify(isValid)}</p>
        <button disabled={!isValid} type={'submit'}>Submit</button>
    </Form>
}
