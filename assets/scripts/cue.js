/**
 * 球杆
 */
cc.Class({
    extends: cc.Component,

    properties: {
        SHOOT_POWER: 18, // 合适的值就可以了
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

        // 获取球杆刚体
        this.body = this.getComponent(cc.RigidBody);
    },

    /**
     * 向目标点射击
     * dst  
     */
    shoot_at: function(dst) {
        // 冲量: 给这个球杆一个方向的冲量，矢量，大小，有方向;
        // 方向问题:  src---> dst;

        // 球杆位置
        var src = this.node.getPosition();

        // 算出球杆位置和目标位置的方向
        var dir = cc.pSub(dst, src);


        /**
         * 大小问题
         * 球杆长度一半
         */
        var cue_len_half = this.node.width * 0.5;

        // 算出长度
        var len = cc.pLength(dir);

        // 距离
        var distance = len - cue_len_half;
        
        // 根据距离算出冲量
        var power_x = distance * this.SHOOT_POWER * dir.x / len;
        var power_y = distance * this.SHOOT_POWER * dir.y / len;

        /**
         * applyLinearImpulse(冲量大小向量, 球杆的原点转成世界坐标, true)
         * 对球杆施加一个力量，这样球杆就可以撞击球
         */
        this.body.applyLinearImpulse(cc.p(power_x, power_y), this.node.convertToWorldSpaceAR(cc.p(0, 0)), true);
    },

    // 撞击前
    onPreSolve: function(contact, selfCollider, otherCollider) {

        // 发射后，立马隐藏
        this.node.active = false;
    },
    // update (dt) {},
});
