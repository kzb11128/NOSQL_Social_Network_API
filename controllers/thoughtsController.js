const { User, Thought } = require('../models');

module.exports = {

  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.log("Cannot create thought", err);
      return res.status(500).json(err);
    }
  },

  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      console.log("Cannot find thoughts", err);
      return res.status(500).json(err);

    }
  },

  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .select('-__v');
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      await User.findOneAndUpdate(
        { username: thought.username },
        { $pull: { thoughts: thought._id } }
      );

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.id });
      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  
  async addReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reactions: req.body } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(updatedThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
};

module.exports = thoughtsController;
