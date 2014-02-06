angular.module('MoneyBaller').factory("Header", [function () {
  return {
    introCollapsed: true,
    introShow: 'i',
    infoShow: 'Hide Info',
    introToggle: function(){
      this.introCollapsed = !this.introCollapsed;
      this.introShow = this.introCollapsed ? 'i' : '^';
    }
  };
}]);