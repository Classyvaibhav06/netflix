import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })
import mongoose from "mongoose"
import Movie from "../models/Movie"
import connectDB from "../lib/mongoose"

const seedMovies = [
  // === ACTION ===
  {
    title: "The Dark Knight",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    releaseYear: 2008,
    duration: "2h 32m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    genre: "Action",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    isFeatured: true
  },
  {
    title: "Inception",
    posterPath: "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    backdropPath: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    releaseYear: 2010,
    duration: "2h 28m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    genre: "Action",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    isFeatured: false
  },
  {
    title: "Avengers: Endgame",
    posterPath: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdropPath: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    releaseYear: 2019,
    duration: "3h 1m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
    genre: "Action",
    description: "After the devastating events of Avengers: Infinity War, the universe is in ruins. The Avengers assemble once more to reverse Thanos's actions and restore balance to the universe.",
    isFeatured: false
  },
  {
    title: "Mad Max: Fury Road",
    posterPath: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    backdropPath: "/nlCHUWjY9XWbuEUQauCBgnY8ymF.jpg",
    releaseYear: 2015,
    duration: "2h 0m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
    genre: "Action",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    isFeatured: false
  },
  {
    title: "John Wick",
    posterPath: "/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    backdropPath: "/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg",
    releaseYear: 2014,
    duration: "1h 41m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=C0BMx-qxsP4",
    genre: "Action",
    description: "An ex-hit-man comes out of retirement to track down the gangsters that killed his dog and took everything from him.",
    isFeatured: false
  },
  {
    title: "Mission: Impossible - Fallout",
    posterPath: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    backdropPath: "/aw4FOsWr2FY373nKS77S6sLgDdc.jpg",
    releaseYear: 2018,
    duration: "2h 27m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=wb49-oV0F78",
    genre: "Action",
    description: "Ethan Hunt and his IMF team, along with some familiar allies, race against time after a mission gone wrong.",
    isFeatured: false
  },
  // === COMEDY ===
  {
    title: "The Grand Budapest Hotel",
    posterPath: "/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
    backdropPath: "/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
    releaseYear: 2014,
    duration: "1h 39m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=1Fg5iWmQjwk",
    genre: "Comedy",
    description: "The adventures of Gustave H, a legendary concierge at a famous European hotel between the wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
    isFeatured: false
  },
  {
    title: "Superbad",
    posterPath: "/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
    backdropPath: "/en971MEXui9diirXlogOrPKmsEn.jpg",
    releaseYear: 2007,
    duration: "1h 53m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=4eaZ_48ZYog",
    genre: "Comedy",
    description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    isFeatured: false
  },
  {
    title: "The Hangover",
    posterPath: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdropPath: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    releaseYear: 2009,
    duration: "1h 40m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=tcdUhdOlz9M",
    genre: "Comedy",
    description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing.",
    isFeatured: false
  },
  {
    title: "Knives Out",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    releaseYear: 2019,
    duration: "2h 10m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
    genre: "Comedy",
    description: "A detective investigates the death of the patriarch of an eccentric, combative family.",
    isFeatured: false
  },
  {
    title: "Deadpool",
    posterPath: "/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
    backdropPath: "/en971MEXui9diirXlogOrPKmsEn.jpg",
    releaseYear: 2016,
    duration: "1h 48m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=ONHBaC-pfsk",
    genre: "Comedy",
    description: "A wisecracking mercenary gets experimented on and becomes immortal yet hideously ugly, and sets out to track down the man who ruined his looks.",
    isFeatured: false
  },
  // === DRAMA ===
  {
    title: "The Shawshank Redemption",
    posterPath: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdropPath: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    releaseYear: 1994,
    duration: "2h 22m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=PLl99DlL6b4",
    genre: "Drama",
    description: "Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.",
    isFeatured: false
  },
  {
    title: "Forrest Gump",
    posterPath: "/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
    backdropPath: "/3h1JZGDhZ8nzxdgvkxha0qBqi05.jpg",
    releaseYear: 1994,
    duration: "2h 22m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=bLvqoHBptjg",
    genre: "Drama",
    description: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
    isFeatured: false
  },
  {
    title: "Interstellar",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropPath: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    releaseYear: 2014,
    duration: "2h 49m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    genre: "Drama",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    isFeatured: false
  },
  {
    title: "The Godfather",
    posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropPath: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    releaseYear: 1972,
    duration: "2h 55m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=sY1S34973zA",
    genre: "Drama",
    description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    isFeatured: false
  },
  {
    title: "Fight Club",
    posterPath: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdropPath: "/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    releaseYear: 1999,
    duration: "2h 19m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=qtRKdVHc-cE",
    genre: "Drama",
    description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
    isFeatured: false
  },
  {
    title: "Whiplash",
    posterPath: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    backdropPath: "/yR27bZPIkNhpGEIP3jKV2EifTgo.jpg",
    releaseYear: 2014,
    duration: "1h 46m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=7d_jQycdQGo",
    genre: "Drama",
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    isFeatured: false
  },
  // === THRILLER ===
  {
    title: "Gone Girl",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    releaseYear: 2014,
    duration: "2h 29m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=2-_-1nJf8Vg",
    genre: "Thriller",
    description: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
    isFeatured: false
  },
  {
    title: "Get Out",
    posterPath: "/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    backdropPath: "/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    releaseYear: 2017,
    duration: "1h 44m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=DzfpyUB60YY",
    genre: "Thriller",
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    isFeatured: false
  },
  {
    title: "Parasite",
    posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropPath: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    releaseYear: 2019,
    duration: "2h 12m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=5xH0HfJHsaY",
    genre: "Thriller",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    isFeatured: false
  },
  {
    title: "Se7en",
    posterPath: "/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    backdropPath: "/nlCHUWjY9XWbuEUQauCBgnY8ymF.jpg",
    releaseYear: 1995,
    duration: "2h 7m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=znmZoVkCjpI",
    genre: "Thriller",
    description: "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    isFeatured: false
  },
  {
    title: "Shutter Island",
    posterPath: "/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
    backdropPath: "/vVpEOvdxVBP2aV166j5Xlvb5Cdc.jpg",
    releaseYear: 2010,
    duration: "2h 18m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=5iaYLCiq5RM",
    genre: "Thriller",
    description: "In 1954, U.S. Marshal Teddy Daniels is investigating the disappearance of a murderer who escaped from a hospital for the criminally insane.",
    isFeatured: false
  },
  {
    title: "The Silence of the Lambs",
    posterPath: "/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg",
    backdropPath: "/aw4FOsWr2FY373nKS77S6sLgDdc.jpg",
    releaseYear: 1991,
    duration: "1h 58m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=W6GDil0rGls",
    genre: "Thriller",
    description: "A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.",
    isFeatured: false
  },
  // === SCI-FI ===
  {
    title: "The Matrix",
    posterPath: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropPath: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    releaseYear: 1999,
    duration: "2h 16m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=vKQi3bBA1y8",
    genre: "Sci-Fi",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth -- the life he knows is the elaborate deception of an evil cyber-intelligence.",
    isFeatured: false
  },
  {
    title: "Blade Runner 2049",
    posterPath: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdropPath: "/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
    releaseYear: 2017,
    duration: "2h 44m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=gCcx85zbxz4",
    genre: "Sci-Fi",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    isFeatured: false
  },
  {
    title: "Dune",
    posterPath: "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    backdropPath: "/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg",
    releaseYear: 2021,
    duration: "2h 35m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=8g18jFHCLXk",
    genre: "Sci-Fi",
    description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    isFeatured: false
  },
  {
    title: "Arrival",
    posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    backdropPath: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    releaseYear: 2016,
    duration: "1h 56m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=tFMo3UJ4B4g",
    genre: "Sci-Fi",
    description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    isFeatured: false
  },
  {
    title: "Ex Machina",
    posterPath: "/7fn624j5lj3xTme2SgiLCeuedmO.jpg",
    backdropPath: "/yR27bZPIkNhpGEIP3jKV2EifTgo.jpg",
    releaseYear: 2014,
    duration: "1h 48m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=EoQuVnKhxaM",
    genre: "Sci-Fi",
    description: "A young programmer is selected to participate in a ground-breaking experiment in synthetic intelligence by evaluating the human qualities of a highly advanced humanoid A.I.",
    isFeatured: false
  },
  // === HORROR ===
  {
    title: "A Quiet Place",
    posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    backdropPath: "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    releaseYear: 2018,
    duration: "1h 30m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=WR7cc5t7tv8",
    genre: "Horror",
    description: "In a post-apocalyptic world, a family is forced to live in silence while hiding from monsters with ultra-sensitive hearing.",
    isFeatured: false
  },
  {
    title: "Hereditary",
    posterPath: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropPath: "/fNG7i7RqMErkcqhohV2a6cV1Ehy.jpg",
    releaseYear: 2018,
    duration: "2h 7m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=V6wWKNij_1M",
    genre: "Horror",
    description: "A grieving family is haunted by tragic and disturbing occurrences, driving a woman to investigate her family's deepest and darkest secrets.",
    isFeatured: false
  },
  {
    title: "The Conjuring",
    posterPath: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdropPath: "/ilRyazdMJwN05exqhwK4tMKBYZs.jpg",
    releaseYear: 2013,
    duration: "1h 52m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=k10ETZ41q5o",
    genre: "Horror",
    description: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    isFeatured: false
  },
  {
    title: "It",
    posterPath: "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
    backdropPath: "/tcheoA2nPATCm2vvXw2hVQoaEFD.jpg",
    releaseYear: 2017,
    duration: "2h 15m",
    maturityRating: "R",
    trailerUrl: "https://www.youtube.com/watch?v=xKJmEC5ieOk",
    genre: "Horror",
    description: "In the summer of 1989, a group of bullied kids band together to destroy a shape-shifting monster, which disguises itself as a clown and preys on the children of their small town.",
    isFeatured: false
  },
  // === ROMANCE ===
  {
    title: "La La Land",
    posterPath: "/9E2y5Q7WlCVNEhP5GiVTjhEhx1o.jpg",
    backdropPath: "/tcheoA2nPATCm2vvXw2hVQoaEFD.jpg",
    releaseYear: 2016,
    duration: "2h 8m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    genre: "Romance",
    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    isFeatured: false
  },
  {
    title: "The Notebook",
    posterPath: "/rNzQyW4f8B8cQeg7Dgj3n6eT5k9.jpg",
    backdropPath: "/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
    releaseYear: 2004,
    duration: "2h 3m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=FC6biTjEyZw",
    genre: "Romance",
    description: "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
    isFeatured: false
  },
  {
    title: "Titanic",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropPath: "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
    releaseYear: 1997,
    duration: "3h 14m",
    maturityRating: "PG-13",
    trailerUrl: "https://www.youtube.com/watch?v=kVrqfYjkTdQ",
    genre: "Romance",
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    isFeatured: false
  },
]

async function seed() {
  try {
    await connectDB()
    console.log("Connected to MongoDB...")

    await Movie.deleteMany({})
    console.log("Cleared existing movies...")

    for (const movie of seedMovies) {
      await Movie.create(movie)
      console.log(`✅ Inserted: ${movie.title}`)
    }

    console.log(`\n🎉 Seeding complete! ${seedMovies.length} movies added.`)
    process.exit(0)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    process.exit(1)
  }
}

seed()