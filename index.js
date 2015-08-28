
var pageMod = require("sdk/page-mod");
 
pageMod.PageMod({
  include: [/.*github\.com\/.*\/.*/],
  contentScriptFile: ['./pikaday/pikaday.js', './github-goto-date.js'],
  contentStyleFile: ['./pikaday/pikaday.css', './github-goto-date.css']
});
