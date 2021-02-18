// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    @property//子弹速度
    speed : number = 4000

    bulletPool : cc.NodePool = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    run (posX: number , bulletPool : cc.NodePool) {
        this.bulletPool = bulletPool
        const time : number = (2000 - this.node.y) / this.speed
        this.node.runAction(cc.spawn(cc.moveBy(0.07, cc.v2(this.node.x - posX, 0)),cc.moveTo(time, cc.v2(this.node.x, 2000))))
    }
    /**
    * 当碰撞产生的时候调用
    * @param  {Collider} other 产生碰撞的另一个碰撞组件
    * @param  {Collider} self  产生碰撞的自身的碰撞组件
    */
    onCollisionEnter (other, self) {
        self.node.stopAllActions()
        this.bulletPool.put(self.node)
    }

    // update (dt) {}
}
