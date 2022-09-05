const Tweet = require("../models/Tweet");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function index(req, res) {
  res.json(tweets);
  const token = req.headers["authorization"];
  jwt.verify(token, "fraseSecreta", async (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "No autorizado" });
    }
    const tweets = await Tweet.find({})
      .populate({
        path: "author",
      })
      .sort([["date", -1]]);

    res.json(tweets);
  });
}

async function show(req, res) {
  const tweet = await Tweet.findById(req.params.id).populate({
    path: "author",
  });

  res.json(tweet);
}

async function store(req, res) {
  console.log(req.body);
  const tweet = new Tweet({
    content: req.body.content,
    date: new Date(),
    author: "631223cb431ae89ba7349c3c",
    likes: [],
  });

  await User.findByIdAndUpdate("631223cb431ae89ba7349c3c", {
    $push: { tweetList: tweet },
  });
  await tweet.save();

  res.send("Tweet creado");
}

// async function like(req, res) {
//   await Tweet.findByIdAndUpdate(req.params.tweetId, {
//     $push: { likes: req.user },
//   });
//   res.redirect("back");
// }

// async function dislike(req, res) {
//   await Tweet.findByIdAndUpdate(req.params.tweetId, {
//     $pull: { likes: req.user._id },
//   });
//   res.redirect("back");
// }

// async function destroy(req, res) {
//   await Tweet.findByIdAndDelete(req.params.tweetId);
//   res.redirect("back");
// }

module.exports = {
  index,
  show,
  store,
  // like,
  // dislike,
  // destroy,
};
