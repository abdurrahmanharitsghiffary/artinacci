"use client";

import { useLogout } from "@/hooks/use-logout";
import Link from "next/link";
import React, { useState } from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { BiUser, BiUserCircle } from "react-icons/bi";

export default function AppNavbar() {
  const [isShowProfile, setIsShowProfile] = useState(false);
  const logout = useLogout();

  return (
    <Navbar
      variant="underline"
      expand="lg"
      className="bg-body-tertiary w-full !sticky !top-0 z-50"
    >
      <Container className="flex justify-between">
        <Navbar.Brand className="hidden md:inline">
          <Link href="/home" className="link-no-styled">
            Artinnaci
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto flex items-center w-full">
            <Nav.Link as="div">
              <Link href="/home" className="link-no-styled">
                Home
              </Link>
            </Nav.Link>

            <Nav.Link as="div">
              <Link href="#articles" className="link-no-styled">
                Articles
              </Link>
            </Nav.Link>

            <Nav.Link as="div">
              <Link href="#videos" className="link-no-styled">
                Videos
              </Link>
            </Nav.Link>

            <Nav.Link as="div">
              <Link href="#about" className="link-no-styled">
                About
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Dropdown
          show={isShowProfile}
          drop="start"
          id="user-dropdown"
          className="ml-auto"
        >
          <Dropdown.Menu>
            <Dropdown.Item as="div" eventKey="4.1">
              <Link href="/profile" className="link-no-styled">
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as="div" eventKey="4.2">
              <Link href="/plans" className="link-no-styled">
                Plans
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              as="div"
              eventKey="4.4"
              onClick={logout}
              className="cursor-pointer"
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button
          className="p-2 !rounded-full"
          variant="dark"
          onClick={() => setIsShowProfile((c) => !c)}
        >
          <BiUser />
        </Button>
      </Container>
    </Navbar>
  );
}
