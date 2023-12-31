// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.log("Cannot create user", err);
      return res.status(500).json(err);
    }
  },


  async getAllUsers(req, res) {
    try {
      const users = await User.find()
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v");
      res.json(users);
    } catch (err) {
      console.log("Cannot find users",err);
      return res.status(500).json(err);
  
    }
  },

  // get one user by id
  async getUserById( req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select('-__v');
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndDelete({ _id: req.params.id });
      if (!deletedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

      res.json(deletedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate( { _id: req.params.id }, req.body, { new: true, runValidators: true });
      
      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'No user with this id!' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
}
