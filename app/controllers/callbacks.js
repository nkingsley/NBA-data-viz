exports.stdMisses = function(player,stat,compare){
  player[stat] = player[stat] - player[compare];
};

exports.perGameMisses = function(player,stat,compare){
  player[stat] = player[stat] * player['GP'] - player[compare];
};

exports.perGameMissesByScore = function(player,stat,compare){
  player[stat] = player[stat] * player['GP'] - player[compare]/4;
};

exports.perGame = function(player,stat){
  player[stat] = player[stat] * player['GP'];
};