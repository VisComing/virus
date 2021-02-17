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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //一开始不显示        
        this.node.runAction(cc.repeatForever(cc.sequence(cc.scaleTo(0.05, 0.5), cc.scaleTo(0.05, 1))))
        this.node.active = false//这句话要放在后面，改成false后可能就不接受其他动作了
    }

    start () {
        
    }

    fireCallBack () {
        cc.log('fireCallBack')
        let bullet = this.node.parent.parent.getComponent('Bullet')
        bullet.onFire(this.node.convertToWorldSpaceAR(this.node.getPosition()), 6)
    }

    beginFire () {
        this.node.active = true
        this.schedule(this.fireCallBack, 0.15)
    }

    stopFire () {
        this.node.active = false
        this.unschedule(this.fireCallBack)
    }
    // update (dt) {}
}
