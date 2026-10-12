import { prisma } from "../config/db";

const addToWatchlist = async (req, res) => {
  const { movieId, status, rating, notes } = req.body;

  // Check movie exist
  const movie = prisma.movie.findUnique({
    where: { id: movieId },
  });

  if (!movie) {
    return res.status(404).json({ error: "Movie not found." });
  }
};
