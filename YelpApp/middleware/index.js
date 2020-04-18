var Campground = require("../models/campground"),
    Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if (middlewareObj.isLoggedIn) {
        Campground.findById(req.params.id, (err, foundCampground) => {
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if (req.user._id) {
                    if (foundCampground.author.id.equals(req.user._id))
                        next();
                }
                else {
                    req.flash("You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if (middlewareObj.isLoggedIn) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) res.redirect("back");
            else {
                if (foundComment.author.id.equals(req.user._id))
                    next();
                else {
                    req.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in to that!");
        res.redirect("/login");
    }
}

module.exports = middlewareObj;