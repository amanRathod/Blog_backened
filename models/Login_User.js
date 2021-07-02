const mongoose = require('mongoose')
const posts = require('./Post');

// const UserSchema =  new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// accounts: [
//   { 
//     kind: {
//       type: String,
//       enum: ["google","internal","github"],
//       required: true
//       }, 
//     googleId: {
//        type: String
//      },
//     image: {
//         type: String
//       },
//     password: {
//         type: String,
//       },
//     githubId: {
//       type: String,
//       }
// }
// ],
// })

const UserSchema =  new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  posts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: posts,
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  // accounts: [
  //   { type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Google_User',
      
  //   },
  //   { type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Github_User',
      
  //   }
  // ],
  resetToken: {
    type: String,
  },
  expireToken: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

})

module.exports = mongoose.model('User', UserSchema);





