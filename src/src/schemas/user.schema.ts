import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({


    first_name:  {
        type: String,
        required: true,
        minlength:  3,
        maxlength: 20
    },

    last_name:  {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },

   email:  {
        type: String,
        required: true,
        email: true,
        unique: true
    },

   password:  {
        type: String,
        required: true,
    },

},
  {
      collection: 'users',
      timestamps: true
  });