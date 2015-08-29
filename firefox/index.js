
var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
  include: [/.*github\.com\/.*\/.*/],
  contentScriptFile: ['./pikaday/pikaday.js', './github-time-travel.js'],
  contentStyleFile: ['./pikaday/pikaday.css']
});
