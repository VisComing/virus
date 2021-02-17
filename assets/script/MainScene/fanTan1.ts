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

    @property
    fangxiang: number = -1
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.runAction(cc.repeatForever(cc.rotateBy(0.3, -360 * this.fangxiang)))
    }

    // update (dt) {}
}
