DiscordBot - work in progress

What it is?
Basically just a rolling bot, that could calculate all modifiers and stats that will be added to d20 roll. 
Player's stats, items, etc. are gotten from pdf document, the default CharacterSheet 5e that Wizards of the Coast provides.


Uses pdfToObject library (my own)
Creates object from pdf fields. Either provide mapping between object and pdf keys, or use same key names as pdf has in the object data is saved. This should be somewhat general, but has not been tested yet with other pdf documents than CharacterSheet5e.


Sidenotes:
Many features are still missing, this is the progress so far.
There was version 1 with javascript. Not all commands exported to this typescript version yet. 

Pondering:
Items are not implemented. People can create their own items, which makes this hard. There should be standardization for items. Also it might not be possible to populate discord commands based on player's inventory, since this would require different commands for each player.
Giving as a text only option, but it is painful. Equipping item and unequipping it with commands are possible as well. Having all weapon types defined and then finding if a certain item has some bonuses and adding those is a possibility.


