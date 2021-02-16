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
        let node1 : cc.Node = this.node.getChildByName('1')
        let node2 : cc.Node = this.node.getChildByName('2')
        if(node1 && node2) {
            node1.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(40, -40)),
            cc.moveBy(0.3, cc.v2(-30, -30)),
            cc.moveBy(0.3, cc.v2(30, 30)),
            cc.moveBy(0.3, cc.v2(-40, 40)))))
            node2.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.3, cc.v2(40, 40)),
            cc.moveBy(0.3, cc.v2(-30, 30)),
            cc.moveBy(0.3, cc.v2(30, -30)),
            cc.moveBy(0.3, cc.v2(-40, -40)))))
        }
        else {
            cc.log('lvquanmove.ts,获取的节点为空')
        }
    }

    // update (dt) {}
}
