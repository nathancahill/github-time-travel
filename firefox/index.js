
var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
  include: [/.*github\.com\/.*\/.*/],
  contentScriptFile: ['./pikaday/pikaday.js', './github-commit-dates.js'],
  contentStyleFile: ['./pikaday/pikaday.css']
});
