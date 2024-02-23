from qdrant_client import QdrantClient
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
encoder = SentenceTransformer("all-MiniLM-L6-v2")

documents = [
    {
        "name": "The Time Machine",
        "description": "A man travels through time and witnesses the evolution of humanity.",
        "author": "H.G. Wells",
        "year": 1895,
    },
    {
        "name": "Ender's Game",
        "description": "A young boy is trained to become a military leader in a war against an alien race.",
        "author": "Orson Scott Card",
        "year": 1985,
    },
    {
        "name": "Brave New World",
        "description": "A dystopian society where people are genetically engineered and conditioned to conform to a strict social hierarchy.",
        "author": "Aldous Huxley",
        "year": 1932,
    },
    {
        "name": "The Hitchhiker's Guide to the Galaxy",
        "description": "A comedic science fiction series following the misadventures of an unwitting human and his alien friend.",
        "author": "Douglas Adams",
        "year": 1979,
    },
    {
        "name": "Dune",
        "description": "A desert planet is the site of political intrigue and power struggles.",
        "author": "Frank Herbert",
        "year": 1965,
    },
    {
        "name": "Foundation",
        "description": "A mathematician develops a science to predict the future of humanity and works to save civilization from collapse.",
        "author": "Isaac Asimov",
        "year": 1951,
    },
    {
        "name": "Snow Crash",
        "description": "A futuristic world where the internet has evolved into a virtual reality metaverse.",
        "author": "Neal Stephenson",
        "year": 1992,
    },
    {
        "name": "Neuromancer",
        "description": "A hacker is hired to pull off a near-impossible hack and gets pulled into a web of intrigue.",
        "author": "William Gibson",
        "year": 1984,
    },
    {
        "name": "The War of the Worlds",
        "description": "A Martian invasion of Earth throws humanity into chaos.",
        "author": "H.G. Wells",
        "year": 1898,
    },
    {
        "name": "The Hunger Games",
        "description": "A dystopian society where teenagers are forced to fight to the death in a televised spectacle.",
        "author": "Suzanne Collins",
        "year": 2008,
    },
    {
        "name": "The Andromeda Strain",
        "description": "A deadly virus from outer space threatens to wipe out humanity.",
        "author": "Michael Crichton",
        "year": 1969,
    },
    {
        "name": "The Left Hand of Darkness",
        "description": "A human ambassador is sent to a planet where the inhabitants are genderless and can change gender at will.",
        "author": "Ursula K. Le Guin",
        "year": 1969,
    },
    {
        "name": "The Three-Body Problem",
        "description": "Humans encounter an alien civilization that lives in a dying system.",
        "author": "Liu Cixin",
        "year": 2008,
    },

    {
        "name": "1984",
        "description": "A dystopian society where government surveillance is omnipresent and independent thought is suppressed.",
        "author": "George Orwell",
        "year": 1949,
    },
    {
        "name": "Fahrenheit 451",
        "description": "In a future society where books are banned and 'firemen' burn any that are found, a man reevaluates his role in censorship and conformity.",
        "author": "Ray Bradbury",
        "year": 1953,
    },
    {
        "name": "I, Robot",
        "description": "A collection of short stories exploring the relationships between humans and robots and the ethical implications of artificial intelligence.",
        "author": "Isaac Asimov",
        "year": 1950,
    },
    {
        "name": "Do Androids Dream of Electric Sheep?",
        "description": "In a post-apocalyptic world, a bounty hunter pursues rogue androids, leading to questions about what it means to be human.",
        "author": "Philip K. Dick",
        "year": 1968,
    },
    {
        "name": "The Matrix",
        "description": "A computer hacker learns the truth about his reality and joins a rebellion against the machines that control humanity.",
        "author": "The Wachowskis",
        "year": 1999,
    },
    {
        "name": "The Man in the High Castle",
        "description": "In an alternate history where the Axis powers won World War II, the United States is divided between Nazi Germany and Japan.",
        "author": "Philip K. Dick",
        "year": 1962,
    },
    {
        "name": "A Clockwork Orange",
        "description": "In a dystopian future, a young delinquent undergoes an experimental procedure to curb his violent tendencies, with controversial results.",
        "author": "Anthony Burgess",
        "year": 1962,
    },
    {
        "name": "The Handmaid's Tale",
        "description": "In a totalitarian society where women are treated as property of the state, one woman navigates oppression and rebellion.",
        "author": "Margaret Atwood",
        "year": 1985,
    },
    {
        "name": "The Stand",
        "description": "After a government-created superflu wipes out most of humanity, survivors must navigate a world torn between good and evil.",
        "author": "Stephen King",
        "year": 1978,
    },
    {
        "name": "The Martian",
        "description": "After being left behind on Mars, an astronaut must find a way to survive and signal Earth for rescue.",
        "author": "Andy Weir",
        "year": 2011,
    },
    {
        "name": "The Road",
        "description": "In a post-apocalyptic world, a father and son journey through a desolate landscape, struggling to survive and maintain their humanity.",
        "author": "Cormac McCarthy",
        "year": 2006,
    },
    {
        "name": "The Giver",
        "description": "In a utopian society where all pain and suffering have been eliminated, a young boy is chosen to learn about the world's past and its true cost.",
        "author": "Lois Lowry",
        "year": 1993,
    },
    {
        "name": "Ready Player One",
        "description": "In a dystopian future, people escape their harsh reality by entering a virtual reality world, where a young man embarks on a quest for fortune and glory.",
        "author": "Ernest Cline",
        "year": 2011,
    },
    {
        "name": "Altered Carbon",
        "description": "In a future where consciousness can be transferred to different bodies, a former soldier is hired to solve a wealthy man's murder.",
        "author": "Richard K. Morgan",
        "year": 2002,
    },
    {
        "name": "The Expanse",
        "description": "In a colonized solar system on the brink of war, disparate characters navigate political intrigue and cosmic mysteries.",
        "author": "James S.A. Corey",
        "year": 2011,
    },
    {
        "name": "Hyperion",
        "description": "A group of pilgrims tells their stories on a journey to the Time Tombs, where an ancient, deadly force threatens humanity's future.",
        "author": "Dan Simmons",
        "year": 1989,
    },
    {
        "name": "Ubik",
        "description": "In a reality where psychic powers are real, a man discovers he may be dead and trapped in a simulacrum, fighting against entropy.",
        "author": "Philip K. Dick",
        "year": 1969,
    },
    {
        "name": "The Diamond Age: Or, A Young Lady's Illustrated Primer",
        "description": "In a future world of nanotechnology and social stratification, a young girl receives an interactive book that shapes her destiny.",
        "author": "Neal Stephenson",
        "year": 1995,
    },
    {
        "name": "Neuromancer",
        "description": "A washed-up computer hacker is hired to pull off the ultimate hack but finds himself caught in a web of intrigue and danger.",
        "author": "William Gibson",
        "year": 1984,
    },
    {
        "name": "The City & the City",
        "description": "In a unique urban landscape where two cities occupy the same space, a detective investigates a murder that crosses the boundaries of reality.",
        "author": "China Miéville",
        "year": 2009,
    },
    {
        "name": "The Windup Girl",
        "description": "In a future world ravaged by environmental collapse, biotechnology is both savior and oppressor, as corporate interests clash with individual freedom.",
        "author": "Paolo Bacigalupi",
        "year": 2009,
    },
    {
        "name": "Snow Crash",
        "description": "In a near-future America where the government has collapsed, a pizza delivery driver and a computer hacker race to stop a deadly virtual virus.",
        "author": "Neal Stephenson",
        "year": 1992,
    },
    {
        "name": "Red Mars",
        "description": "The first colonists on Mars struggle with personal and political conflicts as they attempt to terraform the planet and create a new society.",
        "author": "Kim Stanley Robinson",
        "year": 1992,
    },
    {
        "name": "The Quantum Thief",
        "description": "In a post-singularity future where technology blurs the lines between reality and simulation, a master thief must pull off his greatest heist yet.",
        "author": "Hannu Rajaniemi",
        "year": 2010,
    },
    {
        "name": "The Moon is a Harsh Mistress",
        "description": "In a future where the Moon is a penal colony, a computer technician and a group of rebels plan a revolution against Earth's oppressive rule.",
        "author": "Robert A. Heinlein",
        "year": 1966,
    },
    {
        "name": "The Hyperion Cantos",
        "description": "In a universe of far-future technology and enigmatic aliens, the fate of humanity is intertwined with the pilgrimage to the mysterious Time Tombs.",
        "author": "Dan Simmons",
        "year": 1989,
    },
    {
        "name": "The Invisible Man",
        "description": "A scientist discovers a way to make himself invisible, but his newfound power leads to madness and violence.",
        "author": "H.G. Wells",
        "year": 1897,
    },
    {
        "name": "The Time Traveler's Wife",
        "description": "A woman's life is intertwined with that of her time-traveling husband, leading to complications and heartbreak.",
        "author": "Audrey Niffenegger",
        "year": 2003,
    },
    {
        "name": "Solaris",
        "description": "A psychologist sent to study a mysterious planet finds himself confronting his own past and inner demons.",
        "author": "Stanisław Lem",
        "year": 1961,
    },
    {
        "name": "Contact",
        "description": "After receiving a message from extraterrestrial intelligence, a scientist must navigate politics, religion, and her own beliefs to understand humanity's place in the universe.",
        "author": "Carl Sagan",
        "year": 1985,
    },
    {
        "name": "Old Man's War",
        "description": "In a future where humanity has spread across the stars, elderly citizens are given new, genetically enhanced bodies to fight in an intergalactic war.",
        "author": "John Scalzi",
        "year": 2005,
    },
    {
        "name": "The Fifth Season",
        "description": "In a world constantly ravaged by catastrophic seismic events, a woman with the power to control earthquakes sets out on a journey of revenge.",
        "author": "N.K. Jemisin",
        "year": 2015,
    },
    {
        "name": "Annihilation",
        "description": "A team of scientists ventures into a mysterious area known as Area X, where the laws of nature don't apply, and encounter strange and terrifying phenomena.",
        "author": "Jeff VanderMeer",
        "year": 2014,
    },
    {
        "name": "The Forever War",
        "description": "A soldier fights in an interstellar war against an alien species, but relativistic effects cause centuries to pass on Earth while he ages only a few years.",
        "author": "Joe Haldeman",
        "year": 1974,
    },
    {
        "name": "The Dispossessed",
        "description": "In a society divided between anarcho-syndicalist anarchists and a capitalist society, a physicist seeks to bridge the gap between two worlds.",
        "author": "Ursula K. Le Guin",
        "year": 1974,
    },
    {
        "name": "Perdido Street Station",
        "description": "In the sprawling city of New Crobuzon, a scientist's experiment goes awry, unleashing a nightmare that threatens the entire city.",
        "author": "China Miéville",
        "year": 2000,
    },
    {
        "name": "The Book of the New Sun",
        "description": "In a far-future world where the sun is dying, a young apprentice torturer journeys across a decadent and decaying landscape.",
        "author": "Gene Wolfe",
        "year": 1980,
    },
    {
        "name": "Altered Carbon",
        "description": "In a future where consciousness can be transferred to different bodies, a former soldier is hired to solve a wealthy man's murder.",
        "author": "Richard K. Morgan",
        "year": 2002,
    },
    {
        "name": "The Long Way to a Small, Angry Planet",
        "description": "On a tunnelling spaceship, a diverse crew embarks on a journey to the edge of the galaxy, encountering strange worlds and even stranger customs.",
        "author": "Becky Chambers",
        "year": 2014,
    },
    {
        "name": "Children of Time",
        "description": "On a terraformed planet, descendants of Earth's civilization evolve into something entirely different, while humanity's last remnants struggle to survive.",
        "author": "Adrian Tchaikovsky",
        "year": 2015,
    },
    {
        "name": "The Peripheral",
        "description": "In a future where technology has bifurcated society, a woman in a rural American town and a gamer in a post-apocalyptic London find themselves linked across time and space.",
        "author": "William Gibson",
        "year": 2014,
    },
    {
        "name": "The Lathe of Heaven",
        "description": "A man discovers that his dreams can alter reality, leading to unintended consequences and ethical dilemmas.",
        "author": "Ursula K. Le Guin",
        "year": 1971,
    },
    {
        "name": "Gateway",
        "description": "On an asteroid containing a network of alien spaceships, a man risks everything for the chance at riches and adventure among the stars.",
        "author": "Frederik Pohl",
        "year": 1977,
    },
    {
        "name": "A Fire Upon the Deep",
        "description": "In a universe where faster-than-light travel is possible, civilizations are grouped by their proximity to the galactic core, where higher levels of technology are possible.",
        "author": "Vernor Vinge",
        "year": 1992,
    },
    {
        "name": "The Vorkosigan Saga",
        "description": "In a galaxy filled with political intrigue and interstellar conflict, a disabled aristocrat finds himself at the center of events that will shape the future of humanity.",
        "author": "Lois McMaster Bujold",
        "year": 1986,
    },
    {
        "name": "The Demolished Man",
        "description": "In a future where telepathy is real, a wealthy man commits murder and attempts to evade capture by the only man who can read his mind.",
        "author": "Alfred Bester",
        "year": 1953,
    },
    {
        "name": "The Wind's Twelve Quarters",
        "description": "A collection of short stories exploring themes of gender, power, and society in fantastical worlds.",
        "author": "Ursula K. Le Guin",
        "year": 1975,
    },
    {
        "name": "A Scanner Darkly",
        "description": "In a dystopian future where drug addiction is rampant, an undercover cop becomes addicted to the very substance he's supposed to be policing.",
        "author": "Philip K. Dick",
        "year": 1977,
    },
    {
        "name": "The Fifth Head of Cerberus",
        "description": "In a colonial society on a distant planet, the lines between human and alien, reality and myth, blur as three interconnected novellas explore themes of identity and oppression.",
        "author": "Gene Wolfe",
        "year": 1972,
    },
    {
        "name": "The Drowned World",
        "description": "In a flooded, post-apocalyptic world, a biologist explores the remnants of civilization and uncovers the secrets of the past.",
        "author": "J.G. Ballard",
        "year": 1962,
    },
    {
        "name": "The Malazan Book of the Fallen",
        "description": "In a sprawling epic of gods, magic, and empires, numerous characters from all walks of life navigate the complex politics and conflicts of a world teetering on the brink of chaos.",
        "author": "Steven Erikson",
        "year": 1999,
    },
    {
        "name": "The Culture Series",
        "description": "In a post-scarcity society where artificial intelligences run everything, humans explore the galaxy and grapple with the moral implications of their own utopia.",
        "author": "Iain M. Banks",
        "year": 1987,
    },
    {
        "name": "The Lathe of Heaven",
        "description": "A man's dreams alter reality, but his attempts to use this power for good only lead to unintended consequences.",
        "author": "Ursula K. Le Guin",
        "year": 1971,
    },
    {
        "name": "The Left Hand of Darkness",
        "description": "A human ambassador navigates the politics and social structure of a planet whose inhabitants have no fixed gender.",
        "author": "Ursula K. Le Guin",
        "year": 1969,
    },
    {
        "name": "The Lathe of Heaven",
        "description": "A man's dreams alter reality, but his attempts to use this power for good only lead to unintended consequences.",
        "author": "Ursula K. Le Guin",
        "year": 1971,
    },
    {
        "name": "The Stars My Destination",
        "description": "In a future where teleportation has reshaped society, a man seeks revenge against those who left him for dead on a derelict spaceship.",
        "author": "Alfred Bester",
        "year": 1956,
    }


]
qdrant = QdrantClient(
    url="https://9f2618f6-e9ec-497d-8bee-71a0e1f21bc1.us-east4-0.gcp.cloud.qdrant.io:6333",
    api_key="L0Fmsd6X0lhZlODXOYLQmRYskoQFYnurV7d1Ovfh-2EW3yWKzw4LFQ",
)

# qdrant.recreate_collection(
#     collection_name="my_books",
#     vectors_config=models.VectorParams(
#         # Vector size is defined by used model
#         size=encoder.get_sentence_embedding_dimension(),
#         distance=models.Distance.COSINE,
#     ),
# )

# qdrant.recreate_collection(
#     collection_name="my_books",
#     vectors_config=models.VectorParams(
#         # Vector size is defined by used model
#         size=encoder.get_sentence_embedding_dimension(),
#         distance=models.Distance.COSINE,
#     ),
# )
qdrant.upload_points(
    collection_name="quests",
    points=[
        models.Record(
            id=idx, vector=encoder.encode(doc["description"]).tolist(), payload=doc
        )
        for idx, doc in enumerate(documents)
    ],
   )
hits = qdrant.search(
    collection_name="quests",
    query_vector=encoder.encode("time travel").tolist(),
    limit=6,)
for hit in hits:
    print(hit.payload, "score:", hit.score)

# hits = qdrant.search(
#     collection_name="my_books",
#     query_vector=encoder.encode("alien invasion").tolist(),
#     query_filter=models.Filter(
#         must=[models.FieldCondition(key="year", range=models.Range(gte=2000))]
#     ),
#     limit=1,
# )
# for hit in hits:
#     print(hit.payload, "score:", hit.score)
