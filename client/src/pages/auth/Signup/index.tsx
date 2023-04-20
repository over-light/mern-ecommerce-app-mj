import { InputField, } from "../../../component/InputField";
import { Button } from "../../../component/Button";
import { userInterface } from "../../../type/interface";

type SignupProps = {
    onHandleChange: any;
    user: userInterface;
    switchAuthMode: any;
    onSignup: any;
}

const Signup: React.FC<SignupProps> = ({ onHandleChange, user, switchAuthMode, onSignup }) => {
    return (
        <form onSubmit={onSignup}>
            <div className="mb-3 row">
                <InputField
                    id={"name"}
                    type={"text"}
                    label={"Name"}
                    onHandleChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'name'); }}
                    value={user?.name}
                    cssClass="customInputs"
                />
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
                    value={""}
                    cssClass="customInputs"
                />
                <InputField
                    id={"username"}
                    type={"text"}
                    label={"username"}
                    onHandleChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'username'); }}
                    value={user?.password}
                    cssClass="customInputs"
                />
                <InputField
                    id={"mobile"}
                    type={"mobile"}
                    label={"mobile"}
                    onHandleChange={(e: { target: { value: string; }; }) => { onHandleChange(e, 'mobile'); }}
                    value={user?.mobile}
                    cssClass="customInputs"
                />
            </div>
            <div className="d-flex justify-content-between mb-4">
                <p>Don't have an Account? <span className="customLink" onClick={switchAuthMode}>Login Now!</span></p>
            </div>

            <div className="text-center">
                <Button type="submit" cssClass={"btn btn-primary"}>Register</Button>
            </div>
        </form>
    );
}


export default Signup;