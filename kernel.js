const SettingsJson  = require("./settings.json"),
      say           = require('say'),
      player        = require('play-sound')(opts = {}),
      express       = require('express'),
      app           = express(),
      path          = require("path");
console.log("Kernel starting");

app.get('/', (req, res) => res.sendFile(path.join(__dirname, "/www/index.html")));

app.get('/play/:text', (req, res) => {
  res.status(202);
  console.log("Playing: " + req.params.text);
  player.play('Audio/ns.mp3', function(err){
    if (err) throw err;
    say.speak(req.params.text, "", 0.75);
  });
  res.send("OK");
});

app.get("/stop", (req, res) => {
  res.status(202);
  say.stop();
  console.log("OK, Stopped all Text to speech actions");
  res.send("OK, Stopped all Text to speech actions");
});

app.get("/templates", (req, res) => {
  res.sendFile(path.join(__dirname, "/templates.json"));
});

app.listen(SettingsJson.port, () => console.log(`WebServer Listening on port ${SettingsJson.port}!`));