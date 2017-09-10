var model = {
    currentPerson: {},
    allPersons: [
      {
        name: 'Lily Butler',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/1.jpg'
      },
      {
        name: 'Waller Perry',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/1.jpg'
      },
      {
        name: 'Tammi Donovan',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/2.jpg'
      },
      {
        name: 'Doreen Flowers',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/3.jpg'
      },
      {
        name: 'Price Pace',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/4.jpg'
      },
      {
        name: 'Larson Maldonado',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/5.jpg'
      },
      {
        name: 'Berg Bolton',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/2.jpg'
      },
      {
        name: 'Mack Lott',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/6.jpg'
      },
      {
        name: 'Rosanna Mcleod',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/7.jpg'
      },
      {
        name: 'Rosalie Rice',
        score: 1,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/8.jpg'
      },
      {
        name: 'Virginia Buchanan',
        score: 2,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/3.jpg'
      },
      {
        name: 'Lorna Stein',
        score: 4,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/9.jpg'
      },
      {
        name: 'Rosalie Steele',
        score: 3,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/women/4.jpg'
      },
      {
        name: 'Wilcox Boyd',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/10.jpg'
      },
      {
        name: 'Ollie Rice',
        score: 5,
        photoUrl: 'http://api.randomuser.me/portraits/thumb/men/11.jpg'
      }
    ]
};

var control = {
    init: function(){
        listView.init();
        listView.render();
        
        scoresView.init();
        scoresView.render();
        
        sortView.init();
        sortView.render();
        
        profileView.init();
    },
    getAllNames: function(){
        var arr = [];
        var obj = model.allPersons;
        for(var x in obj){
            arr.push(obj[x].name);
        }
        return arr;
    },
    getAllScores: function(){
        var arr = [];
        var obj = model.allPersons;
        for(var x in obj){
            arr.push(obj[x].score);
        }
        return arr;
    },
    setCurrentPerson: function(index){
        model.currentPerson = model.allPersons[index];
        this.viewCurrentProfile();
    },
    getCurrentPerson: function(){
        return model.currentPerson;
    },
    viewCurrentProfile: function(){
        profileView.render();
        personInfo.render();
    },
    setCurrentPersonScore: function(value){
        model.currentPerson.score = value;
        scoresView.render();
        profileView.render();
        personInfo.render();
    },
    sortAllPersons: function(num1, num2){
        var allPersons = model.allPersons;
        allPersons.sort(function(a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
           
            if (nameA < nameB) {
                return num1;
            }
            if (nameA > nameB) {
                return num2;
            }
            return 0;
        });
        model.allPersons = allPersons;
        scoresView.render();
        listView.render();
    }
};

var sortView = {
    init: function () {
        this.$container = $('.sorting');
        this.handleClicks();
    },
    render: function () {
        var names = control.getAllNames();
        var data = '';
        for (var i = 0; i < names.length; i++) {
            data += '<li><a>&#8693;</a></li>';
        }
        this.$container.html(data);
    },
    handleClicks: function () {
        var toggle = false;
        this.$container.on('click', 'li', function () {
            if (!toggle) {
                control.sortAllPersons(-1, 1);
                toggle = true;
            }
            else {
                control.sortAllPersons(1, -1);
                toggle = false;
            }
        })
    }
};

var listView = {
    init: function(){
        this.$container = $('.names');
        this.handleClicks();
    },
    render: function(){
        var names = control.getAllNames();
        var data = '';
        for(var i = 0; i < names.length; i++){
            data += "<li>"+names[i]+"</li>";
        }
        this.$container.html(data);
    },
    handleClicks: function(){
        this.$container.on('click', 'li', function(event){
            var index = $(event.target).index();
            control.setCurrentPerson(index);
        })
    }
};

var scoresView = {
    init: function () {
        this.$container = $('.scores');
        this.handleClicks();
    }
    , render: function () {
        var scores = control.getAllScores();
        var data = '';
        for (var i = 0; i < scores.length; i++) {
            data += '<li>' + '<span>' + scores[i] + '</span>' + '<input type="text" class="hidden score-input" value="' + scores[i] + '">' + '</li>';
        }
        this.$container.html(data);
    }
    , handleClicks: function () {
        this.$container.on('click', 'li', function (event) {
            var score = control.getCurrentPerson().score;
            var span = $(event.target).find('span');
            var input = $(event.target).find('input.score-input');
            var index = $(event.target).index();
            input.removeClass('hidden');
            span.addClass('hidden');
            input.focus();
            control.setCurrentPerson(index);
            $('input').blur(function () {
                var val = this.value;
                control.setCurrentPersonScore(val);
            });
        })
    }
};

var profileView = {
    init: function(){
        this.$container = $('.profile');
    },
    render: function(){
        var person = control.getCurrentPerson();
        this.$container.html('<img src="' + person.photoUrl + '"><h3>'+ person.name + '</h3><p>' + person.score + '</p>');
    }
};

var personInfo = {
    init: function(){
        this.render();
    },
    render: function(){
        var person = control.getCurrentPerson();
        $('.person-info').html('<p> Selected person is <b> ' + person.name + '.</b> Persons score is: <b> '+ person.score + '</b></p>');
    }
};

control.init();