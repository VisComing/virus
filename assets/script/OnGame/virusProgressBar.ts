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

    // onLoad () {

    // }

    start () {

    }

    //在mainSceneController中调用的，所以执行moveIn时也就是主界面移入时要把这个病毒进度条隐藏掉
    moveIn () {
        this.node.runAction(cc.fadeOut(0))
    }

    moveOut () {
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.fadeIn(0.7)))
    }
    // update (dt) {}
}
