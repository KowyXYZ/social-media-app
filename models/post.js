
import { Schema, model, models } from "mongoose";

const postSchema = new Schema({
    creator: {
        type: 'String',
        required: [true, 'creator is requred']
    },
    text: {
        type: 'String',
        required: [true, 'Text is Required'],
    },
    tag: {
        type: 'String',
        required: [true, 'Tag is required']
    }
})

const Post = models.Post || model('Post', postSchema)

export default Post