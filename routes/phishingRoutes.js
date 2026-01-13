const express = require("express");
const {createAndSendCampaign , getVendorCampaigns ,getOpenedUsers  } = require("../controller/phishingController");
const router = express.Router();


router.route('/')
.post( createAndSendCampaign) 
.get(  getVendorCampaigns);

router.get( "/:campaignId/opened",  getOpenedUsers);



module.exports = router;


