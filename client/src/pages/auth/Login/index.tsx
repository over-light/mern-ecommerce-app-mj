import { InputField, } from "../../../component/InputField";
import { Button } from "../../../component/Button";
import { userInterface } from "../../../type/interface";

type LoginProps = {
    onHandleChange(e: any, name: string): void;
    user: userInterface;
    onLogin: any,
    switchAuthMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onHandleChange, user, onLogin, switchAuthMode }) => {

    return (
        <form onSubmit={onLogin}>
            <div className="mb-3 row">
                <InputField
                    id={"email"}
                    type={"email"}
                    label={"Email"}
                    onHandleChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'email'); }}
                    value={user?.email}
                    cssClass="customInputs"
                />
            </div>
            <div className="mb-3 row">
                <InputField
                    id={"password"}
                    type={"password"}
                    label={"Password"}
                    onHandleChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'password'); }}
                    value={user?.password}
                    cssClass="customInputs" />
            </div>
            <div className="d-flex justify-content-between mt-n1">
                <span className="customLink" onClick={switchAuthMode}>Register</span>
                <span className="customLink" >Forgot</span>
            </div>
            <div className="text-center">
                <Button type="submit" cssClass={"btn btn-primary customButton"}>Login</Button>
            </div>
        </form>
    );
}


export default Login;