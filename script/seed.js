/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Fandom, Tag, Audio, Podfic, Character} = require('../server/db/models')

async function seedUsers() {
  const users = await Promise.all([
    User.create({email: 'cody@email.com', username: 'codyPants', password: '123'}),
    User.create({email: 'murphy@email.com', username: 'murphysLaw', password: '123'}),
    User.create({email: 'omnomnomtea@email.com', username: 'omnomnomtea', password: '123'})
  ])
  return users
}

async function seedFandoms() {
  const fandoms = await Promise.all([
    Fandom.create({name: 'Harry Potter (Books)', description: 'The books, not the movies'}),
    Fandom.create({name: 'Harry Potter (Movies)', description: 'The movies, not the books'}),
    Fandom.create({name: 'Harry Potter (All)', description: 'Books, movies, everything'}),
    Fandom.create({name: 'Homestuck'}),
  ])
  // Harry Potter subfandoms should have "Harry Potter (All)"" as a parent fandom
  await fandoms[0].addParent(fandoms[2])
  await fandoms[1].addParent(fandoms[2])
  return fandoms
}

async function seedCharacters() {
  const characters = await Promise.all([
    Character.create({name: 'Harry Potter'}),
    Character.create({name: 'Hermione Granger'}),
    Character.create({name: 'Ron Weasley'}),
    Character.create({name: 'Dave Strider'}),
    Character.create({name: 'John Egbert'}),
    Character.create({name: 'Karkat Vantas'}),
  ])
  return characters
}

async function seedTags() {
  const tags = await Promise.all([
    Tag.create({name: 'hurt/comfort'}),
    Tag.create({name: 'drama'}),
    Tag.create({name: 'classpects important'})
  ]);
  return tags
}

async function seedAudios() {
  const audioFiles = await Promise.all([
    Audio.create({title: 'my hp podfic #1!', audioUrl: 'www.fake.com/audiofile.mp3', fileType: 'mp3'}),
    Audio.create({title: 'my hp podfic #2!', audioUrl: 'www.fake.com/audiofile2.mp3', fileType: 'mp3'}),
    Audio.create({title: 'best podfic ever!!', audioUrl: 'www.fake.com/audiofile33.mp3', fileType: 'mp3'}),
    Audio.create({title: 'i tried', audioUrl: 'www.fake.com/audiofile34.mp3', fileType: 'mp3'}),
    Audio.create({title: 'version with music', audioUrl: 'www.fake.com/audiofile35.mp3', fileType: 'mp3'}),
    Audio.create({title: 'best podfic ever (wav version)', audioUrl: 'www.fake.com/audiofile33.wav', fileType: 'wav'}),
  ])
  return audioFiles
}

async function seedPodfics() {
  const podfics = await Promise.all([
    Podfic.create({title: 'First podfic', description: 'I made a podfic of this fic', textUrl: 'fakeurl.com'}),
    Podfic.create({title: 'My podfic', description: 'I made a podfic of this fic', textUrl: 'fakeurl.com/2'}),
    Podfic.create({title: 'Harry Potter and the Podfic of doom', description: 'Podfics are awesome', textUrl: 'fakeurl.com/1'}),
    Podfic.create({title: 'Harry Potter and the Best Podfic Ever', description: 'It\'s so good!', textUrl: 'fakeurl.com'}),
  ])
  return podfics
}

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await seedUsers()
  const fandoms = await seedFandoms()
  const characters = await seedCharacters()
  const tags = await seedTags()
  const audioFiles = await seedAudios()
  const podfics = await seedPodfics()

  //add fandoms to characters
  await characters[0].addFandoms(fandoms.slice(0, 3)) //add all the Harry Potter fandoms to the HP chars
  await characters[1].addFandoms(fandoms.slice(0, 3)) //add all the Harry Potter fandoms to the HP chars
  await characters[2].addFandoms(fandoms.slice(0, 3)) //add all the Harry Potter fandoms to the HP chars
  await characters[3].addFandom(fandoms[3])
  await characters[4].addFandom(fandoms[3])
  await characters[5].addFandom(fandoms[3])

  //add users to audio files
  await audioFiles.forEach(async (audio) => {
    await audio.setUser(users[Math.floor(Math.random() * users.length)])
  })

  // add tons of stuff to podfics
  await podfics.forEach(async (podfic, i) => {
    await podfic.addTag(tags[0])
    await podfic.addFandoms([fandoms[0], fandoms[2]])
    await podfic.addAudio(audioFiles[i])
    await podfic.addUser(audioFiles[i].userId)
  })
  await podfics[1].addTag(tags[1])
  await podfics[1].addTag(tags[2])
  await podfics[0].addFandom(fandoms[3])
  await podfics[2].addAudio(audioFiles[5])
  await podfics[2].addUser(audioFiles[5].userId)

  await podfics[3].addAudio(audioFiles[4])
  await podfics[3].addUser(audioFiles[4].userId)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${fandoms.length} fandoms`)
  console.log(`seeded ${tags.length} tags`)
  console.log(`seeded ${characters.length} characters`)
  console.log(`seeded ${audioFiles.length} audio files (urls are totes fake though so nothing will play)`)
  console.log(`seeded ${podfics.length} podfics`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
