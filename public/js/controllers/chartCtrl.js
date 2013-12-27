var teams = [
  {abbreviation:"ATL",franchise:"Atlanta Hawks",winPct:0.536},
  {abbreviation:"BKN",franchise:"Brooklyn Nets",winPct:0.414},
  {abbreviation:"BOS",franchise:"Boston Celtics",winPct:0.333},
  {abbreviation:"CHA",franchise:"Charlotte Bobcats",winPct:0.483},
  {abbreviation:"CHI",franchise:"Chicago Bulls",winPct:0.385},
  {abbreviation:"CLE",franchise:"Cleveland Cavaliers",winPct:0.37},
  {abbreviation:"DAL",franchise:"Dallas Mavericks",winPct:0.571},
  {abbreviation:"DEN",franchise:"Denver Nuggets",winPct:0.519},
  {abbreviation:"DET",franchise:"Detroit Pistons",winPct:0.467},
  {abbreviation:"GSW",franchise:"Golden State Warriors",winPct:0.552},
  {abbreviation:"HOU",franchise:"Houston Rockets",winPct:0.621},
  {abbreviation:"IND",franchise:"Indiana Pacers",winPct:0.821},
  {abbreviation:"LAC",franchise:"Los Angeles Clippers",winPct:0.69},
  {abbreviation:"LAL",franchise:"Los Angeles Lakers",winPct:0.464},
  {abbreviation:"MEM",franchise:"Memphis Grizzlies",winPct:0.444},
  {abbreviation:"MIA",franchise:"Miami Heat",winPct:0.778},
  {abbreviation:"MIL",franchise:"Milwaukee Bucks",winPct:0.214},
  {abbreviation:"MIN",franchise:"Minnesota Timberwolves",winPct:0.464},
  {abbreviation:"NOH",franchise:"New Orleans Pelicans*",winPct:0.462},
  {abbreviation:"NYK",franchise:"New York Knicks",winPct:0.333},
  {abbreviation:"OKC",franchise:"Oklahoma City Thunder",winPct:0.815},
  {abbreviation:"ORL",franchise:"Orlando Magic",winPct:0.286},
  {abbreviation:"PHI",franchise:"Philadelphia 76ers",winPct:0.286},
  {abbreviation:"PHX",franchise:"Phoenix Suns",winPct:0.63},
  {abbreviation:"POR",franchise:"Portland Trail Blazers",winPct:0.821},
  {abbreviation:"SAC",franchise:"Sacramento Kings",winPct:0.296},
  {abbreviation:"SAS",franchise:"San Antonio Spurs",winPct:0.786},
  {abbreviation:"TOR",franchise:"Toronto Raptors",winPct:0.423},
  {abbreviation:"UTA",franchise:"Utah Jazz",winPct:0.258},
  {abbreviation:"WAS",franchise:"Washington Wizards",winPct:0.48}
  ];



angular.module('mean.chart')
  .controller('chartCtrl', function AppCtrl ($http, $scope) {

    
    teams.forEach(function(team) {
      team.starVal = Math.random() * 2;
    });

    
    $scope.options = {height: 500, width: 900};
    $scope.data = teams;

    // $scope.hovered = function(d){
    //   $scope.barValue = d;
    //   $scope.$apply();
    // };
  });



