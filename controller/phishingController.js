const PhishingCampaign = require("../model/phishingCampaignModel");
const User = require("../model/user");
const sendEmail = require("../utils/sendEmail");
const asyncHandelar = require("express-async-handler");
const loadEmailTemplate = require("../utils/loadTemplate");
const ApiError = require("../utils/apiError");


exports.createAndSendCampaign = asyncHandelar(async (req, res) => {
  const vendorId = req.user._id;
  const { title, emailSubject } = req.body;

  const users = await User.find({
    vendorId,
    status: "ACTIVE",
  });

  if (!users.length) {
    return res.status(400).json({
      message: "No users found for this vendor",
    });
  }

  const campaign = await PhishingCampaign.create({
  vendorId,
  title,
  emailSubject,
  emailTemplate: "test.html",
  sentTo: users.map((user) => ({
    userId: user._id,
    email: user.email,
    sentAt: Date.now(),
  })),
});


  for (const user of users) {
    const trackingLink = `${process.env.BASE_URL}/api/v1/phishing/track/${campaign._id}/${user._id}`;

    const emailHtml = loadEmailTemplate(
      "test.html",
      { trackingLink }
    );

    await sendEmail({
      to: user.email,
      subject: emailSubject,
      html: emailHtml,
    });
  }

  res.status(201).json({
    message: "Campaign sent successfully",
    campaignId: campaign._id,
  });
});

exports.getVendorCampaigns = asyncHandelar(async(req,res ,next)=>{
  const campaigns = await PhishingCampaign.find({
    vendorId: req.user._id,
  }).sort({ createdAt: -1 });

 if (campaigns.length === 0)
  {
    return next (new ApiError ( " no campaigns exist" , 404))
  }
  res.status(200).json({
    results: campaigns.length,
    campaigns,
  });
});

exports.getOpenedUsers = asyncHandelar(async(req,res)=>{
  const { campaignId } = req.params;
  const vendorId = req.user._id;

  const campaign = await PhishingCampaign.findOne({
    _id: campaignId,
    vendorId,
  }).populate("sentTo.userId", "name email");

  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  const openedUsers = campaign.sentTo
    .filter((u) => u.opened)
    .map((u) => ({
      name: u.userId?.name,
      email: u.userId?.email,
      openedAt: u.openedAt,
    }));

  res.status(200).json({
    totalOpened: openedUsers.length,
    users: openedUsers,
  });
});






