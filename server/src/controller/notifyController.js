const Notifies = require("../models/notifyModel");

const getNotify = async (req, res, next) => {
  try {
    const notifies = await Notifies.find({ recipients: req.user.id })
      .sort("-createdAt")
      .populate("user", "google.name google.avatar");

    res.status(200).json({ notifies });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const createNotify = async (req, res, next) => {
  try {
    const { id, recipients, url, text } = req.body;

    if (recipients.includes(req.user.id.toString())) {
      return res.status(400).json(null);
    }

    const notify = new Notifies({
      id,
      recipients,
      url,
      text,
      user: req.user.id,
    });

    await notify.save();
    res.status(200).json({ notify });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const isReadNotify = async (req, res, next) => {
  try {
    const notifies = await Notifies.findOneAndUpdate(
      { _id: req.params.id },
      {
        isRead: true,
      }
    );

    return res.json({ notifies });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const removeNotify = async (req, res, next) => {
  try {
    const notify = await Notifies.findOneAndDelete({
      id: req.params.id,
      url: req.query.url,
    });

    return res.json({ notify });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  getNotify,
  createNotify,
  isReadNotify,
  removeNotify,
};
