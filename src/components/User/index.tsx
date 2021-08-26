import React from 'react';

import './style.css';

interface UserProps {
    name: string;
    email: string;
    avatar: string;
}

export default function User({ name, email, avatar }: UserProps) {
    return (
        <li className="user">
            <header>
                <img src={avatar} alt="avatar"/>
                <div className="user-info">
                    <strong>{name}</strong>
                </div>
            </header>
            <a href={`mailto:${email}?subject=Olá, ${name}`}>{email}</a>
        </li>
    )
}
