import { Client, Databases, ID, Query } from "appwrite";

// just make sure we access those ID's of .env file
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')    //Our API Endpoint
    .setProject(PROJECT_ID);

// which functionality we want to use from AppWrite i.e., DataBase functionality
const database = new Databases(client);




// for this file is to be Executed, we actually have to call some kind of a function
// for update search count

// searchTerm --> that the user has searched for
// movie --> movie that associated with searchTerm
export const updateSearchCount = async (searchTerm, movie) =>{
    // console.log(PROJECT_ID, DATABASE_ID, COLLECTION_ID);


    // 1. Use Appwrite SDK to check if the searchTerm exists in the database
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("searchTerm", searchTerm)
        ])

        // 2. If it does, update the count
        if(result.documents.length > 0){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            })
        }
        // 3. If it doesn't, create a new document with the searchTerm and count as 1
        else{
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    }
    catch(error){
        console.error(error);
    }
}