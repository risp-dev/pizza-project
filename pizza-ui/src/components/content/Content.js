import {Container} from "@mui/material";
import Pizza from "../forms/Pizza";
import Pizzas from "../page/Pizzas";
import UserRegistration from "../forms/UserRegistration";
import {Route, Routes} from "react-router-dom";
import PizzaDetailPage from "../page/PizzaDetailPage";
import Login from "../forms/Login";
import {Logout} from "@mui/icons-material";



const Content = () => {

    return (
        <>
            <Container disableGutters maxWidth="xl" component="main"
                       sx={{
                           display: 'flex',
                           flexDirection: 'column',
                           minHeight: 'calc(100vh - 157px)',
                           mt: 4
                       }}>

                <Routes>
                    <Route path="/" element={<Pizzas/>}/>
                   {/* <Route path="/pizzas/create" element={<Pizza/>}/>*/}
                    <Route path="/pizzas/create" element={<Pizza key="create"/>}/>
                    <Route path="/users/login" element={<Login/>}/>
                  <Route path="/users/logout" element={<Logout/>}/>
                   {/* <Route path="/orders/create" element={<Order/>}/>*/}
                    <Route path="/users/registration" element={<UserRegistration/>}/>
                    <Route path="/pizzas/:id/update" element={<Pizza key="update"/>}/>
                    <Route path="/pizzas/:id" element={<PizzaDetailPage/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default Content;