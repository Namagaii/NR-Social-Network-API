const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
  {
    // TODO: add thoughtText
    thoughtText: {
      type: String,
      required: true,
      minlength: [1, "Text entry must be at least 1 character long."],
      maxlength: [280, "Text entry cannot be longer the 280 characters."]
    },
    // TODO: add createdAt
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp) 
    },
    // TODO: add username
    username: {
      type: String,
      trim: true
    },
    // TODO: add reactions
    reactions: [reactionSchema]
  },
  {
    // TODO: Add toJSON option
    toJSON: {
      virtuals: true,
    }
  }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
