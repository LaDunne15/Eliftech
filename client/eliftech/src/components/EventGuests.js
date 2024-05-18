import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ResponsiveContainer, Tooltip, XAxis, BarChart, Bar} from 'recharts';

import FormatDate from "../services/format";

const EventGuests = () => {

    const { id } = useParams();

    const [ event, setEvent ] = useState({
        _id: 0,
        title: "",
        description: "",
        eventDate: "",
        organizer: ""
    });

    const [ filteredGuests, setFilteredGuests ] = useState([]);

    const [ groupByDay, setGroupByDay ] = useState([]);

    const [ searchString , setSearchString ] = useState("");
    
    const fetchGuests = async () => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/eventGuests/${id}?searchString=${searchString}`, {
            method: 'GET'
        });
        const data = await response.json();
        const { guests } = data;
        setFilteredGuests(guests);
    }

    useEffect(() => {
        if (filteredGuests.length===0) return;
        const fGuests = filteredGuests.map(g => {
            return { ...g, createdAtFormat: new Date(g.createdAt).toISOString().split('T')[0] };
        });
        const groupedGuestsByDay = Object.groupBy(fGuests, ({ createdAtFormat }) => createdAtFormat);

        const data = [];

        Object.keys(groupedGuestsByDay).forEach(key => {
            data.push({
                day: key,
                count: groupedGuestsByDay[key].length
            });
        });
        setGroupByDay(data.sort((a, b) => new Date(a.day) - new Date(b.day)));
        // eslint-disable-next-line
    }, [filteredGuests]);

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

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchGuests();
        }, 1000);
        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line
    }, [searchString, id]);

    return (
        <div className="event-guests">
            <h1>Event Guests</h1>
            <div className="event">
                <h3>{ event.title }</h3>
                <p className="description">{ event.description }</p>
                <p className="event-date">{ FormatDate.formatDate(event.eventDate) }</p>
                <p className="organizer">{ event.organizer }</p>
            </div>
            {
                filteredGuests.length>0 &&
            <div className="chart">
                <h3>Frequency of registration per day</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={groupByDay}>
                        <Bar dataKey="count" fill="#000" />
                        <Tooltip cursor={{fill: 'transparent'}}/>
                        <XAxis dataKey="day"/> 
                    </BarChart>
                </ResponsiveContainer>
            </div>
            }
            <div className="guests">
                <h3>Guests</h3>
                <div className="search">
                    <span> 🔍 Search guest</span>
                    <input type="search" onChange={e => setSearchString(e.target.value)}/>
                </div>
                <ul className="guests-list">
                {
                    filteredGuests.map( g => <li key={g._id} className="guest">
                        <h4>{g.fullname}</h4>
                        <a href={`mailto:${g.email}`}>{g.email}</a>
                        <p>{ FormatDate.formatDate(g.dateOfBirth) }</p>
                    </li>)
                }
                {
                    filteredGuests.length===0 && <p>No guests found</p>
                }
                </ul>
            </div>
        </div>
    )
}


export default EventGuests;