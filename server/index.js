const app = require('./server');

const PORT = parseInt(process.env.PORT || '3001', 10);

init();

async function init() {
  try {
    app.listen(PORT, () => {
      console.log(`Server API Listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}
