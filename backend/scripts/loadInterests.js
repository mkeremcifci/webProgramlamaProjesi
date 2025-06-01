import mongoose from 'mongoose';
import Interest from '../data/models/Interests.js';

const interestList = [
  "Software Development", "Web Design", "Artificial Intelligence", "Machine Learning", "Cybersecurity",
  "Data Science", "Mobile App Development", "UI/UX Design", "Game Development", "Cloud Computing",
  "Psychology", "Neuroscience", "Nutrition", "Genetics", "Biotechnology",
  "Philosophy", "Sociology", "History", "Economics", "Political Science",
  "Astronomy", "Physics", "Mathematics", "Chemistry", "Biology",
  "Photography", "Music", "Film Making", "Reading", "Writing",
  "Traveling", "Fitness", "Cooking", "Meditation", "Gardening",
  "Languages", "Chess", "Blogging", "Digital Marketing", "Entrepreneurship",
  "Volunteering", "Animal Care", "Climate Change", "Sustainable Living", "3D Printing",
  "Electronics", "DIY Projects", "Virtual Reality", "Robotics", "Space Exploration"
];

async function run() {
  try {
    await mongoose.connect("mongodb+srv://toprakkaya:1234@cluster0.jv0shqh.mongodb.net/webProgramlamaProjesi?retryWrites=true&w=majority");
    const exists = await Interest.countDocuments();
    if (exists === 0) {
      await Interest.insertMany(interestList.map(name => ({ name })));
      console.log(" İlgi alanları başarıyla yüklendi.");
    } else {
      console.log("ℹ İlgi alanları zaten mevcut.");
    }
  } catch (err) {
    console.error(" Hata:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

run();
