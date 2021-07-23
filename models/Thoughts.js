const { Schema, model } = require('mongoose');
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
            unique: true,
            required: 'username is required!',
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
                unique: true,
                required: 'username is required!',
                trimmed: true
            },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

//reactionsCount virtual
ThoughtsSchema.virtual('reactionsCount').get(function() {
    return this.reactions.length;
});


const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;