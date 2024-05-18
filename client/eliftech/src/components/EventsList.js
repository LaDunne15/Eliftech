import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import FormatDate from "../services/format";

const EventList = () => {

    const [ events, setEvents ] = useState([]);

    const [ hasMore, setHasMore ] = useState(true);
    const [ offset, setOffset ] = useState(10);

    const [ sort, setSort ] = useState({
        orderBy: 'title',
        reverse: false 
    });

    const fetchEvents = async (limit, offset) => {
        const response = await fetch(`${process.env.REACT_APP_HOST}/?orderBy=${sort.orderBy}&reverse=${sort.reverse}&limit=${limit}&offset=${offset}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        return data.events;
    }

    const fetchMoreData = async () => {
        const data = await fetchEvents(5, offset);
        setEvents( prevEvents => [...prevEvents, ...data] );
        setHasMore(data.length > 0);
        setOffset( prevOffset => prevOffset + 10 );
    }

    useEffect(() => {
        setOffset(10);
        setHasMore(true);
        const getData = async () => {
            const data = await fetchEvents(10, 0);
            setEvents(data);
        };
        getData();
        // eslint-disable-next-line
    },[sort]);

    return (
        <div className="event-list">
            <h1>Events List</h1>
            <div className="sort">
                <span>Sort by:</span>
                <ul>
                    <li>
                        <input type="radio" name="sort" value="title"
                            defaultChecked={sort.orderBy === 'title'}
                            onClick={() => setSort({...sort, orderBy: 'title'})}
                        />
                        <label htmlFor="source">Title</label>
                    </li>
                    <li>
                        <input type="radio" name="sort" value="eventDate" 
                            defaultChecked={sort.orderBy === 'eventDate'} 
                            onClick={() => setSort({...sort, orderBy: 'eventDate'})}
                        />
                        <label htmlFor="source">Event date</label>
                    </li>
                    <li onClick={() => setSort({...sort, orderBy: 'organizer'})}>
                        <input type="radio" name="sort" value="organizer" 
                            defaultChecked={sort.orderBy === 'organizer'} 
                            onClick={() => setSort({...sort, orderBy: 'eventDate'})}
                        />
                        <label htmlFor="source">Organizer</label>
                    </li>
                </ul>
                <div>
                    <input type="checkbox" name="reverse" onClick={() => setSort({...sort, reverse: !sort.reverse})}/>
                    <label htmlFor="reverse">Reverse</label>
                </div>
            </div>

            {
                events.length === 0 && <p>No events found</p>
            }
            
            <InfiniteScroll
                dataLength={events.length}
                next={fetchMoreData}
                hasMore={hasMore}
            >
                <ul className="event-list">
                    {
                        events &&
                        events.map( e => <li key={e._id} className="event">
                            <h3>{ e.title }</h3>
                            <p className="description">{ e.description }</p>
                            <p className="event-date">{ FormatDate.formatDate(e.eventDate) }</p>
                            <p className="organizer">{ e.organizer }</p>
                            <div className="links">
                                <Link to={`/register/${e._id}`}>Register</Link>
                                <Link to={`/eventGuests/${e._id}`}>View</Link>
                            </div>
                        </li>)
                    }
                </ul>
            </InfiniteScroll> 
        </div>
    )
}


export default EventList;