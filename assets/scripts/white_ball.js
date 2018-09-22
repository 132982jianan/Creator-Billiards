/**
 * 白球
 */
cc.Class({
    extends: cc.Component,

    properties: {

        // 球杆
        cue: {
            type: cc.Node,
            default: null,
        },
 
        /**
         *  如果拖动的距离到白球的中心 < 这个距离，那么我们就隐藏球杆，否者的话，显示球杆;
         */
        min_dis: 20, 
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        // 白球刚体
        this.body = this.getComponent(cc.RigidBody);

        // 球杆实例
        this.cue_inst = this.cue.getComponent("cue");

        // 白球位置
        this.start_x = this.node.x;
        this.start_y = this.node.y;

        // START(点击下去), MOVED（触摸移动）, ENDED(触摸在节点范围内弹起), CANCEL（节点范围外弹起）
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {

        }.bind(this), this);

        // 
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation();
            var dst = this.node.parent.convertToNodeSpaceAR(w_pos);
            var src = this.node.getPosition();
            var dir = cc.pSub(dst, src);
            var len = cc.pLength(dir);

            // 移动距离小于最小距离，隐藏球杆
            if (len < this.min_dis) {
                this.cue.active = false; 
                return;
            }

            // 设置球杆可见
            this.cue.active = true;

            var r = Math.atan2(dir.y, dir.x);
            var degree = r * 180 / Math.PI;
            degree = 360 - degree;

            this.cue.rotation = degree + 180;

            var cue_pos = dst;
            var cue_len_half = this.cue.width * 0.5;
            cue_pos.x += (cue_len_half * dir.x / len);
            cue_pos.y += (cue_len_half * dir.y / len);

            this.cue.setPosition(cue_pos);
        }.bind(this), this);

        // 
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            if (this.cue.active === false) {
                return;
            }
            this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);

        // 
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            if (this.cue.active === false) {
                return;
            }

            // 球杆射向一个球
            this.cue_inst.shoot_at(this.node.getPosition());
        }.bind(this), this);
    },

    // 白球重置位置
    reset: function () {
        this.node.scale = 1;
        this.node.x = this.start_x;
        this.node.y = this.start_y;

        this.body.linearVelocity = cc.p(0, 0);
        this.body.angularVelocity = 0;
    },

    // 
    onBeginContact: function (contact, selfCollider, otherCollider) {
        // 白球有可能，碰球杆，碰球，碰边,球袋
        if (otherCollider.node.groupIndex == 2) {
            // 隔1秒一种，要把白球放回原处;
            this.node.scale = 0;
            this.scheduleOnce(this.reset.bind(this), 1);
            // end  
            return;
        }
    },
    // update (dt) {},
});
