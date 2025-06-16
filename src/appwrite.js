import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const WATCHLIST_COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_WATCHLIST;

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(6),
      Query.orderDesc("count")
    ]);
    return result.documents;
  } catch (error) {
    console.error(error);
  }
};


export const addToWatchlist = async (movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, WATCHLIST_COLLECTION_ID, [
      Query.equal("movie_id", movie.id),
    ]);

    if (result.documents.length > 0) {
      console.log("Already in watchlist");
      return result.documents[0];
    }

    return await database.createDocument(DATABASE_ID, WATCHLIST_COLLECTION_ID, ID.unique(), {
      movie_id: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      original_language: movie.original_language,
    });
  } catch (error) {
    console.error("Error in addToWatchlist:", error);
  }
};

export const removeFromWatchlist = async (movieId) => {
  const result = await database.listDocuments(DATABASE_ID, WATCHLIST_COLLECTION_ID, [
    Query.equal("movie_id", movieId),
  ]);

  if (result.documents.length > 0) {
    await database.deleteDocument(DATABASE_ID, WATCHLIST_COLLECTION_ID, result.documents[0].$id);
  }
};

export const getWatchlist = async () => {
  const result = await database.listDocuments(DATABASE_ID, WATCHLIST_COLLECTION_ID);
  return result.documents.map(doc => ({
    ...doc,
    id: doc.movie_id,
  }));
};
