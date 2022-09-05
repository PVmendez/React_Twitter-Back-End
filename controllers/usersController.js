const { User } = require("../models");

async function index(req, res) {
  const token = req.headers["authorization"];
  jwt.verify(token, "fraseSecreta", async (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "No autorizado" });
    }
    const users = await User.find({}).populate({
      path: "tweetList",
    });
    res.status(200).json({ msg: "Exito" });
    res.json(users);
  });
}

async function show(req, res) {
  const user = await User.findOne({ userName: req.params.userName }).populate({
    path: "tweetList",
    populate: {
      path: "author",
    },
  });

  res.json(user);
}

async function update(req, res) {
  const user = await User.findOne({ userName: req.params.userName });

  if (user.followerList.includes("631223cb431ae89ba7349c3c")) {
    await User.findOneAndUpdate(
      { userName: user.userName },
      {
        $pull: { followerList: "631223cb431ae89ba7349c3c" },
      }
    );

    await User.findOneAndUpdate(
      { _id: "631223cb431ae89ba7349c3c" },
      {
        $pull: { followingList: user._id },
      }
    );
  } else {
    await User.findOneAndUpdate(
      { userName: user.userName },
      {
        $push: { followerList: "631223cb431ae89ba7349c3c" },
      }
    );

    await User.findOneAndUpdate(
      { _id: "631223cb431ae89ba7349c3c" },
      {
        $push: { followingList: user },
      }
    );
  }

  res.send("xd");
}

// // Display the specified resource.
// async function show(req, res) {
// 	const users = await User.find().limit(3);
// 	const user = await User.findOne({ userName: req.params.userName }).populate({
// 		path: "tweetList",
// 		populate: {
// 			path: "author",
// 		},
// 	});
//   const suggestedUsers = await User.find({
// 		_id: { $in: req.user.followingList },
// 	});

// 	return res.render("profilePage", {  suggestedUsers, users, user, authUser: req.user });
// }

// async function follow(req, res) {
// 	await User.findOneAndUpdate(
// 		{ userName: req.params.userName },
// 		{
// 			$push: { followerList: req.user },
// 		}
// 	);

// 	const user = await User.findOne({ userName: req.params.userName });
// 	await User.findOneAndUpdate(
// 		{ userName: req.user.userName },
// 		{
// 			$push: { followingList: user },
// 		}
// 	);
// 	res.redirect("back");
// }

// async function unfollow(req, res) {
// 	await User.findOneAndUpdate(
// 		{ userName: req.params.userName },
// 		{
// 			$pull: { followerList: req.user._id },
// 		}
// 	);

// 	const user = await User.findOne({ userName: req.params.userName });
// 	await User.findOneAndUpdate(
// 		{ userName: req.user.userName },
// 		{
// 			$pull: { followingList: user._id },
// 		}
// 	);
// 	const suggestedUsers = await User.find({
// 		_id: { $in: req.user.followingList },
// 	});

// 	return res.render("profilePage", { suggestedUsers, user, authUser: req.user });
// }

// async function follow(req, res) {
//   //Vas a la base de datos y te traes el usuario que queres seguir
// 	const user = await User.findOne({ _id: req.params.id });
//   //Te agregas a vos a su lista de seguidores
// 	user.followerList.push(req.user);
// 	user.save();

//   //Te buscas a vos en la base de datos
// 	await User.findOneAndUpdate(
// 		{ _id: req.user._id },
// 		{
//       //Lo agregas a el a tu lista de followings
// 			$push: { followingList: user },
// 		}
// 	);
// 	res.redirect("back");
// }

// async function unfollow(req, res) {
//   //Vas a la base de datos y te traes el usuario que queres dejar de seguir
//   await User.findOneAndUpdate(
//     { _id: req.params.id },
//     {
//       //Te sacas a vos (req.user) de su lista de followers
//       $pull: { followerList: req.user._id },
//     }
//   );

//   //Vas a la base de datos y te traes el usuario que matchea con tu usuario (req.user)
//   const user = await User.findOne({ _id: req.params.id });
//   await User.findOneAndUpdate(
//     { _id: req.user._id },
//     {
//       //Lo sacas a el de tu following list
//       $pull: { followingList: user._id },
//     }
//   );

//   res.redirect("back");
// }

// async function showFollowers(req, res) {

//   const user = await User.findOne({ _id: req.params.id }).populate("followerList");
// 	const followerUsers = await User.find({_id: {$in: user.followerList}})

// 	const suggestedUsers = await User.find({
//       _id: { $nin: req.user.followingList },
//     });

// 	return res.render("showFollowers", { followerUsers, suggestedUsers, user });
// }

// async function showFollowing(req, res) {
// 	const user = await User.findOne({ _id: req.params.id }).populate(
//     "followingList"
//   );
//   const followingUsers = await User.find({ _id: { $in: user.followingList } });
// 	  const suggestedUsers = await User.find({
//       _id: { $nin: req.user.followingList },
//     });

// 	return res.render("showFollowing", { followingUsers, suggestedUsers, user });
// }

// async function search(req, res) {
// 	return res.redirect("/user/" + req.query.search);
// }

module.exports = {
  show,
  index,
  update,
  // follow,
  // unfollow,
  // showFollowers,
  // showFollowing,
  // search,
};
