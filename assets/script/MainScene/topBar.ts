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
        let seq : cc.ActionInterval = cc.sequence(cc.moveTo(0.2, cc.v2(this.node.x, 800)).easing(cc.easeQuarticActionInOut()),
                                                    cc.moveTo(0.15, cc.v2(this.node.x, 905.908)).easing(cc.easeQuarticActionInOut()))
        this.node.stopAllActions()  
        this.node.runAction(seq)
    }

    moveOut () {
        let seq : cc.ActionInterval = cc.sequence(cc.moveTo(0.2, cc.v2(this.node.x, 800)).easing(cc.easeQuarticActionInOut()),
                                                    cc.moveTo(0.15, cc.v2(this.node.x, 1300)).easing(cc.easeQuarticActionInOut()))
        this.node.stopAllActions()  
        this.node.runAction(seq)
    }

    // update (dt) {}
}
