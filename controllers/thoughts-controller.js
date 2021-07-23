const { Thoughts, User } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'no thoughts just vibes' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    addThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: _id }},
                { new: true }
            );
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'no user found with this id'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));        
    },

//POST to create a reaction stored in a single thought's reactions array field
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
                { _id: params.thoughtsId },
                { $push: { reactions: body }},
                { new: true, runValidators: true }
          )
        .then(dbReactionsData => {
            if(!dbReactionsData) {
                res.status(404).json({ message: 'no thought found with id'});
                return;
            }
            res.json(dbReactionsData)
        })
        .catch(err => res.json(err));        
    },

    updateThought({ params, body }, rse) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'no thoughts just vibes' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({ message: 'no thoughts just vibes' });
                return;
            }
            res.json(dbThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },

//DELETE to pull and remove a reaction by the reaction's reactionId value
    deleteReaction({ params }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
      )
    .then(dbReactionsData => res.json(dbReactionsData))
    .catch(err => res.json(err));
    }
};

module.exports = thoughtsController