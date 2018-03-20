var user = require('../../models/user');
var moment = require("moment");

module.exports = {

	landing: function (req, res) {
		res.render("index");
	},

	startingLocation: function(req, res) {

		var initialStandId = req.body.startingPoint;
		var userId = req.body.beaconID;
		var busId = req.body.busID;
		var name = "hanu";

		user.findOne({userId: "c1ef2600-ed38-4d48-850d-2a8fd22e5ae6"}).exec(function(err, checkUserIsPresent) {

			if (err) {
				console.log(err);
			}

			if (!checkUserIsPresent) {
					user.create({
					initialStandId: initialStandId,
					userId: "c1ef2600-ed38-4d48-850d-2a8fd22e5ae6",
					busId: busId,
					name: name,
					creditedAmount: 3000,
					startingTime: moment().format()

				}, function(err, newUser) {
					if (err) {
						console.log(err);
					}



					res.json(newUser);
				})
			} else {
					user.create({
					initialStandId: initialStandId,
					userId: "c1ef2600-ed38-4d48-850d-2a8fd22e5ae6",
					busId: busId,
					name: name,
					creditedAmount: checkUserIsPresent.creditedAmount,
					startingTime: moment().format()

				}, function(err, newUser) {
					if (err) {
						console.log(err);
					}

					// console.log(newUser);

					res.json(newUser);
				})
			}
		})
	},

	endLocation: function(req, res) {

		var finalStandId = req.body.endPoint;
		var userId = req.body.beaconID;
		userId = "c1ef2600-ed38-4d48-850d-2a8fd22e5ae6";
		var busId = req.body.busID;

		user.find({ userId: userId, busId: busId }).sort({'startingTime': 'desc'}).exec( function(err, foundUser) {
			if (err) {
				console.log(err);
			}


			console.log(foundUser[foundUser.length-1]);
			foundUser[foundUser.length-1].finalStandId = finalStandId;
			foundUser[foundUser.length-1].endTime = moment().format();
			foundUser[foundUser.length-1].amountCharged = 5;
			foundUser[foundUser.length-1].creditedAmount = foundUser[foundUser.length-1].creditedAmount - 5;

			foundUser[foundUser.length-1].save(function(err, SavedUser) {
				if (err){
					console.log(err);
				}

				// console.log(SavedUser);
				res.json(foundUser[foundUser.length-1]);
			})




		})
	},

	home: function(req, res) {
		res.render("home.ejs");
	},

	timeline: function(req, res) {

		var locations = ["Rohini", "janakpuri", "dwarka", "dms Mall" , "samaypur", "badli" , "ramesh nagar",
						"kalkaji Mandir", "kamla nagar", "moti nagar"
						]

		user.find({ userId: "c1ef2600-ed38-4d48-850d-2a8fd22e5ae6" }).sort({'startingTime': 'desc'}).exec(function(err, foundUser) {
			if (err) {
				console.log(err);
			}
			var location = {
				location1 : locations[Math.floor(Math.random() * locations.length)],
				location2 : locations[Math.floor(Math.random() * locations.leChallngth)]
			}
			// It is the array of the user
			res.render("timeline", { foundUser: foundUser, moment: moment, locations: locations });
		})
	},

	balanceEnquiry: function(req, res) {
		user.find({ userId: "c1ef2600-ed38-4d48-850d-2a8fd22e5ae6" }).sort({'startingTime' : 'desc'}).exec( function(err, foundUser) {
			if (err) {
				console.log(err);
			}

			res.render("profile" , { foundUser: foundUser[0] });
		})
	}

}
