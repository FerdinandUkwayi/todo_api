import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const TodosSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 60
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 1000
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Todo', TodosSchema);