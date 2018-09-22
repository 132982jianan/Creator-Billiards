/**
 * 游戏场景
 * 普通球 + 白球 + 球杆
 */

cc.Class({
    extends: cc.Component,

    properties: {

        // 所有普通球
        ball_root: {
            type: cc.Node,
            default: null,
        },

        //  白球 
        white_ball: {
            type: cc.Node,
            default: null,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.is_game_started = true;
    },

    restart_game: function() {
        for(var i = 0; i < this.ball_root.childrenCount; i ++) {
            var b = this.ball_root.children[i];
            b.getComponent("ball").reset();
        }

        // 还可以这样调用组件实例的方法
        this.white_ball.getComponent("white_ball").reset();

        // 
        this.is_game_started = true;
    },

    check_game_over: function() {
        for(var i = 0; i < this.ball_root.childrenCount; i ++) {
            var b = this.ball_root.children[i];
            if(b.active === true) {
                return;
            }
        }

        this.is_game_started = false; // game_over;
        this.scheduleOnce(this.restart_game.bind(this), 5);
    },

    update (dt) {
        if (!this.is_game_started) {
            return;
        }

        // 是否所有的球都打入进去了;
        
        // end 
    },
});
