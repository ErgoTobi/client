import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {AppBar, Avatar, Toolbar, Typography, Button} from "@material-ui/core";
import styled from 'styled-components'
import useStyles from './styles.js'
import {useDispatch} from "react-redux";
import logo from '../../images/logo.jpg';
import {Link, useHistory, useLocation} from 'react-router-dom';

const Header = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    console.log(user);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });

        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        // JWT ... check

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <HeaderContainer className="main-header">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <img className={classes.image} src={logo} alt="icon" height="60"/>
                    <Typography component={Link} to="/" className={classes.heading} variant="h2"
                                align="center">Memoires</Typography>
                </div>
                <Toolbar className={classes.toolbar}>
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name}
                                    src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary"
                                    onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    )}
                </Toolbar>
            </AppBar>
        </HeaderContainer>
    );
}

export default Header;

/* <div className="header-middle">*/
const HeaderContainer = styled.header`
  .header-middle {
    background: var(--mainWhite);
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`;

/*
<div className="container">
                    <Navbar bg="--mainWhite" maxwidth="lg" expand="lg">
                        <Navbar.Brand href="#home">
                            <img
                                alt="logo"
                                src={logo}
                                width="80"
                                height="40"
                                className="d-inline-block align-top"
                            />{" "}
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#foo">About us</Nav.Link>
                                <NavDropdown title="What else to know?">
                                    <NavDropdown.Item href="#action/1">action 1</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/2">action 2</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3">action 3</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/4">action 4</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form inline>
                                <FormControl type="description" placeholder="search" className="mr-sm-2"/><Button
                                variant="outline-primary">search</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
*/