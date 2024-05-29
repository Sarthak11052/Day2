import Register from "./Register.jsx";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

function Routes() {
    const { username, id } = useContext(UserContext);

    if (username) {
        return 'Logged in!';
    }

    return (
        <Register />
    );
}
export default Routes