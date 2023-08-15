const mongoose = require('mongoose');

async function resetDatabase() {
  try {
    await mongoose.connection.db.dropDatabase();
    console.log('Dropped existing database');

  } catch (error) {
    console.error('Error dropping database:', error);
  }
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/SocialDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  resetDatabase();
})
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

module.exports = mongoose.connection;