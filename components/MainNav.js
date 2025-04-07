import React, { useState } from 'react';
import { Container, Nav, Navbar, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from 'next/router';
import { addToHistory } from '../lib/userData';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store.js';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const token = readToken();

    const logout = () => {
        setIsExpanded(false);
        removeToken();
        router.push('/login');
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setIsExpanded(false);
        if (searchField.trim()) {
            const query = `title=true&q=${encodeURIComponent(searchField)}`;
            router.push(`/artwork?${query}`);
            setSearchHistory(await addToHistory(query));
        }
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-dark" expanded={isExpanded}>
                <Container>
                    <Navbar.Brand>Hanson Chieu</Navbar.Brand>
                    <Navbar.Toggle 
                        aria-controls="basic-navbar-nav" 
                        onClick={() => setIsExpanded(!isExpanded)}
                    />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link 
                                    active={router.pathname === '/'}
                                    onClick={() => setIsExpanded(false)}
                                >
                                    Home
                                </Nav.Link>
                            </Link>
                            {token && (
                                <Link href="/search" passHref legacyBehavior>
                                    <Nav.Link 
                                        active={router.pathname === '/search'}
                                        onClick={() => setIsExpanded(false)}
                                    >
                                        Advanced Search
                                    </Nav.Link>
                                </Link>
                            )}
                        </Nav>
                        &nbsp;
                        {token && (
                            <Form className="d-flex" onSubmit={submitForm}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    value={searchField}
                                    onChange={(e) => setSearchField(e.target.value)}
                                />
                                <Button type="submit" variant="outline-light">
                                    Search
                                </Button>
                            </Form>
                        )}
                        &nbsp;
                        <Nav>
                            {token ? (
                                <NavDropdown 
                                    title={token.userName || "User Name"} 
                                    id="basic-nav-dropdown" 
                                    align="end"
                                >
                                    <Link href="/favourites" passHref legacyBehavior>
                                        <NavDropdown.Item 
                                            active={router.pathname === '/favourites'}
                                            onClick={() => setIsExpanded(false)}
                                        >
                                            Favourites
                                        </NavDropdown.Item>
                                    </Link>
                                    <Link href="/history" passHref legacyBehavior>
                                        <NavDropdown.Item
                                            active={router.pathname === '/history'}
                                            onClick={() => setIsExpanded(false)}
                                        >
                                            Search History
                                        </NavDropdown.Item> 
                                    </Link>
                                    <NavDropdown.Item onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Link href="/register" passHref legacyBehavior>
                                        <Nav.Link 
                                            active={router.pathname === '/register'}
                                            onClick={() => setIsExpanded(false)}
                                        >
                                            Register
                                        </Nav.Link>
                                    </Link>
                                    <Link href="/login" passHref legacyBehavior>
                                        <Nav.Link 
                                            active={router.pathname === '/login'}
                                            onClick={() => setIsExpanded(false)}
                                        >
                                            Login
                                        </Nav.Link>
                                    </Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}