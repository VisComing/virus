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
        let moveTo : cc.ActionInterval = cc.moveTo(0.5, cc.v2(this.node.x, 0))
        this.node.stopAllActions()                                            
        this.node.runAction(moveTo)
    }

    moveOut () {
        let moveTo : cc.ActionInterval = cc.moveTo(0.5, cc.v2(this.node.x, -250))
        this.node.stopAllActions()                                            
        this.node.runAction(moveTo)
    }
    // update (dt) {}
}
