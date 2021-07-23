const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
            ref: 'User'
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
    }
);


const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'required!',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: 
            {
                type: String,
                required: 'username is required!',
                ref: 'User'
            },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//reactionsCount virtual
ThoughtsSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length;
});




const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;