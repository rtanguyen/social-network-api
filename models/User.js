const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: 'username is required!',
            trimmed: true
        },
        email: {
            type: String,
            unique: true,
            required: 'email is required!',
            match: [/.+@.+\..+/]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// friendCount virtual
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);


module.exports = User;