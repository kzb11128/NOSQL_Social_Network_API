const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:id
router.route("/:id").get(getThoughtById).put(updateThought).delete(deleteThought);

// /api/thoughts/:id/reactions
router.route("/:id/reactions").post(addReaction);

// /api/thoughts/:id/reactions/:reactionId
router.route("/:id/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
