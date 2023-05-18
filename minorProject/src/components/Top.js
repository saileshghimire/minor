import React, { useState } from 'react';

export default function Header() {

    return (   
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark fixed-top mb-5" style={{zIndex: 100}}>
        <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src=".." alt="logo"/>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/" >Exams</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/">Notice</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link" href="/">Result</a>
                        </li>
                    </ul>

                    <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src=".." alt="settings-icon"/>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Account Settings</a></li>
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                        <li><a class="dropdown-item" href="#">Report a problem</a></li>
                    </ul>
                    </div>
                </div>
        </div>
    </nav>
    )
}