import {NavLink} from "react-router-dom";
import {Link} from "@mui/material";

const PizzaMenuItem = ({path, name}) => (
    <Link
        variant="button"
        color="text.primary"
        to={path}
        component={NavLink}
        sx={{my: 1, mx: 1.5}}>
        {name}
    </Link>
)

export default PizzaMenuItem;