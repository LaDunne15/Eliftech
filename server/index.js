import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
dotenv.config()
 

import Event from './models/event.js';
import User from './models/user.js';

const app = express();
const PORT = 5000;
 
app.use(express.json());
app.use(cors("*")); 
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`${process.env.MONGODB_CONNECTION}`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database'); 
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });


app.get('/', async (req, res) => {

	const { orderBy, reverse, limit, offset } = req.query;

	const events = await Event.find({}).sort({ [orderBy]: reverse==='true'? -1 : 1 }).skip(+offset).limit(+limit);

  	res.json({ events });

});

app.get('/:id', async (req, res) => {

	const event = await Event.findById(req.params.id);
	res.json({
		event
	});
});

app.post('/eventRegister', async (req, res) => {

	const { registerEvent, id } = req.body;

	const user = new User({
		...registerEvent,
		event: id
	});

	await user.save();

	res.json(user);

});

app.get('/eventGuests/:id', async (req, res) => {

	const { searchString } = req.query;

	if (searchString) {
		const guests = await User.find(
			{
				event: req.params.id,
				$or: [
					{ fullname: { $regex: searchString, $options: 'i' } },
					{ email: { $regex: searchString, $options: 'i' } }
				] 
			}
		);
		res.json({
			guests
		});
	} else {
		const guests = await User.find({ event: req.params.id });
		res.json({
			guests
		});
	}

})

app.post('/seed', async (req, res) => {	
	const listEvents = [
		{
		  title: "Friend's Birthday",
		  description: "A party to celebrate a friend's birthday",
		  eventDate: new Date("2024-06-12"),
		  organizer: "Peter Ivanov"
		},
		{
		  title: "Marketing Conference",
		  description: "A conference for marketing professionals",
		  eventDate: new Date("2024-07-20"),
		  organizer: "Marketing Association"
		},
		{
		  title: "Wedding Anniversary",
		  description: "Celebrating the 5th wedding anniversary",
		  eventDate: new Date("2024-07-10"),
		  organizer: "Anna and Oleg"
		},
		{
		  title: "Opening of a New Store",
		  description: "Grand opening of a new store with discounts",
		  eventDate: new Date("2024-08-05"),
		  organizer: "New Trends Store Chain"
		},
		{
		  title: "Open-air Cinema",
		  description: "Watching a movie under the open sky",
		  eventDate: new Date("2024-08-20"),
		  organizer: "City Administration"
		},
		{
		  title: "Football Match",
		  description: "Important match between 'Zorya' and 'Dynamo' teams",
		  eventDate: new Date("2024-09-15"),
		  organizer: "Football Club 'Zorya'"
		},
		{
		  title: "Rock Band Concert",
		  description: "Concert of a favorite rock band with a new program",
		  eventDate: new Date("2024-10-10"),
		  organizer: "Rock Band 'Fire Wings'"
		},
		{
		  title: "Art Exhibition Opening",
		  description: "Opening of an exhibition of contemporary art",
		  eventDate: new Date("2024-11-02"),
		  organizer: "ArtHall Contemporary Art Gallery"
		},
		{
		  title: "Programming Basics Seminar",
		  description: "Seminar for beginners on programming basics",
		  eventDate: new Date("2024-12-08"),
		  organizer: "IT School 'CodeAcademy'"
		},
		{
		  title: "Halloween Party",
		  description: "Themed party for Halloween",
		  eventDate: new Date("2024-10-31"),
		  organizer: "Nightclub 'Inferno'"
		},
		
		{
			title: "Art Workshop",
			description: "Hands-on workshop on painting techniques",
			eventDate: new Date("2024-06-25"),
			organizer: "ArtStudio"
		  },
		  {
			title: "Charity Gala",
			description: "Fundraising gala for a local charity",
			eventDate: new Date("2024-07-08"),
			organizer: "Community Charity Foundation"
		  },
		  {
			title: "Summer Music Festival",
			description: "Outdoor music festival featuring various artists",
			eventDate: new Date("2024-08-15"),
			organizer: "Music Events Management"
		  },
		  {
			title: "Business Networking Event",
			description: "Networking event for professionals from various industries",
			eventDate: new Date("2024-09-02"),
			organizer: "Business Connections Network"
		  },
		  {
			title: "Food Tasting Fair",
			description: "Fair showcasing local cuisine and delicacies",
			eventDate: new Date("2024-09-18"),
			organizer: "Local Food Association"
		  },
		  {
			title: "Fitness Challenge",
			description: "Fitness event featuring various challenges and activities",
			eventDate: new Date("2024-10-05"),
			organizer: "FitLife Gym"
		  },
		  {
			title: "Tech Summit",
			description: "Summit focusing on the latest trends in technology",
			eventDate: new Date("2024-11-12"),
			organizer: "Tech Innovations Forum"
		  },
		  {
			title: "Holiday Market",
			description: "Market featuring holiday-themed goods and gifts",
			eventDate: new Date("2024-12-01"),
			organizer: "Holiday Market Organizers"
		  },
		  {
			title: "Book Club Meeting",
			description: "Meeting of a local book club to discuss a selected book",
			eventDate: new Date("2025-01-10"),
			organizer: "Bookworms Book Club"
		  },
		  {
			title: "Fashion Show",
			description: "Fashion show featuring local designers' collections",
			eventDate: new Date("2025-02-20"),
			organizer: "Fashion Events Management"
		  },
		  {
			title: "Gaming Tournament",
			description: "Gaming tournament with various competitive games",
			eventDate: new Date("2025-03-07"),
			organizer: "Game Masters Association"
		  },
		  {
			title: "Science Fair",
			description: "Fair showcasing science projects and experiments",
			eventDate: new Date("2025-04-15"),
			organizer: "Science Enthusiasts Society"
		  },
		  {
			title: "Dance Performance",
			description: "Live dance performance featuring various styles",
			eventDate: new Date("2025-05-02"),
			organizer: "Dance Academy"
		  },
		  {
			title: "Film Screening",
			description: "Screening of a classic film with live music accompaniment",
			eventDate: new Date("2025-06-10"),
			organizer: "Film Society"
		  },
		  {
			title: "Environmental Cleanup",
			description: "Community event to clean up local parks and streets",
			eventDate: new Date("2025-07-20"),
			organizer: "Green Earth Initiative"
		  },
		  {
			title: "Cultural Festival",
			description: "Festival celebrating the cultural diversity of the community",
			eventDate: new Date("2025-08-08"),
			organizer: "Cultural Exchange Association"
		  },
		  {
			title: "Comedy Night",
			description: "Stand-up comedy show featuring local comedians",
			eventDate: new Date("2025-09-15"),
			organizer: "Laugh Factory"
		  },
		  {
			title: "Education Conference",
			description: "Conference focusing on innovative education practices",
			eventDate: new Date("2025-10-01"),
			organizer: "Education Innovators Forum"
		  },
		  {
			title: "Sports Day",
			description: "Community sports day with various sports and activities",
			eventDate: new Date("2025-11-10"),
			organizer: "Sports and Recreation Department"
		  },
		  {
			title: "Health and Wellness Expo",
			description: "Expo featuring health and wellness products and services",
			eventDate: new Date("2025-12-05"),
			organizer: "Health and Wellness Expo Organizers"
		  },
		  {
			title: "Craft Fair",
			description: "Fair showcasing handmade crafts and artisanal goods",
			eventDate: new Date("2026-01-20"),
			organizer: "Crafters Association"
		  },
		  {
			title: "Tech Workshop",
			description: "Hands-on workshop on the latest tech gadgets and tools",
			eventDate: new Date("2026-02-10"),
			organizer: "Tech Innovations Workshop"
		  },
		  {
			title: "Food Truck Festival",
			description: "Festival featuring a variety of food trucks",
			eventDate: new Date("2026-03-15"),
			organizer: "Food Truck Association"
		  },
		  {
			title: "Art Auction",
			description: "Auction of artworks by local artists",
			eventDate: new Date("2026-04-02"),
			organizer: "Art Auction House"
		  },
		  {
			title: "Fashion Workshop",
			description: "Workshop on fashion design and styling",
			eventDate: new Date("2026-05-10"),
			organizer: "Fashion Design Institute"
		  },
		  {
			title: "Music Masterclass",
			description: "Masterclass on music composition and performance",
			eventDate: new Date("2026-06-20"),
			organizer: "Music Academy"
		  },
		  {
			title: "Technology Expo",
			description: "Expo showcasing the latest in technology",
			eventDate: new Date("2026-07-10"),
			organizer: "Technology Expo Organizers"
		  },
		  {
			title: "Dance Workshop",
			description: "Workshop on various dance styles and techniques",
			eventDate: new Date("2026-08-15"),
			organizer: "Dance Studio"
		  },
		  {
			title: "Film Festival",
			description: "Festival featuring independent and international films",
			eventDate: new Date("2026-09-05"),
			organizer: "Film Festival Organizers"
		  },
		  {
			title: "Gaming Expo",
			description: "Expo showcasing the latest in gaming technology",
			eventDate: new Date("2026-10-20"),
			organizer: "Gaming Expo Organizers"
		  }
	];

	try {
		await Event.insertMany(listEvents);
		res.send('Database seeded!');
	} catch (error) {
		console.log(error);
	}

}); 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); 
})

