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
const {User, Fandom, Tag, Audio, Podfic} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', username: 'codyPants', password: '123'}),
    User.create({email: 'murphy@email.com', username: 'murphysLaw', password: '123'}),
    User.create({email: 'omnomnomtea@email.com', username: 'omnomnomtea', password: '123'})
  ])

  const fandoms = await Promise.all([
    Fandom.create({name: 'Harry Potter (Books)', description: 'The books, not the movies'}),
    Fandom.create({name: 'Harry Potter (Movies)', description: 'The movies, not the books'}),
    Fandom.create({name: 'Harry Potter (All)', description: 'Books, movies, everything'}),
    Fandom.create({name: 'Homestuck'}),
  ])

  // Harry Potter subfandoms should have "Harry Potter (All)"" as a parent fandom
  await fandoms[0].addParent(fandoms[2])
  await fandoms[1].addParent(fandoms[2])

  const tags = await Promise.all([
    Tag.create({name: 'hurt/comfort'}),
    Tag.create({name: 'drama'}),
    Tag.create({name: 'classpects important'})
  ]);

  const audioFiles = await Promise.all([
    Audio.create({title: 'my hp podfic #1!', audioUrl: 'www.fake.com/audiofile.mp3', fileType: 'mp3'}),
    Audio.create({title: 'my hp podfic #2!', audioUrl: 'www.fake.com/audiofile2.mp3', fileType: 'mp3'}),
    Audio.create({title: 'best podfic ever!!', audioUrl: 'www.fake.com/audiofile33.mp3', fileType: 'mp3'}),
  ])


  await audioFiles[0].setUser(users[1])
  await audioFiles[1].setUser(users[1])
  await audioFiles[2].setUser(users[0])

  const podfics = await Promise.all([
    Podfic.create({title: 'First podfic', description: 'I made a podfic of this fic', textUrl: 'fakeurl.com'}),
    Podfic.create({title: 'My podfic', description: 'I made a podfic of this fic', textUrl: 'fakeurl.com/2'}),
    Podfic.create({title: 'Harry Potter and the Podfic of doom', description: 'Podfics are awesome', textUrl: 'fakeurl.com/1'}),
    Podfic.create({title: 'Harry Potter and the Best Podfic Ever', description: 'It\'s so good!', textUrl: 'fakeurl.com'}),
  ])

  podfics.forEach(async (podfic) => {
    await podfic.addUser(users[0])
  })
  await podfics[2].addUser(users[2])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${fandoms.length} fandoms`)
  console.log(`seeded ${tags.length} tags`)
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
