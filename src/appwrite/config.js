import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // async createPost({title, slug, content, featuredImage, status, userId}){
    //     try {
    //         return await this.databases.createDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             slug,
    //             {
    //                 title,
    //                 content,
    //                 featuredImage,
    //                 status,
    //                 userId,
    //             }
    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: createPost :: error", error);
    //     }
    // }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            const response = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,  // This is the document ID. Ensure `slug` is a unique identifier or adjust as needed.
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
            return response;  // Return the response to ensure the caller gets the created document data
        } catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;  // Rethrow the error to be handled by the caller
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries // Removed trailing comma
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // async getPosts(queries = [Query.equal("status", "active")]) {
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             queries,


    //         )
    //     } catch (error) {
    //         console.log("Appwrite serive :: getPosts :: errordddddddddddddddd", error);
    //         return false
    //     }
    // }
    // async getPosts(queries = [Query.equal("status", "active")]) {
    //     try {
    //         const response = await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteCollectionId,
    //             queries
    //         );
    //         return response.documents; // Return the list of documents
    //     } catch (error) {
    //         console.error("Appwrite service :: getPosts :: error", error);
    //         throw new Error("Failed to fetch posts. Please try again later."); // Provide a more informative error
    //     }
    // }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}


const service = new Service()
export default service