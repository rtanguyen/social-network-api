const router = require('express').Router();
const{
    getAllThoughts,
    getThoughtById,
    addThought,
    addReaction,
    updateThought,
    deleteThought,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

//api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

//TODO:
// /api/thoughts/:thoughtId/reactions
router 
    .route('/:thoughtsId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router 
    .route('/:thoughtsId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;