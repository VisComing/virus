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

    play () {
        let seq : cc.ActionInterval = cc.sequence(cc.rotateTo(0.2, 15), 
                                cc.rotateTo(0.2, -15), 
                                cc.rotateTo(0.2, 7), 
                                cc.rotateTo(0.2, -7),
                                cc.rotateTo(0.2, 0),
                                cc.delayTime(1))
        this.node.stopAllActions()
        this.node.runAction(cc.repeatForever(seq))
    }

    moveIn () {
        this.node.active = true
        this.play()
    }

    moveOut () {
        this.node.active = false
    }
    // update (dt) {}
}
