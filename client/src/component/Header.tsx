import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import { useAuth } from "../Hooks";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
type HeaderProps = {}

export const Header: React.FC<HeaderProps> = () => {
    const { isLoginModal, onLoginModalToggle, onHandleChange, user, onLogin, switchAuthMode, isLogin, onSignup } = useAuth()
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to={'/'}>Home</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={onLoginModalToggle}>Login</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal
                title={isLogin ? 'Login' : 'Register'}
                onCancel={onLoginModalToggle}
                open={isLoginModal}
                cancelText={'Cancel'}
                submitText={'Save changes'}
                isHeader={true}
                isFooter={false}
            >
                {
                    isLogin ?
                        <Login onHandleChange={onHandleChange} user={user} onLogin={onLogin} switchAuthMode={switchAuthMode} /> :
                        <Signup onSignup={onSignup} user={user} onHandleChange={onHandleChange} switchAuthMode={switchAuthMode} />
                }

            </Modal>
        </>
    );
}


