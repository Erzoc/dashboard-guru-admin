const bcrypt = require('bcryptjs');

async function hashPasswords() {
  const admin123 = await bcrypt.hash('admin123', 10);
  const school123 = await bcrypt.hash('school123', 10);
  const guru123 = await bcrypt.hash('guru123', 10);
  
  console.log('admin123 hash:', admin123);
  console.log('school123 hash:', school123);
  console.log('guru123 hash:', guru123);
}

hashPasswords();
