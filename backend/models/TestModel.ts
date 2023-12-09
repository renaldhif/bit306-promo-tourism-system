import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const someDataSchema = new Schema({
  // define your schema fields here, for example, 'name' and 'value'
  name: { type: String, required: true },
  value: { type: Number, required: true }
});

const SomeData = mongoose.model('SomeData', someDataSchema);

export default SomeData;
