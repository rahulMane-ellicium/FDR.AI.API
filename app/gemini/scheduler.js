import cron from 'node-cron';
import geminiService from './gemini.service.js';

const scheduleItsmDataSave = () => {
    // Schedule the job for 5:30 PM today
    cron.schedule('31 19 * * *', async () => {
        try {
            console.log("Started");
            const response = await geminiService.getItsmData();
            console.log('Running a job at 5:30 PM today in Asia/Kolkata timezone');
            // res.status(200).send(new ResponseHandler(response));
            // Handle the response as needed
            console.log(response);
        } catch (error) {
            console.error('Error running the scheduled job:', error);
        }
    }, {
        scheduled: true,
        timezone: "Asia/Kolkata"
    });

   
};

export default scheduleItsmDataSave;
