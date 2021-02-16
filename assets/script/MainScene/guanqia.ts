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

    // onLoad () {}

    start () {

    }

    moveIn () {
        let spawn : cc.FiniteTimeAction = cc.spawn(cc.moveTo(0.55, cc.v2(this.node.x, 0)),
                                                    cc.scaleTo(0.4, 1, 1))
        this.node.stopAllActions()                                            
        this.node.runAction(spawn)
    }

    moveOut () {
        let spawn : cc.FiniteTimeAction = cc.spawn(cc.moveTo(0.55, cc.v2(this.node.x, 1200)),
                                                    cc.scaleTo(0.4, 0.4, 0.4))
        this.node.stopAllActions()  
        this.node.runAction(spawn)
    }
    // update (dt) {}
}
