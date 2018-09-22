/**
 * 普通球逻辑
 */

// 定义了一个类, new 构造函数模拟;
// extends: 扩展自 component;
// new 类， 实例化一个组件类， 往对应的节点上添加我们的组件,new出来来组件实例;
cc.Class({
    extends: cc.Component,

    // 属性列表，它将会作为组件实例的数据成员，到组件里面,绑定到我们的编辑器上;
    properties: {
        value: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this指的就是当前的组件实例
    },

    start () {
        /**
         * this指的就是当前的组件实例
         * 得到刚体实例
         */
        this.body = this.getComponent(cc.RigidBody);

        // 记录最开始的位置
        this.start_x = this.node.x;
        this.start_y = this.node.y;
    },

    // dt: 距离上一次刷新的时间;
    update (dt) {
        // this,指的就是当前的组件实例
    },

    // 重新开始游戏则重置位置 
    reset: function() {
        this.node.active = true;
        this.node.x = this.start_x;
        this.node.y = this.start_y;
        
        // 刚体的线速度
        this.body.linearVelocity = cc.p(0, 0);

        // 刚体的角速度
        this.body.angularVelocity = 0;
    },

    // 碰撞检测
    onBeginContact: function(contact, selfCollider, otherCollider) {

        // 白球有可能，碰球杆，碰球，碰边,球袋
        if(otherCollider.node.groupIndex == 2) {
            this.node.active = false;
            return;
        }
    },
});
