 new Vue({
        el: '#app',
        data: {
          youHealth: 100,
          monsterHealth: 100,
          started: false,
          log: []
        },
        watch: {
            youHealth: function (){
                if(this.youHealth<=0){
                    this.clear();
                    if(confirm("You lost! New Game?")){
                        this.clear();
                        this.started=true;
                    }
                    else{
                        this.clear();
                    }
                }
            },
            monsterHealth: function (){
                if(this.monsterHealth<=0){
                    if(confirm("You Win! New Game?")){
                        this.clear();
                        this.started=true;
                    }
                    else{
                        this.clear();
                    }
                }
            }
        },
        computed: {
            youStyle: function (){
                return {
                    backgroundColor: (this.youHealth>50?'green':(this.youHealth>25?'orange':'red')),
                    width: this.youHealth + '%'
                  };
            },
            monsterStyle: function (){
                return {
                    backgroundColor: (this.monsterHealth>50?'green':(this.monsterHealth>25?'orange':'red')),
                    width: this.monsterHealth + '%'
                  };
            }
        },
        methods: {
            attack: function () {
                console.log("attack!");
                var attack=Math.round(Math.random() * (10 - 1) + 1);
                this.monsterHealth-=attack;
                this.log.unshift({
                    isPlayer: true,
                    text: 'You hit the monster for: '+ attack
                });
                this.monsterAttack();
            },
            monsterAttack: function (){
                var attack=Math.round(Math.random() * (10 - 1) + 1);
                this.youHealth-=attack;
                this.log.unshift({
                    isPlayer: false,
                    text: 'The monster hits you for: '+ attack
                });
            },
            heal: function () {
                var heal=Math.round(Math.random() * (15 - 1) + 1);
                this.youHealth+=heal;
                if(this.youHealth>100){
                    this.youHealth=100;
                }

                this.log.unshift({
                    isPlayer: true,
                    text: 'You heal for: '+ heal
                });
                this.monsterAttack();
            },
            specialAttack: function (){
                var attack=Math.round(Math.random() * (15 - 5) + 5);
                this.monsterHealth-=attack;
                this.log.unshift({
                    isPlayer: true,
                    text: 'You hit the monster for: '+ attack
                });
                this.monsterAttack();
            },
            clear: function (){
                this.started=false;
                this.youHealth=100;
                this.monsterHealth=100;
                this.log=[];
            }
        }
      });