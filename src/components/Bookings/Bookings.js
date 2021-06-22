import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://hotel-management-bd.herokuapp.com/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [])

    return (
        <div>
            <h3>You have: {bookings.length} Bookings</h3>
            {
                bookings.map(book => <li>{book.name} from: {(new Date(book.checkIn).toDateString('dd/MM/yy'))} to: {(new Date(book.checkOut).toDateString('dd/MM/yy'))}</li>)
            }
        </div>
    );
};

export default Bookings;