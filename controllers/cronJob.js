import cron from "node-cron";
import axios from "axios";
import CryptoCurrency from "../models/CryptoCurrency.js";
import dotenv from "dotenv";
dotenv.config();

// Background job to update cryptocurrencies every hour
export const startCronJob = () => {
    cron.schedule('0 * * * *', async () => {
        try {
            const response = await axios.get(`${process.env.COINGECKO_API_URL}/coins/list`);
            const currencies = response.data.map(currency => ({
                id: currency.id,
                name: currency.name,
            }));
            await CryptoCurrency.deleteMany({});
            await CryptoCurrency.insertMany(currencies);
            console.log('Cryptocurrencies updated successfully');
        } catch (error) {
            console.error('Error updating cryptocurrencies:', error);
        }
    });
};