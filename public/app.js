window.App = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},  
  initialize: function() {
    App.autocompleter = new Autocompleter();
    var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onmessage = function(m) { 
      App.autocompleter.add(m.data); 
    };
    this.router = new this.Routers.Main();
    Backbone.history.start({pushState: true});
  }
};
$(document).ready(function(){
  App.initialize();
});


App.Routers.Main = Backbone.Router.extend({
  routes: {
    "": "index",
//    ":query": "wordSearch"
  },
  index: function() {
    var view = new App.Views.Index();
    $('#container').html(view.render().el);
  },

  // wordSearch: function(query) {
  //   console.log("Yoo!"+query);
  //   var view = new App.Views.Index();
  //   $('#container').html(view.render().el);
  //   view.autoSearch(query);
  // }

});


App.Views.Index = Backbone.View.extend({
  tagName: "span",
  template: function(){ return "<form id=\"searchForm\"> <input id=\"searchBox\" type=\"text\"> Search field</input></form>";},
//  template: HandlebarsTemplates['/index'],
  events: {
    'keyup #searchBox': 'renderResults',
    'submit #searchForm': 'renderResults' 
  },
  render: function() {
    $(this.el).html(this.template());
//    this.render_results();
    return this;
  },
  renderResults: function(event) {
    event.preventDefault();
    $('#results').empty();
    var results = App.autocompleter.complete($('#searchBox').val());
    results.forEach(function(result) {
      $('#results').append("<li><a href=\"https://en.wikipedia.org/wiki/"+ result + "\">"+ result + "</li>");
    });
  },
    
  // autoSearch: function(query){
  //   $('#results').empty();
  //   var results = App.autocompleter.complete(query);
  //   $.each(results, function(index, result){
  //       $("#results").append("<li><a href=\"https://en.wikipedia.org/wiki/"+ result + "\">"+ result + "</li>");
     
  //   });
  // }
});

