import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FormatDate from "../services/format";

const EventRegistration = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [ event, setEvent ] = useState({
        _id: 0,
        title: "",
        description: "",
        eventDate: "",
        organizer: ""
    });

    const [ registerEvent, setRegisterEvent ] = useState({
        fullname: "",
        email: "",
        dateOfBirth: "",
        sourceOfInformation: ""
    });

    const [ validationErrors, setValidationErrors ] = useState({});

    const getValidationErrors = (value) => {
        const errors = [];
        if (!value.fullname) {
            errors.push("Fullname is required");
        }
        if (value.fullname.length < 4) {
            errors.push("Fullname must be longer than 4 characters");
        }
        if (!value.email) {
            errors.push("Email is required");
        }
        if (!/\S+@\S+\.\S+/.test(value.email)) {
            errors.push("Email is not valid");
        }
        if (value.dateOfBirth && new Date(value.dateOfBirth) > new Date()) {
            errors.push("Date of Birth must be in the past");
        }
        if (!value.dateOfBirth) {
            errors.push("Date of Birth is required");
        }
        if (!value.sourceOfInformation) {
            errors.push("Source of Information is required");
        }

        return errors;
    }

    useEffect(() => {
        const fetchEvent = async () => {
            const response = await fetch(`${process.env.REACT_APP_HOST}/${id}`, {
                method: 'GET'
            });
            const data = await response.json();
            setEvent(data.event);
        }

        fetchEvent();
    }, [id]);

    const send = async (e) => {
        e.preventDefault();

        const validationErrors = getValidationErrors(registerEvent);
        if (validationErrors.length > 0) {
            setValidationErrors(validationErrors);
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_HOST}/eventRegister`, {
            method: 'POST',
            body: JSON.stringify({ registerEvent, id: event._id }),
            headers: { 'Content-Type': 'application/json' }
        });
        //const data = await response.json();
        if (response.ok) navigate(`/eventGuests/${event._id}`);
    }

    /*
    useEffect(() => {
        setValidationErrors(getValidationErrors(registerEvent));
    }, [registerEvent]);*/

    return (
        <div className="event-registration">
            <h1>Event Registration</h1>
            <div className="event">
                <h3>{ event.title }</h3>
                <p className="description">{ event.description }</p>
                <p className="event-date">{ FormatDate.formatDate(event.eventDate) }</p>
                <p className="organizer">{ event.organizer }</p>
            </div>
            <form className="event-registration-form">
                <p>
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={registerEvent.fullname}
                        onChange={(e) => setRegisterEvent({ ...registerEvent, fullname: e.target.value })}
                    />
                </p>
                <p>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={registerEvent.email}
                        onChange={(e) => setRegisterEvent({ ...registerEvent, email: e.target.value })}
                    />
                </p>
                <p>
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={registerEvent.dateOfBirth}
                        onChange={(e) => setRegisterEvent({ ...registerEvent, dateOfBirth: e.target.value })}
                    />
                </p>
                <div>
                    <label htmlFor="source">Where did you hear about this event?</label>
                    <ul>
                        <li>
                            <input
                                type="radio"
                                id="source"
                                name="source"
                                value="social_media"
                                onChange={(e) => setRegisterEvent({ ...registerEvent, sourceOfInformation: e.target.value })}
                            />
                            <label htmlFor="friend">Social media</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="source"
                                name="source"
                                value="friends"
                                onChange={(e) => setRegisterEvent({ ...registerEvent, sourceOfInformation: e.target.value })}
                            />
                            <label htmlFor="friend">Friends</label>
                        </li>
                        <li>
                            <input
                                type="radio"
                                id="source"
                                name="source"
                                value="myself"
                                onChange={(e) => setRegisterEvent({ ...registerEvent, sourceOfInformation: e.target.value })}
                            />
                            <label htmlFor="friend">Found myself</label>
                        </li>
                    </ul>
                    <div className="validation-errors">
                    {
                        validationErrors.length > 0 && <ul>
                            <h4> ⚠️ Validation requirements !</h4>
                            {
                                validationErrors.map((error, index) => <li key={index}> {error}</li>)
                            }
                        </ul>
                    }
                    </div>
                    <input type="submit" onClick={send} value="Register"/>
                </div>
            </form>
        </div>
    )
}

export default EventRegistration;