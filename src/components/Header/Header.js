import React, {useState, useEffect, useContext} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {AppBar, Avatar, Toolbar, Typography, Button, InputBase} from "@material-ui/core";
import styled from 'styled-components'
import useStyles from './styles.js'
import {useDispatch} from "react-redux";
import logo from '../../images/logo.jpg';
import {Link, useHistory, useLocation} from 'react-router-dom';
import decode from "jwt-decode";
import SearchIcon from '@material-ui/icons/Search';
import LanguageContext from "../../context/LanguageContext.js";

const Header = ({isMobile}) => {

    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const {currentLangData: t} = useContext(LanguageContext);

    const logout = () => {
        dispatch({type: 'LOGOUT'});

        history.push('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        // JWT ... check expiration
        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);


    console.log(isMobile())

    return (
        <HeaderContainer className="main-header">
            <AppBar className={!isMobile() ? classes.appBarBig : classes.appBarSmall} position="static" color="inherit">
                <div className={classes.brandContainer}>
                    <Button component={Link} to="/">
                        <img className={classes.image} src={logo} alt="icon" height="60"/>
                    </Button>
                </div>
                <Toolbar className={classes.toolbar}>
                    {!isMobile() ? <SearchBar/> : <span/>}
                    {user?.result ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user?.result.name}
                                    src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
                            <Button variant="contained" className={classes.logout} color="secondary"
                                    onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <Button component={Link} to="/auth" variant="contained"
                                color="primary">{t.header.signin}</Button>
                    )}
                </Toolbar>
            </AppBar>
            {isMobile()
                ? <AppBar className={classes.searchBar} position="static" color="inherit">
                    <SearchBar/>
                </AppBar>
                : <span/>}
        </HeaderContainer>
    );
}

export default Header;

const SearchBar = () => {
    const classes = useStyles();
    const {currentLangData: t} = useContext(LanguageContext);
    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase variant="outlined"
                           placeholder={`${t.header.search}...`}
                           classes={{
                               root: classes.inputRoot,
                               input: classes.inputInput,
                           }}
                           inputProps={{'aria-label': 'search'}}
                />
            </div>
        </>
    )
}

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

/*
                    <Navbar bg="--mainWhite" maxwidth="lg" expand="lg">
                        <Navbar.Toggle/>
                        <Navbar.Collapse>
                            <Nav className="mr-auto">
                                {<Nav.Link href="#about">About us</Nav.Link>}
<NavDropdown title={t.header.navbar}>
    <NavDropdown.Item href="#action/1">action 1</NavDropdown.Item>
    <NavDropdown.Item href="#action/2">action 2</NavDropdown.Item>
    <NavDropdown.Item href="#action/3">action 3</NavDropdown.Item>
    <NavDropdown.Divider/>
    <NavDropdown.Item href="#about">{t.header.about}</NavDropdown.Item>
</NavDropdown>
</Nav>
</Navbar.Collapse>
</Navbar>
*/