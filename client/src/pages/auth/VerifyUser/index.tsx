import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../Hooks";

type VerifyUserProps = {}

const VerifyUser: React.FC<VerifyUserProps> = () => {
    const { verifyUser } = useAuth()
    const params = useParams()
    useEffect(() => {
        alert()
        const { token, id } = params;
        verifyUser(token, id)

    }, [])
    return (
        <div>
            VerifyUser
        </div>
    );
}


export default VerifyUser;