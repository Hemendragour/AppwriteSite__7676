import { Client, Account } from "appwrite";
import conf from '../conf/conf.js'; // Update this import according to your file structure

class AppwriteServicecurr {
    client;
    account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite project ID

        this.account = new Account(this.client);
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
            return null;
        }
    }

    // Other methods like createAccount, login, etc.
}

const appwriteServicec = new AppwriteServicecurr();
export default appwriteServicec;