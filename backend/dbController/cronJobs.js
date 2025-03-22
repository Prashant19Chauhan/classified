import cron from 'node-cron'
import Ad from '../models/Ad.js'
import AdsHistory from '../models/adsHistory.js'
import AdsShedule from '../models/sheduleAds.js'

cron.schedule("* * * * *", async () => {
    console.log("Checking for expired ads...");
    console.log(new Date());
  
    try {
        await AdsShedule.updateMany(
            { startDate: { $lte: new Date() }, status: "approved" },
            { $set: { status: "Active" } }
        );
        console.log("starting ads marked as Active.");
        const adsToMoveToShow = await AdsShedule.find({
            status: "Active"
        })
        if(adsToMoveToShow.length === 0){
            console.log("no ads to show")
        }
        else{
            await Ad.insertMany(adsToMoveToShow);
            await AdsShedule.deleteMany({
                status: "Active",
            });
        }

        const adsToMoveToHistory = await AdsShedule.find({
            status: "notApproved"
        })
        if(adsToMoveToHistory.length === 0){
            console.log("no ads go to History")
        }
        else{
            await AdsHistory.insertMany(adsToMoveToHistory);
            await AdsShedule.deleteMany({
                status: "notApproved",
            });
        }

        await Ad.updateMany(
            { endDate: { $lte: new Date() }, status: "Active" },
            { $set: { status: "Completed" } }
        );
        console.log("Expired ads marked as Completed.");

        /* moving not approved and completed ads to AdsHistory model */
        const adsToMove = await Ad.find({
            status: "Completed"
        });
        if (adsToMove.length === 0) {
            console.log("No ads to move.");
        }
        else{
            await AdsHistory.insertMany(adsToMove);
            await Ad.deleteMany({
                status: "Completed"
              });
        }

    } catch (error) {
        console.error("Error updating ads:", error);
    }
});

console.log("Cron job scheduled to run every hour.");
